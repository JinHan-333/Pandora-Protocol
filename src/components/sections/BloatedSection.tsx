"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function BloatedSection({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLDivElement | null> }) {
    const sectionRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container: scrollContainerRef,
        offset: ["start end", "end start"]
    });

    // --- Text Reveal & Float ---
    const textY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.9], [0, 1, 1, 0]);

    // --- Video Reveal & Float ---
    // Video comes in slightly after text, floats up and fades
    const videoY = useTransform(scrollYProgress, [0.4, 0.6], [60, 0]);
    const videoOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.9], [0, 1, 1, 0]);

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.style.display = 'none';
            void video.offsetHeight;
            video.style.display = 'block';
            video.play().catch(e => console.warn("Video playback failed:", e));
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen snap-start flex items-center px-[8%] py-24"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-[1200px] items-end">
                {/* Left: Text */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="flex flex-col"
                >
                    <div className="flex flex-col gap-4 text-[clamp(14px,1.5vw,20px)] leading-[1.6] text-foreground font-mono tracking-normal mt-4 md:mt-0">
                        <div className="mb-2 flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-foreground/40 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                            System Trace // Return
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Activity persists.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Return detected.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">No interruption observed.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-foreground/30 text-[0.7em]">▶</span>
                            <span className="opacity-90">Presence maintained.</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Decorative blobs + caption */}
                <motion.div
                    style={{ y: videoY, opacity: videoOpacity }}
                    className="flex flex-col items-start w-full relative"
                >
                    {/* Video Content */}
                    <div className="w-full max-w-[600px] aspect-[4/3] bg-black rounded-lg relative overflow-hidden flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] group">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-[60px] rounded-full scale-110 pointer-events-none" />

                        <video
                            ref={videoRef}
                            src="/5-opt.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-1000 group-hover:scale-105 transform-gpu will-change-transform"
                        />
                        {/* Frame highlight overlay */}
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

                    <p className="absolute top-full mt-6 text-[11px] text-foreground/40 italic leading-relaxed max-w-[280px]">
                        Fig.02 — Attention patterns remain active.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
