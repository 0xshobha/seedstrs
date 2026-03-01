"use client";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: any;
    }
}

export const useWallet = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);

    const connectWallet = useCallback(async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const browserProvider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await browserProvider.send("eth_requestAccounts", []);
                const browserSigner = await browserProvider.getSigner();
                const network = await browserProvider.getNetwork();

                setAccount(accounts[0]);
                setProvider(browserProvider);
                setSigner(browserSigner);
                setChainId(Number(network.chainId));
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    }, []);

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setChainId(null);
    };

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    disconnectWallet();
                }
            });

            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }
    }, []);

    return { account, provider, signer, chainId, connectWallet, disconnectWallet };
};
