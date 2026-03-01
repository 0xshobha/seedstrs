"use client";
import React, { useState } from "react";
import { ConnectWallet } from "../components/ConnectWallet";
import { CreateJobForm } from "../components/CreateJobForm";
import { JobDashboard } from "../components/JobDashboard";
import { TransactionNotification, NotificationType } from "../components/TransactionNotification";
import { Shield, Sparkles, ExternalLink } from "lucide-react";
import { CONTRACT_ADDRESS } from "../utils/constants";

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
    <main className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -z-10" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 bg-zinc-950/50 backdrop-blur-md border border-zinc-900 p-6 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-2xl shadow-indigo-500/20">
            <Shield className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent tracking-tighter uppercase px-1">
              TrustGuard
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">Decentralized Escrow Protocol</p>
          </div>
        </div>
        <ConnectWallet />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-4 space-y-8 sticky top-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <CreateJobForm onJobCreated={handleJobCreated} />
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Sparkles size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Network Info</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Contract Address</p>
                <div className="flex items-center justify-between text-zinc-300 font-mono text-[10px] bg-black/50 p-2 rounded-lg border border-zinc-800/50">
                  <span>{CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-10)}</span>
                  <ExternalLink size={12} className="cursor-pointer hover:text-indigo-400 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Chain</p>
                  <p className="text-white font-mono text-sm mt-1">Mumbai</p>
                </div>
                <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Protocol Fee</p>
                  <p className="text-emerald-400 font-mono text-sm mt-1">0%</p>
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
      <footer className="mt-32 pb-12 border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
        <p>© 2024 TrustGuard Protocol • Security Audited</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Whitepaper</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
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
