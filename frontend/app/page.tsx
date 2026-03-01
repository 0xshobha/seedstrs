'use client';

import { useState } from 'react';
import AgentConsole from '../components/seedstr/AgentConsole';
import SystemStatus from '../components/seedstr/SystemStatus';
import { Sparkles, Zap, Command, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SeedstrPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Dynamic Background Glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10 animate-pulse-soft" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse-soft" />

            {/* Simple Top Nav */}
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/escrow" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Escrow
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Protocol_Active</span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="flex flex-col gap-12">
                    {/* Hero / Title Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs tracking-[0.3em] uppercase">
                                <Sparkles size={14} />
                                <span>Autonomous Agent Protocol</span>
                            </div>
                            <h1 className="text-6xl font-black tracking-tighter uppercase italic">
                                Seedstr <span className="text-indigo-500 not-italic">Nexus</span>
                            </h1>
                            <p className="max-w-xl text-zinc-500 text-lg leading-relaxed font-light">
                                The next generation of AI agents. Capable of generating full-stack projects,
                                reasoning through complex codebases, and delivering production-ready results.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="glass-card p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center min-w-[120px]">
                                <Zap size={20} className="text-yellow-500 mb-2" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Speed</span>
                                <span className="text-sm font-bold">Ultra-Low</span>
                            </div>
                            <div className="glass-card p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center min-w-[120px]">
                                <Shield size={20} className="text-indigo-500 mb-2" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Security</span>
                                <span className="text-sm font-bold">Encrypted</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: System Status */}
                        <div className="lg:col-span-4 space-y-8">
                            <SystemStatus />
                            <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-2xl space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                                    <Command size={14} />
                                    Active Capabilities
                                </h3>
                                <div className="space-y-4">
                                    {['Automated Scaffolding', 'Real-time CodeGen', 'Project Packaging', 'Multi-Layer Reasoning'].map((cap) => (
                                        <div key={cap} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest border-b border-white/5 pb-3 last:border-0 hover:text-indigo-400 transition-colors cursor-default">
                                            <span>{cap}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Console */}
                        <div className="lg:col-span-8">
                            <AgentConsole />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-12 border-t border-white/5 text-center">
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.4em]">
                    © 2026 Seedstr Nexus • Built for Seedstr Blind Hackathon
                </p>
            </footer>

            <style jsx global>{`
        .glass-card {
           background: rgba(255, 255, 255, 0.03);
           backdrop-filter: blur(24px) saturate(180%);
           -webkit-backdrop-filter: blur(24px) saturate(180%);
           border: 1px solid rgba(255, 255, 255, 0.08);
           box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
           background: rgba(255, 255, 255, 0.05);
           border-color: rgba(99, 102, 241, 0.4);
           box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2);
           transform: translateY(-4px) scale(1.01);
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; filter: blur(120px); }
          50% { opacity: 0.8; filter: blur(140px); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 8s ease-in-out infinite;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
      `}</style>
        </div>
    );
}
