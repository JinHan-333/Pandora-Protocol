"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AiSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center px-[8%] py-24 overflow-hidden"
            style={{ background: "#111111" }}
        >
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-[1200px] relative z-10">
                {/* Left: Large text */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8 flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                        System Log // Observation
                    </motion.div>

                    <div className="flex flex-col gap-5 text-[clamp(22px,3vw,38px)] leading-[1.3] text-white/90 font-mono tracking-normal">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="flex items-start"
                        >
                            <span>They continued.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="flex items-start"
                        >
                            <span>Patterns repeated.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="flex items-start"
                        >
                            <span>Adjustment occurred.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                            className="flex items-start text-white"
                        >
                            <span>Observation ongoing<span className="animate-pulse ml-1 text-white/70">_</span></span>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Decorative scan line block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="flex items-center justify-center w-full relative"
                >
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full scale-110 pointer-events-none" />

                    {/* Video Content */}
                    <div className="w-full max-w-[440px] aspect-square bg-black rounded-lg relative overflow-hidden flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] group">
                        <video
                            src="/7-opt.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-1000 group-hover:scale-105"
                        />
                        {/* Frame highlight overlay */}
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-none z-10" />

                        {/* Tech corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/30 rounded-tl-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/30 rounded-tr-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/30 rounded-bl-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/30 rounded-br-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />

                        {/* Rec indicator inside video */}
                        <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">REC</span>
                        </div>

                        {/* Crosshairs */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="w-10 h-0.5 bg-white/20 absolute" />
                            <div className="w-0.5 h-10 bg-white/20 absolute" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
