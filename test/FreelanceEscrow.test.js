const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FreelanceEscrow", function () {
    let escrow;
    let owner;
    let client;
    let freelancer;

    beforeEach(async function () {
        [owner, client, freelancer] = await ethers.getSigners();
        const FreelanceEscrowFactory = await ethers.getContractFactory("FreelanceEscrow");
        escrow = await FreelanceEscrowFactory.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await escrow.owner()).to.equal(owner.address);
        });
    });

    describe("Job Creation", function () {
        it("Should create a job without funds", async function () {
            await escrow.connect(client).createJob("Test Job", "Description");
            const job = await escrow.jobs(1);
            expect(job.title).to.equal("Test Job");
            expect(job.client).to.equal(client.address);
            expect(job.status.toString()).to.equal("0"); // JobStatus.Created
        });

        it("Should create a job with funds", async function () {
            const amount = ethers.parseUnits("1.0", "ether");
            await escrow.connect(client).createJob("Funded Job", "Description", { value: amount });
            const job = await escrow.jobs(1);
            expect(job.amount.toString()).to.equal(amount.toString());
            expect(job.status.toString()).to.equal("1"); // JobStatus.Funded
        });
    });

    describe("Job Lifecycle", function () {
        const amount = ethers.parseUnits("1.0", "ether");

        beforeEach(async function () {
            await escrow.connect(client).createJob("Job 1", "Desc", { value: amount });
        });

        it("Should allow freelancer to accept job", async function () {
            await escrow.connect(freelancer).acceptJob(1);
            const job = await escrow.jobs(1);
            expect(job.freelancer).to.equal(freelancer.address);
            expect(job.status.toString()).to.equal("2"); // JobStatus.Accepted
        });

        it("Should allow client to release payment", async function () {
            await escrow.connect(freelancer).acceptJob(1);
            const initialBalance = await ethers.provider.getBalance(freelancer.address);

            await escrow.connect(client).releasePayment(1);

            const finalBalance = await ethers.provider.getBalance(freelancer.address);
            expect(finalBalance).to.be.gt(initialBalance);

            const job = await escrow.jobs(1);
            expect(job.status.toString()).to.equal("3"); // JobStatus.Released
            expect(job.amount.toString()).to.equal("0");
        });

        it("Should allow client to cancel and refund before acceptance", async function () {
            const initialBalance = await ethers.provider.getBalance(client.address);

            const tx = await escrow.connect(client).cancelJob(1);
            const receipt = await tx.wait();
            const gasUsed = receipt.gasUsed * receipt.gasPrice;

            const finalBalance = await ethers.provider.getBalance(client.address);
            expect(finalBalance + gasUsed).to.be.closeTo(initialBalance + amount, ethers.parseUnits("0.05", "ether"));

            const job = await escrow.jobs(1);
            expect(job.status.toString()).to.equal("5"); // JobStatus.Cancelled
        });
    });
});
