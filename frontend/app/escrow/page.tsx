"use client";
import React, { useState } from "react";
import { ConnectWallet } from "../../components/ConnectWallet";
import { CreateJobForm } from "../../components/CreateJobForm";
import { JobDashboard } from "../../components/JobDashboard";
import { TransactionNotification, NotificationType } from "../../components/TransactionNotification";
import { Shield, Sparkles, ExternalLink, Globe2, Fingerprint } from "lucide-react";
import { CONTRACT_ADDRESS } from "../../utils/constants";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [notification, setNotification] = useState({
    message: "",
    type: "info" as NotificationType,
    isVisible: false,
  });

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type, isVisible: true });
  };

  const handleJobCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    showNotification("Job created and funded successfully!", "success");
  };

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 relative min-h-screen text-balance selection:bg-indigo-500/50">
      {/* Decorative background elements - Ultra deep glow */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full -z-10 animate-pulse-soft" />
      <div className="fixed bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[150px] rounded-full -z-10" />
      <div className="fixed top-[40%] left-[-10%] w-[300px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20 clay-card p-8 bg-zinc-950/40 border-none shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-4 rounded-[1.5rem] shadow-2xl shadow-indigo-500/30">
            <Shield className="text-white fill-current/10" size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-white to-zinc-600 bg-clip-text text-transparent tracking-tighter uppercase px-1 leading-none">
                TrustGuard
              </h1>
              <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-black px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">v1.0.4</span>
            </div>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.4em] mt-1.5 ml-1">L1 Decentralized Settlement Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-zinc-600 font-black text-[9px] uppercase tracking-widest bg-black/40 px-6 py-3 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Polygon Mainnet Ready</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <span>Audited</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Form & Info */}
        <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            <CreateJobForm onJobCreated={handleJobCreated} />
          </div>

          <div className="clay-card p-8 space-y-8 bg-gradient-to-br from-zinc-900/40 to-black/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-indigo-400">
                <Globe2 size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300">Settlement Registry</span>
              </div>
              <Fingerprint size={16} className="text-zinc-700" />
            </div>

            <div className="space-y-6">
              <div className="bg-black/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-zinc-600 text-[9px] uppercase font-black tracking-widest mb-3 flex justify-between items-center">
                  Smart Contract
                  <span className="text-emerald-500/50 text-[8px]">Verified</span>
                </p>
                <div className="flex items-center justify-between text-zinc-400 font-mono text-[10px] bg-zinc-950/80 p-3 rounded-xl border border-white/5">
                  <span className="truncate pr-4">{CONTRACT_ADDRESS}</span>
                  <ExternalLink size={14} className="cursor-pointer hover:text-indigo-400 transition-colors flex-shrink-0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                  <p className="text-zinc-600 text-[9px] uppercase font-black tracking-widest">Ledger</p>
                  <p className="text-white font-black text-sm mt-1 uppercase tracking-tighter">Polygon</p>
                </div>
                <div className="bg-black/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                  <p className="text-zinc-600 text-[9px] uppercase font-black tracking-widest">Protocol Fee</p>
                  <p className="text-emerald-500 font-black text-sm mt-1 uppercase tracking-tighter">Zero Fee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dashboard */}
        <div className="lg:col-span-8">
          <JobDashboard refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-40 pb-16 border-t border-zinc-900 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-zinc-700 text-[10px] uppercase tracking-[0.4em] font-black italic">
        <p className="not-italic opacity-50 tracking-widest">© 2024 TrustGuard Protocol • Enterprise Grade Settlement</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-indigo-400 transition-all hover:tracking-[0.6em]">Docs</a>
          <a href="#" className="hover:text-indigo-400 transition-all hover:tracking-[0.6em]">Nexus</a>
          <a href="#" className="hover:text-indigo-400 transition-all hover:tracking-[0.6em]">Support</a>
        </div>
      </footer>

      {/* Notification */}
      <TransactionNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ ...notification, isVisible: false })}
      />
    </main>
  );
}
