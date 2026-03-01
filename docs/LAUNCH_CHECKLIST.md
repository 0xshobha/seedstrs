# TrustGuard | Final Launch Checklist

Before presenting or launching TrustGuard, ensure every item on this list is verified.

## 1. Smart Contract Verification
- [ ] **Compiler Match**: Ensure Solidity version `0.8.20` is used for deployment and verification.
- [ ] **Mumbai Testing**: Deploy to Mumbai and verify everything works with test funds.
- [ ] **Contract Verification**: Run `npx hardhat verify` so judges/users can read the source code on Polygonscan.
- [ ] **Balancing**: Verify `jobCounter` increments correctly after job creation.

## 2. Frontend & UX Verification
- [ ] **MetaMask Support**: Verify wallet connection works on Chrome/Brave/Firefox.
- [ ] **Responsive Design**: Test dashboard on mobile, tablet, and desktop viewports.
- [ ] **Transaction Feedback**: Ensure toast notifications appear for:
    - Wallet Connect
    - Pending Transaction
    - Success (Job Created/Accepted/Released)
    - Rejection/Error
- [ ] **Correct Constants**: Double-check that `CONTRACT_ADDRESS` matches the most recent deployment.

## 3. Gas & Performance
- [ ] **Gas Estimation**: Verify transaction fees are reasonable for Mumbai (~0.01-0.05 MATIC).
- [ ] **Load Times**: Ensure the dashboard loads job data efficiently (optimized loops).

## 4. Final Build
- [ ] **Production Build**: Run `npm run build` and ensure no TypeScript or Lint errors occur.
- [ ] **Documentation**: Ensure `README.md` and `docs/` are clear and updated.
- [ ] **Demo Ready**: If presenting, have local environment or Vercel link open and wallet connected.
