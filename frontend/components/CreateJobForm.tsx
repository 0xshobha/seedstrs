"use client";
import React, { useState } from "react";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { PlusCircle, Loader2 } from "lucide-react";

export const CreateJobForm = ({ onJobCreated }: { onJobCreated: () => void }) => {
    const { signer } = useWallet();
    const { createJob } = useEscrow(signer);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount || !signer) return;
        setLoading(true);
        try {
            await createJob(formData.title, formData.description, formData.amount);
            setFormData({ title: "", description: "", amount: "" });
            onJobCreated();
        } catch (error) {
            console.error(error);
            alert("Transaction failed or rejected");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <PlusCircle className="text-indigo-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Post a New Job</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Job Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Smart Contract Audit"
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Budget (ETH)</label>
                    <input
                        type="number"
                        step="0.001"
                        placeholder="0.05"
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 ml-1">Description</label>
                    <textarea
                        placeholder="Describe the requirements..."
                        rows={4}
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !signer}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        "Create Escrow Job"
                    )}
                </button>
                {!signer && (
                    <p className="text-center text-sm text-zinc-500">Connect wallet to create a job</p>
                )}
            </form>
        </div>
    );
};
