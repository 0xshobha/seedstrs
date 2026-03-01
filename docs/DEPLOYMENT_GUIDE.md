# TrustGuard | Deployment Guide

This guide outlines the step-by-step process for deploying **TrustGuard** to the Polygon Mumbai Testnet or Mainnet.

## 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
- [MetaMask](https://metamask.io/) wallet with test/real MATIC
- [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) API key for Polygon Mumbai RPC

## 2. Environment Configuration
Create a `.env` file in the root directory:

```env
POLYGON_MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

## 3. Smart Contract Deployment
1. **Compile Contracts**:
   ```bash
   npx hardhat --config hardhat.config.cjs compile
   ```
2. **Deploy to Mumbai**:
   ```bash
   npx hardhat --config hardhat.config.cjs run scripts/deploy.js --network mumbai
   ```
3. **Copy Contract Address**: Note the address logged in the console (e.g., `0x123...abc`).
4. **Verification (Recommended)**:
   ```bash
   npx hardhat --config hardhat.config.cjs verify --network mumbai <DEPLOYED_ADDRESS>
   ```

## 4. Frontend Integration
1. Open `frontend/utils/constants.ts`.
2. Update `CONTRACT_ADDRESS` with your deployed address:
   ```typescript
   export const CONTRACT_ADDRESS = "0xYourDeployedAddressHere";
   ```

## 5. Production Build
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Build for production:
   ```bash
   npm run build
   ```
3. Deploy the `out` (if static) or the `.next` folder to your provider (Vercel, Netlify, etc.).

## 6. Vercel Deployment (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Select the `frontend` directory as the root during configuration.
