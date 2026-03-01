"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { JobCard } from "./JobCard";
import { LayoutGrid, RotateCcw } from "lucide-react";

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
                    // In ethers v6, results are often returned as arrays/objects
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

    const filteredJobs = jobs.filter(job => {
        if (filter === "my-client") return job.client.toLowerCase() === account?.toLowerCase();
        if (filter === "my-freelancer") return job.freelancer.toLowerCase() === account?.toLowerCase();
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <LayoutGrid className="text-emerald-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Active Job Market</h2>
                </div>

                <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === "all" ? "bg-zinc-800 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        All Jobs
                    </button>
                    <button
                        onClick={() => setFilter("my-client")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === "my-client" ? "bg-zinc-800 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        As Client
                    </button>
                    <button
                        onClick={() => setFilter("my-freelancer")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === "my-freelancer" ? "bg-zinc-800 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        As Freelancer
                    </button>
                </div>
            </div>

            {!signer ? (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/50 rounded-3xl text-zinc-600 bg-zinc-900/10 transition-colors">
                    <p className="text-lg font-medium">Connect wallet to view the dashboard</p>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-zinc-900/50 h-[220px] rounded-2xl border border-zinc-800 animate-pulse" />
                    ))}
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/50 rounded-3xl text-zinc-600 bg-zinc-900/10">
                    <RotateCcw size={40} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">No jobs found matching your filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id.toString()} job={job} refresh={fetchJobs} />
                    ))}
                </div>
            )}
        </div>
    );
};
