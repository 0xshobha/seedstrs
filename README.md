# 🛡️ TrustGuard | Decentralized Freelance Escrow Protocol

**Live Demo:** [frontend-red-ten-88.vercel.app](https://frontend-red-ten-88.vercel.app)  
**GitHub:** [github.com/0xshobha/seedstrs](https://github.com/0xshobha/seedstrs)

---

## 🚀 Welcome to TrustGuard
**TrustGuard** is a trustless, decentralized escrow platform designed to eliminate payment friction between freelancers and clients. Built for the **Seedstr Hackathon**, our protocol ensures that funds are only released when both parties are satisfied, or through fair on-chain arbitration.

---

## 🏆 Hackathon Highlights
- **Premium UX/UI**: High-end "Amoled Black & Claymorphism" design with real-time protocol statistics.
- **Robust Security**: Protected by OpenZeppelin's `ReentrancyGuard` and audited logic patterns.
- **On-Chain Settlement**: Full lifecycle management—from funding to release—completely on the Polygon network.
- **Fair Arbitration**: Built-in dispute resolution handled by cryptographically authorized arbitrators.

---

## ✨ Full-Cycle Escrow Architecture
TrustGuard uses a non-custodial model where the Smart Contract acts as the neutral third party:
1.  **Initiate**: Client creates a job and funds the escrow with MATIC/ETH.
2.  **Lock**: Freelancer accepts the contract, binding the two parties.
3.  **Deliver**: Work is performed outside of the protocol or attached via metadata.
4.  **Settle**: Client approves work → Funds instantly release to the Freelancer.
5.  **Dispute**: If conflict arises, either party can trigger an on-chain dispute for admin arbitration.

---

## 🛠️ Tech Stack & Layers
- **Frontend Layer**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Protocol Layer**: Solidity 0.8.20, Hardhat, Ethers.js.
- **Security Layer**: OpenZeppelin (ReentrancyGuard, Ownable).
- **Network Layer**: Polygon Mumbai Testnet (EVM Compatible).

---

## 🔒 Security Features
- **Reentrancy Protection**: High-level defense against multi-call drainage attacks.
- **Role-Based Access**: Cryptographically enforced restrictions (OnlyClient, OnlyFreelancer).
- **Event-Driven UI**: Every on-chain mutation triggers a professional toast notification.
- **Fail-Safe Cancel**: Clients can revoke funding instantly if no freelancer has yet committed.

---

## ⚙️ Project Structure
```bash
freelance-escrow/
├── contracts/        # Core Solidity Protocol
├── frontend/         # Premium Next.js Dashboard
├── scripts/          # Network Deployment Scripts
├── test/             # Correctness & Edge-Case Unit Tests
└── docs/             # Technical & Security Documentation
```

---

## 🛤️ Roadmap (Future Extensions)
- [ ] **Milestone Payments**: Automated multi-stage funding releases.
- [ ] **ERC-20 Multi-Asset Support**: Pay in stablecoins (USDC/DAI).
- [ ] **Decentralized Arbitration (DAO)**: Community-led dispute resolution.
- [ ] **On-Chain Reputation**: Performance-based trust scores for users.

---

## 📄 License
TrustGuard is released under the **MIT License**.

---
*Built with ❤️ for the Seedstr Hackathon.*
