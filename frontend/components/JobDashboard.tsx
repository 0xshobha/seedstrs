"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { JobCard } from "./JobCard";
import { LayoutGrid, RotateCcw, BarChart3, Wallet as WalletIcon, Briefcase, Activity } from "lucide-react";
import { ethers } from "ethers";

export const JobDashboard = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const { account, signer } = useWallet();
    const { getJob, getJobCounter } = useEscrow(signer);
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<"all" | "my-client" | "my-freelancer">("all");

    const fetchJobs = useCallback(async () => {
        if (!signer) return;
        setLoading(true);
        try {
            const counter = await getJobCounter();
            const jobList = [];
            for (let i = 1; i <= counter; i++) {
                const job = await getJob(i);
                if (job && job.exists) {
                    const jobData = {
                        id: job.id,
                        client: job.client,
                        freelancer: job.freelancer,
                        amount: job.amount,
                        title: job.title,
                        description: job.description,
                        status: job.status,
                        exists: job.exists
                    };
                    jobList.push(jobData);
                }
            }
            setJobs(jobList.reverse());
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    }, [signer, getJob, getJobCounter]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs, refreshTrigger]);

    const stats = useMemo(() => {
        const totalVolume = jobs.reduce((acc, job) => acc + BigInt(job.amount.toString()), BigInt(0));
        const activeJobs = jobs.filter(j => Number(j.status) < 3).length; // Created, Funded, Accepted
        const myJobs = jobs.filter(j =>
            j.client.toLowerCase() === account?.toLowerCase() ||
            j.freelancer.toLowerCase() === account?.toLowerCase()
        ).length;

        return {
            volume: ethers.formatEther(totalVolume),
            active: activeJobs,
            personal: myJobs
        };
    }, [jobs, account]);

    const filteredJobs = jobs.filter(job => {
        if (filter === "my-client") return job.client.toLowerCase() === account?.toLowerCase();
        if (filter === "my-freelancer") return job.freelancer.toLowerCase() === account?.toLowerCase();
        return true;
    });

    return (
        <div className="space-y-10">
            {/* Stats Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Escrow Volume", value: `${stats.volume} ETH`, icon: <WalletIcon className="text-indigo-400" />, color: "from-indigo-500/10" },
                    { label: "Active Contracts", value: stats.active, icon: <Activity className="text-emerald-400" />, color: "from-emerald-500/10" },
                    { label: "Your Engagements", value: stats.personal, icon: <Briefcase className="text-amber-400" />, color: "from-amber-500/10" },
                ].map((stat, i) => (
                    <div key={i} className={`clay-card p-6 bg-gradient-to-br ${stat.color} to-transparent border-none`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-white font-mono">{stat.value}</p>
                            </div>
                            <div className="bg-black/40 p-2.5 rounded-xl shadow-inner-white/5">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-xl">
                        <LayoutGrid className="text-indigo-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Market Marketplace</h2>
                </div>

                <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-900 shadow-inner">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all clay-button ${filter === "all" ? "bg-indigo-600 text-white shadow-indigo-500/20" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("my-client")}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all clay-button ${filter === "my-client" ? "bg-indigo-600 text-white shadow-indigo-500/20" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Client
                    </button>
                    <button
                        onClick={() => setFilter("my-freelancer")}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all clay-button ${filter === "my-freelancer" ? "bg-indigo-600 text-white shadow-indigo-500/20" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Freelancer
                    </button>
                </div>
            </div>

            {!signer ? (
                <div className="clay-card h-80 flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/10 border-dashed border-2 border-zinc-800">
                    <WalletIcon size={48} className="mb-4 opacity-10" />
                    <p className="text-lg font-medium tracking-tight">Connect wallet to authorize protocol access</p>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 4].map(i => (
                        <div key={i} className="clay-card h-64 animate-pulse bg-zinc-900/20 border-zinc-900" />
                    ))}
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="clay-card h-80 flex flex-col items-center justify-center text-zinc-600 border-dashed border-2 border-zinc-800">
                    <RotateCcw size={48} className="mb-4 opacity-10 animate-spin-slow" />
                    <p className="text-lg font-medium tracking-tight">No protocol data matches your selection</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id.toString()} job={job} refresh={fetchJobs} />
                    ))}
                </div>
            )}
        </div>
    );
};
