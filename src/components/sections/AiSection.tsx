"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function AiSection() {
    const sectionRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // --- Background Parallax ---
    // The background grid moves slightly slower than the scroll to create depth
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    // --- Text Sequence Fades ---
    // The text block floats up and fades in as the user scrolls
    const textY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0]);

    // --- Video Focus Pull ---
    // Video starts small and dim, focuses in the center, blurs/dims out as it leaves
    const videoScale = useTransform(scrollYProgress, [0.1, 0.5, 0.7, 1], [0.8, 1, 1, 0.8]);
    const videoOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0.1, 1, 1, 0.1]);

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
            className="relative min-h-screen flex items-center px-[8%] py-24 overflow-hidden"
            style={{ background: "#111111" }}
        >
            {/* Subtle background grid with parallax */}
            <motion.div
                className="absolute inset-0 opacity-[0.03] pointer-events-none origin-top -top-[25%] h-[125%]"
                style={{
                    y: yBg,
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-[1200px] relative z-10">
                {/* Left: Large text */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="flex flex-col justify-center"
                >
                    <div className="mb-8 flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
                        System Log // Observation
                    </div>

                    <div className="flex flex-col gap-5 text-[clamp(22px,3vw,38px)] leading-[1.3] text-white/90 font-mono tracking-normal">
                        <div className="flex items-start">
                            <span>They continued.</span>
                        </div>
                        <div className="flex items-start">
                            <span>Patterns repeated.</span>
                        </div>
                        <div className="flex items-start">
                            <span>Adjustment occurred.</span>
                        </div>
                        <div className="flex items-start text-white">
                            <span>Observation ongoing<span className="animate-pulse ml-1 text-white/70">_</span></span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Decorative scan line block */}
                <motion.div
                    style={{ scale: videoScale, opacity: videoOpacity }}
                    className="flex items-center justify-center w-full relative origin-left"
                >
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full scale-110 pointer-events-none" />

                    {/* Video Content */}
                    <div className="w-full max-w-[440px] aspect-square bg-black rounded-lg relative overflow-hidden flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] group">
                        <video
                            ref={videoRef}
                            src="/7-opt.mp4"
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
