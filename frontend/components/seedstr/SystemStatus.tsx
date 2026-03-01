'use client';

import { Activity, ShieldCheck, Globe, Database, Server, Wifi } from 'lucide-react';

export default function SystemStatus() {
    const metrics = [
        { label: 'Agent Health', value: 'Optimal', icon: ShieldCheck, color: 'text-emerald-500' },
        { label: 'Compute Power', value: '1.2 TFLOPS', icon: Activity, color: 'text-indigo-500' },
        { label: 'Registry Sync', value: 'Live', icon: Globe, color: 'text-blue-500' },
        { label: 'Data Latency', value: '14ms', icon: Database, color: 'text-purple-500' },
    ];

    return (
        <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                    <Server size={14} />
                    Infrastructure Monitoring
                </h3>
                <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                    ONLINE
                </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col gap-3 group/item">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover/item:text-zinc-300 transition-colors">
                            <metric.icon size={14} />
                            <span>{metric.label}</span>
                        </div>
                        <div className={`text-lg font-black tracking-tight ${metric.color}`}>
                            {metric.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                <span className="flex items-center gap-2">
                    <Wifi size={12} className="text-emerald-500" />
                    P2P Mesh Network
                </span>
                <span>v.10x-beta</span>
            </div>
        </div>
    );
}
