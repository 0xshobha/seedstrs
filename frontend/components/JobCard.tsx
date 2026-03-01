"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { CheckCircle, Clock, Ban, Scale, Loader2 } from "lucide-react";

const statuses = ["Created", "Funded", "Accepted", "Released", "Disputed", "Cancelled"];

export const JobCard = ({ job, refresh }: { job: any, refresh: () => void }) => {
    const { account, signer } = useWallet();
    const { acceptJob, releasePayment, openDispute, cancelJob } = useEscrow(signer);
    const [loading, setLoading] = useState(false);

    const amount = ethers.formatEther(job.amount);
    const statusStr = statuses[Number(job.status)];
    const isClient = account?.toLowerCase() === job.client.toLowerCase();
    const isFreelancer = account?.toLowerCase() === job.freelancer.toLowerCase();
    const noFreelancer = job.freelancer === ethers.ZeroAddress;

    const handleAction = async (action: () => Promise<any>) => {
        setLoading(true);
        try {
            await action();
            refresh();
        } catch (error) {
            console.error(error);
            alert("Action failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col min-h-[220px]">
            <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight truncate">
                        {job.title}
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1 font-mono">ID: {job.id.toString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${statusStr === "Accepted" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                        statusStr === "Funded" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                            statusStr === "Released" ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                                statusStr === "Disputed" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                    "bg-zinc-500/10 border-zinc-500/20 text-zinc-500"
                    }`}>
                    {statusStr}
                </div>
            </div>

            <p className="text-zinc-400 text-sm line-clamp-2 mb-6 flex-grow">
                {job.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Budget</p>
                    <p className="text-white font-mono text-lg">{amount} ETH</p>
                </div>

                <div className="flex gap-2">
                    {statusStr === "Funded" && !isClient && noFreelancer && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => acceptJob(job.id))}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                            Accept
                        </button>
                    )}

                    {statusStr === "Accepted" && isClient && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => releasePayment(job.id))}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/10"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                            Release
                        </button>
                    )}

                    {statusStr === "Accepted" && (isClient || isFreelancer) && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => openDispute(job.id))}
                            className="bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Scale size={16} />}
                            Dispute
                        </button>
                    )}

                    {(statusStr === "Created" || statusStr === "Funded") && isClient && noFreelancer && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => cancelJob(job.id))}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Ban size={16} />}
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
