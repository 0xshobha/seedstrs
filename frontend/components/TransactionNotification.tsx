"use client";
import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
    message: string;
    type: NotificationType;
    isVisible: boolean;
    onClose: () => void;
}

export const TransactionNotification = ({ message, type, isVisible, onClose }: NotificationProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const icons = {
        success: <CheckCircle className="text-emerald-400" size={20} />,
        error: <AlertCircle className="text-red-400" size={20} />,
        info: <Info className="text-indigo-400" size={20} />,
    };

    const bgColors = {
        success: "bg-emerald-500/10 border-emerald-500/20",
        error: "bg-red-500/10 border-red-500/20",
        info: "bg-indigo-500/10 border-indigo-500/20",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, x: "-50%" }}
                    className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-md ${bgColors[type]}`}
                >
                    <div className="flex-shrink-0">{icons[type]}</div>
                    <p className="flex-grow text-sm font-medium text-white">{message}</p>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
