const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const FreelanceEscrow = await ethers.getContractFactory("FreelanceEscrow");
    const escrow = await FreelanceEscrow.deploy();

    await escrow.waitForDeployment();

    console.log("FreelanceEscrow deployed to:", await escrow.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
