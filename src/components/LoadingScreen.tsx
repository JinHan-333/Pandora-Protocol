"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const duration = 2000;
        const interval = 30;
        const steps = duration / interval;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const p = Math.min(Math.round((step / steps) * 100), 100);
            setProgress(p);

            if (p >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    setVisible(false);
                    setTimeout(onComplete, 500);
                }, 600);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-[100] flex items-start p-[8%]"
                    style={{ background: "var(--screen-bg)" }}
                >
                    <div className="flex items-start gap-16">
                        <span className="text-[13px] font-medium text-foreground/60 tracking-wide mt-[1px]">
                            Status
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-medium text-foreground/80">
                                {progress >= 100 ? "Done" : "Loading"}
                            </span>
                            {/* Progress bar */}
                            <div className="w-[200px] h-[14px] border border-foreground/30 relative overflow-hidden">
                                <div
                                    className="h-full transition-all duration-75"
                                    style={{
                                        width: `${progress}%`,
                                        background: "repeating-linear-gradient(90deg, var(--foreground) 0px, var(--foreground) 3px, transparent 3px, transparent 5px)",
                                    }}
                                />
                            </div>
                            <span className="text-[12px] text-foreground/50 font-mono">
                                {progress}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
