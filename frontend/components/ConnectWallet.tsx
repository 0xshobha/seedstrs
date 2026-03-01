"use client";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut } from "lucide-react";

export const ConnectWallet = () => {
    const { account, connectWallet, disconnectWallet } = useWallet();

    return (
        <div className="flex items-center gap-4">
            {account ? (
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-zinc-300">
                        {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                    <button
                        onClick={disconnectWallet}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Disconnect"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-xl shadow-indigo-500/20 transition-all active:scale-95 group"
                >
                    <Wallet size={18} className="group-hover:rotate-12 transition-transform" />
                    Connect Wallet
                </button>
            )}
        </div>
    );
};
