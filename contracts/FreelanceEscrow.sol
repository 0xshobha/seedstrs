// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FreelanceEscrow
 * @dev A decentralized escrow platform for freelancers and clients.
 * It allows clients to create jobs, deposit funds, and release them once work is approved.
 * Includes dispute management and arbitration.
 */
contract FreelanceEscrow is ReentrancyGuard, Ownable {
    
    enum JobStatus { Created, Funded, Accepted, Released, Disputed, Cancelled }

    struct Job {
        uint256 id;
        address client;
        address freelancer;
        uint256 amount;
        string title;
        string description;
        JobStatus status;
        bool exists;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCounter;

    // Events
    event JobCreated(uint256 indexed jobId, address indexed client, string title, uint256 amount);
    event FundDeposited(uint256 indexed jobId, uint256 amount);
    event JobAccepted(uint256 indexed jobId, address indexed freelancer);
    event PaymentReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount);
    event DisputeOpened(uint256 indexed jobId, address indexed openedBy);
    event JobCancelled(uint256 indexed jobId);
    event DisputeResolved(uint256 indexed jobId, address indexed winner, uint256 amount);

    // Modifiers
    modifier onlyClient(uint256 _jobId) {
        require(jobs[_jobId].client == msg.sender, "Only client can call this");
        _;
    }

    modifier onlyFreelancer(uint256 _jobId) {
        require(jobs[_jobId].freelancer == msg.sender, "Only freelancer can call this");
        _;
    }

    modifier jobExists(uint256 _jobId) {
        require(jobs[_jobId].exists, "Job does not exist");
        _;
    }

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Create a new job contract. 
     * The client must deposit the funds at the same time or later.
     */
    function createJob(string memory _title, string memory _description) external payable returns (uint256) {
        jobCounter++;
        
        jobs[jobCounter] = Job({
            id: jobCounter,
            client: msg.sender,
            freelancer: address(0),
            amount: msg.value,
            title: _title,
            description: _description,
            status: msg.value > 0 ? JobStatus.Funded : JobStatus.Created,
            exists: true
        });

        emit JobCreated(jobCounter, msg.sender, _title, msg.value);
        if (msg.value > 0) {
            emit FundDeposited(jobCounter, msg.value);
        }

        return jobCounter;
    }

    /**
     * @dev Deposit funds for an existing job.
     */
    function depositFunds(uint256 _jobId) external payable jobExists(_jobId) onlyClient(_jobId) {
        require(jobs[_jobId].status == JobStatus.Created, "Job already funded or active");
        require(msg.value > 0, "Must deposit some amount");

        jobs[_jobId].amount += msg.value;
        jobs[_jobId].status = JobStatus.Funded;

        emit FundDeposited(_jobId, msg.value);
    }

    /**
     * @dev Freelancer accepts the job.
     */
    function acceptJob(uint256 _jobId) external jobExists(_jobId) {
        require(jobs[_jobId].status == JobStatus.Funded, "Job must be funded to accept");
        require(jobs[_jobId].freelancer == address(0), "Job already has a freelancer");
        require(jobs[_jobId].client != msg.sender, "Client cannot be the freelancer");

        jobs[_jobId].freelancer = msg.sender;
        jobs[_jobId].status = JobStatus.Accepted;

        emit JobAccepted(_jobId, msg.sender);
    }

    /**
     * @dev Client approves the work and releases funds to the freelancer.
     */
    function releasePayment(uint256 _jobId) external jobExists(_jobId) onlyClient(_jobId) nonReentrant {
        require(jobs[_jobId].status == JobStatus.Accepted, "Job not in accepted state");
        require(jobs[_jobId].freelancer != address(0), "No freelancer assigned");

        uint256 amountToRelease = jobs[_jobId].amount;
        address freelancer = jobs[_jobId].freelancer;

        jobs[_jobId].status = JobStatus.Released;
        jobs[_jobId].amount = 0;

        (bool success, ) = payable(freelancer).call{value: amountToRelease}("");
        require(success, "Transfer failed");

        emit PaymentReleased(_jobId, freelancer, amountToRelease);
    }

    /**
     * @dev Open a dispute for a job. Can be opened by client or freelancer.
     */
    function openDispute(uint256 _jobId) external jobExists(_jobId) {
        require(msg.sender == jobs[_jobId].client || msg.sender == jobs[_jobId].freelancer, "Not authorized");
        require(jobs[_jobId].status == JobStatus.Accepted, "Can only dispute active jobs");

        jobs[_jobId].status = JobStatus.Disputed;

        emit DisputeOpened(_jobId, msg.sender);
    }

    /**
     * @dev Emergency cancel before acceptance.
     */
    function cancelJob(uint256 _jobId) external jobExists(_jobId) onlyClient(_jobId) nonReentrant {
        require(jobs[_jobId].status == JobStatus.Created || jobs[_jobId].status == JobStatus.Funded, "Cannot cancel now");
        
        uint256 amountToRefund = jobs[_jobId].amount;
        jobs[_jobId].status = JobStatus.Cancelled;
        jobs[_jobId].amount = 0;

        if (amountToRefund > 0) {
            (bool success, ) = payable(msg.sender).call{value: amountToRefund}("");
            require(success, "Refund failed");
        }

        emit JobCancelled(_jobId);
    }

    /**
     * @dev Owner (arbitrator) resolves the dispute.
     */
    function resolveDispute(uint256 _jobId, address _winner) external jobExists(_jobId) onlyOwner nonReentrant {
        require(jobs[_jobId].status == JobStatus.Disputed, "Job not in dispute");
        require(_winner == jobs[_jobId].client || _winner == jobs[_jobId].freelancer, "Winner must be client or freelancer");

        uint256 amountToTransfer = jobs[_jobId].amount;
        jobs[_jobId].amount = 0;
        jobs[_jobId].status = JobStatus.Released; // Or a dedicated Resolved status

        (bool success, ) = payable(_winner).call{value: amountToTransfer}("");
        require(success, "Transfer failed");

        emit DisputeResolved(_jobId, _winner, amountToTransfer);
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
