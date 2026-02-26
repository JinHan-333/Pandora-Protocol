"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function MetaphorSection() {
    const ref = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && videoRef.current) {
            window.dispatchEvent(new CustomEvent('lock-scroll'));
            const video = videoRef.current;
            // Force a browser reflow to wake up the hardware decoder
            video.style.display = 'none';
            void video.offsetHeight; // Trigger reflow
            video.style.display = 'block';
            video.play().catch(e => console.warn("Video playback failed:", e));
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center justify-center px-[8%] py-24 snap-start snap-always"
        >
            <div className="flex flex-col md:flex-row items-end justify-center gap-12 md:gap-16 w-full max-w-[1200px]">
                {/* Left: Stylized GUI Window */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex items-center justify-center shrink-0"
                >
                    <div className="w-[80vw] sm:w-[400px] aspect-[4/3] bg-black rounded-lg relative overflow-hidden flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] group">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-[60px] rounded-full scale-110 pointer-events-none" />

                        <video
                            ref={videoRef}
                            src="/1-opt.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-1000 group-hover:scale-105 transform-gpu will-change-transform"
                        />
                        {/* Frame highlight overlay: ensures the top edge isn't clipped by the video */}
                        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] pointer-events-none z-10" />

                        {/* Tech corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-foreground/30 rounded-tl-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-foreground/30 rounded-tr-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-foreground/30 rounded-bl-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-foreground/30 rounded-br-lg z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12" />

                        {/* Rec indicator inside video */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20 bg-background/40 backdrop-blur-sm px-2 py-1 rounded-full border border-foreground/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[9px] font-mono tracking-widest text-foreground/50 uppercase">REC</span>
                        </div>

                        {/* Crosshairs */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="w-10 h-0.5 bg-foreground/20 absolute" />
                            <div className="w-0.5 h-10 bg-foreground/20 absolute" />
                        </div>
                    </div>
                </motion.div>

                {/* Right: Body text */}
                <div className="flex shrink-0 items-end">
                    <div className="flex flex-col gap-4 text-[clamp(14px,1.5vw,20px)] leading-[1.6] text-foreground font-mono tracking-normal mt-4 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-2 flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-foreground/40 uppercase"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                            System Trace // Fragment
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Recognition Confirmed.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Connection Permitted.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Response Delay Minimal.</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Interface Matched Expected Patterns.</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
