# 🛡️ TrustGuard | Decentralized Freelance Escrow Protocol

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-repo/trustguard)
[![Network](https://img.shields.io/badge/Blockchain-Polygon-purple)](https://polygon.technology/)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![Smart Contract](https://img.shields.io/badge/Logic-Solidity-blue)](https://soliditylang.org/)

**TrustGuard** is a trustless, decentralized escrow platform designed to eliminate payment friction between freelancers and clients. By leveraging Ethereum smart contracts, we ensure that funds are only released when both parties are satisfied, or through fair arbitration.

---

## 🚀 Project Overview
In the traditional freelance market, "payment after delivery" is a risky gamble for freelancers, while "payment upfront" is a risk for clients. **TrustGuard** solves this by acting as a binary neutral third party (the Smart Contract).

### 💡 Problem Statement
Existing freelance platforms charge high fees (10-20%) and often have slow, biased dispute resolution processes. Centralized entities can freeze accounts without notice, leading to financial instability for freelancers.

### ✨ Solution Architecture
TrustGuard uses a non-custodial escrow model:
1. **Client** creates a job and funds the escrow with MATIC.
2. **Freelancer** accepts the job, locking the agreement.
3. **Client** approves the work → Funds are instantly released to the Freelancer.
4. **Dispute?** Our built-in arbitration logic allows admins to resolve conflicts fairly.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion (Animations).
- **Blockchain**: Solidity, Hardhat, Ethers.js.
- **Library**: OpenZeppelin (ReentrancyGuard, Ownable).
- **Network**: Polygon Mumbai Testnet (EVM Compatible).

---

## 🔒 Security & Best Practices
- **Reentrancy Protection**: High-level defense against multi-call attacks.
- **Access Modifiers**: Cryptographically enforced role restrictions.
- **Event Logging**: Every transaction is indexed for off-chain transparency.
- **Input Sanitization**: Client-side validation to prevent malformed data.

---

## 📁 Folder Structure
```bash
freelance-escrow/
├── contracts/        # Solidity Core Logic (FreelanceEscrow.sol)
├── scripts/          # Deployment & Migration scripts
├── test/             # Comprehensive Unit Tests
├── frontend/         # Next.js Web Application
│   ├── components/   # Atomic UI Elements
│   ├── hooks/        # Custom Web3 Logic
│   └── utils/        # ABI & Constants
└── docs/             # Deployment & Security Guides
```

---

## ⚙️ Quick Start

### 1. Smart Contract
```bash
# Install local dependencies
npm install

# Compile contracts
npx hardhat --config hardhat.config.cjs compile

# Run unit tests
npx hardhat --config hardhat.config.cjs test
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots & Demo
> [!NOTE]
> *Insert Dashboard Screenshot Here*
> *Insert Create Job Screenshot Here*

---

## 🛤️ Future Roadmap
- [ ] **Milestone Payments**: Split jobs into multiple funded stages.
- [ ] **ERC-20 Support**: Allow payments in USDC, USDT, or DAI.
- [ ] **DAO Arbitration**: Decentralize the arbitration process via community voting.
- [ ] **Review System**: On-chain reputation for clients and freelancers.

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👥 Contributors
- **TrustGuard Team** - *Built for the Future of Work.*
