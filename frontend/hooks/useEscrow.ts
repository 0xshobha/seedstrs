"use client";
import { useState, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/constants";

export const useEscrow = (signer: ethers.JsonRpcSigner | null) => {
    const contract = useMemo(() => {
        if (!signer) return null;
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }, [signer]);

    const createJob = useCallback(async (title: string, description: string, amount: string) => {
        if (!contract) throw new Error("Contract not initialized");
        const tx = await contract.createJob(title, description, {
            value: ethers.parseEther(amount),
        });
        return await tx.wait();
    }, [contract]);

    const acceptJob = useCallback(async (jobId: string | number) => {
        if (!contract) throw new Error("Contract not initialized");
        const tx = await contract.acceptJob(jobId);
        return await tx.wait();
    }, [contract]);

    const releasePayment = useCallback(async (jobId: string | number) => {
        if (!contract) throw new Error("Contract not initialized");
        const tx = await contract.releasePayment(jobId);
        return await tx.wait();
    }, [contract]);

    const openDispute = useCallback(async (jobId: string | number) => {
        if (!contract) throw new Error("Contract not initialized");
        const tx = await contract.openDispute(jobId);
        return await tx.wait();
    }, [contract]);

    const cancelJob = useCallback(async (jobId: string | number) => {
        if (!contract) throw new Error("Contract not initialized");
        const tx = await contract.cancelJob(jobId);
        return await tx.wait();
    }, [contract]);

    const getJob = useCallback(async (jobId: string | number) => {
        if (!contract) return null;
        return await contract.jobs(jobId);
    }, [contract]);

    const getJobCounter = useCallback(async () => {
        if (!contract) return 0;
        const counter = await contract.jobCounter();
        return Number(counter);
    }, [contract]);

    return { createJob, acceptJob, releasePayment, openDispute, cancelJob, getJob, getJobCounter };
};
