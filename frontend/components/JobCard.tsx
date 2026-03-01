"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { CheckCircle, Clock, Ban, Scale, Loader2, User, UserCheck, ArrowRight } from "lucide-react";

const statuses = ["Created", "Funded", "Accepted", "Released", "Disputed", "Cancelled"];

export const JobCard = ({ job, refresh }: { job: any, refresh: () => void }) => {
    const { account, signer } = useWallet();
    const { acceptJob, releasePayment, openDispute, cancelJob } = useEscrow(signer);
    const [loading, setLoading] = useState(false);

    const amount = ethers.formatEther(job.amount);
    const statusNum = Number(job.status);
    const statusStr = statuses[statusNum];
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

    const progressPercent = (statusNum / (statuses.length - 1)) * 100;

    return (
        <div className="clay-card p-8 flex flex-col group relative overflow-hidden">
            {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -z-10 bg-gradient-to-br ${statusStr === "Accepted" ? "from-emerald-500" : "from-indigo-500"
                }`} />

            <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded-md">#{job.id.toString()}</span>
                    </div>
                </div>

                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${statusStr === "Accepted" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                        statusStr === "Funded" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                            statusStr === "Released" ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                                statusStr === "Disputed" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                    "bg-zinc-800/50 border-zinc-700/50 text-zinc-400"
                    }`}>
                    {statusStr}
                </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                {job.description || "The client has not provided a detailed specification for this contract."}
            </p>

            {/* Participants */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-zinc-500">
                        <User size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Client</span>
                    </div>
                    <p className="text-zinc-300 font-mono text-[10px] truncate">{job.client}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1 text-zinc-500">
                        <UserCheck size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Freelancer</span>
                    </div>
                    <p className="text-zinc-300 font-mono text-[10px] truncate">
                        {noFreelancer ? "OPEN FOR HIRE" : job.freelancer}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2 px-1">
                    <span>Progress</span>
                    <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden shadow-inner border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">Contract Budget</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-mono leading-none tracking-tighter">{amount}</span>
                        <span className="text-indigo-400 text-xs font-black uppercase">ETH</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    {statusStr === "Funded" && !isClient && noFreelancer && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => acceptJob(job.id))}
                            className="clay-button bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                            Hired
                        </button>
                    )}

                    {statusStr === "Accepted" && isClient && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => releasePayment(job.id))}
                            className="clay-button bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 uppercase tracking-widest"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                            Release
                        </button>
                    )}

                    {statusStr === "Accepted" && (isClient || isFreelancer) && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => openDispute(job.id))}
                            className="clay-button bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 uppercase tracking-widest"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Scale size={16} />}
                            Dispute
                        </button>
                    )}

                    {(statusStr === "Created" || statusStr === "Funded") && isClient && noFreelancer && (
                        <button
                            disabled={loading}
                            onClick={() => handleAction(() => cancelJob(job.id))}
                            className="clay-button bg-zinc-900 hover:bg-zinc-800 text-zinc-500 border border-white/5 px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 uppercase tracking-widest"
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
