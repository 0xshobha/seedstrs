'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Cpu, Loader2, Code2, CheckCircle2 } from 'lucide-react';

interface Message {
    role: 'user' | 'agent';
    content: string;
    status?: string;
}

export default function AgentConsole() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'agent', content: "SYSTEM_READY: Seedstr Nexus is online. Awaiting instruction for project generation or code analysis." }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage = prompt;
        setPrompt('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/seedstr/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage }),
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, { role: 'agent', content: data.response }]);
        } catch (err: any) {
            setMessages(prev => [...prev, { role: 'agent', content: `ERROR: ${err.message || 'Transmission failed.'}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card flex flex-col h-[700px] rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
            {/* Console Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase tracking-widest">
                        <Terminal size={12} className="text-indigo-400" />
                        <span>Nexus_Console / v1.0.0</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                        Link: Stable
                    </span>
                </div>
            </div>

            {/* Message Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide font-mono text-sm leading-relaxed"
            >
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] group relative ${msg.role === 'user' ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.05)]'} p-5 rounded-3xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-500`}>
                            <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                                {msg.role === 'user' ? 'Authorized_User' : 'Seedstr_Nexus'}
                            </div>
                            <div className={`text-zinc-200 ${msg.role === 'agent' ? 'whitespace-pre-wrap' : ''}`}>
                                {msg.content}
                            </div>
                            {msg.role === 'agent' && (
                                <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="p-2 bg-white/5 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                        <Code2 size={14} className="text-zinc-400" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl max-w-[85%]">
                            <div className="flex items-center gap-3 text-indigo-400">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                                    Agent_Reasoning...
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-8 border-t border-white/5 bg-white/5">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
                    <div className="relative flex items-center bg-[#0a0a0a] rounded-full border border-white/10 pr-2 pl-6 py-2 transition-all group-focus-within:border-indigo-500/50 group-focus-within:bg-black">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Initialize task: e.g. 'Build a DeFi dashboard scaffold'"
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600 text-[13px] font-mono"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white p-3 rounded-full transition-all shadow-lg active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-6 justify-center">
                    {[
                        { icon: Cpu, label: 'Compute: 1.2TF' },
                        { icon: CheckCircle2, label: 'Verified Auth' },
                        { icon: Code2, label: 'Next.js 15' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                            <item.icon size={12} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}
