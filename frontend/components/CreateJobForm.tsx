"use client";
import React, { useState } from "react";
import { useEscrow } from "../hooks/useEscrow";
import { useWallet } from "../hooks/useWallet";
import { PlusCircle, Loader2, DollarSign, TextQuote, Zap } from "lucide-react";

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
        <div className="clay-card p-10 bg-gradient-to-br from-indigo-500/5 to-transparent border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-1000" />

            <div className="flex items-center gap-4 mb-10">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
                    <Zap className="text-white fill-current" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Initiate Escrow</h2>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">Deploy a new work contract</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                        <TextQuote size={12} />
                        Job Specification
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Protocol Implementation"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all clay-input font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                        <DollarSign size={12} />
                        Funding Budget (ETH)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.001"
                            placeholder="0.05"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all clay-input font-mono font-bold"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 text-[10px] font-black tracking-widest uppercase pointer-events-none">MATIC / ETH</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                        <PlusCircle size={12} />
                        Scope Details
                    </label>
                    <textarea
                        placeholder="Outlining requirements, deliverables, and timelines..."
                        rows={4}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all clay-input resize-none font-medium text-sm leading-relaxed"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !signer}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 clay-button uppercase tracking-[0.2em] text-xs"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>Deploy Contract</>
                    )}
                </button>
                {!signer && (
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        Authorization Required to Proceed
                    </p>
                )}
            </form>
        </div>
    );
};
