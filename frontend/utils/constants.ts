export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

export const CONTRACT_ABI = [
    "constructor()",
    "event DisputeOpened(uint256 indexed jobId, address indexed openedBy)",
    "event DisputeResolved(uint256 indexed jobId, address indexed winner, uint256 amount)",
    "event FundDeposited(uint256 indexed jobId, uint256 amount)",
    "event JobAccepted(uint256 indexed jobId, address indexed freelancer)",
    "event JobCancelled(uint256 indexed jobId)",
    "event JobCreated(uint256 indexed jobId, address indexed client, string title, uint256 amount)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event PaymentReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount)",
    "function acceptJob(uint256 _jobId)",
    "function cancelJob(uint256 _jobId)",
    "function createJob(string _title, string _description) payable returns (uint256)",
    "function depositFunds(uint256 _jobId) payable",
    "function jobCounter() view returns (uint256)",
    "function jobs(uint256) view returns (uint256 id, address client, address freelancer, uint256 amount, string title, string description, uint8 status, bool exists)",
    "function openDispute(uint256 _jobId)",
    "function owner() view returns (address)",
    "function releasePayment(uint256 _jobId)",
    "function renounceOwnership()",
    "function resolveDispute(uint256 _jobId, address _winner)",
    "function transferOwnership(address newOwner)",
    "receive() payable"
];
