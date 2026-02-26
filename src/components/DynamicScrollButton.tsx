"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

export default function DynamicScrollButton() {
    const [phase, setPhase] = useState<"lost" | "override" | "enter">("lost");
    const [isHovered, setIsHovered] = useState(false);

    // Storytelling text phases
    useEffect(() => {
        const t1 = setTimeout(() => setPhase("override"), 2000);
        const t2 = setTimeout(() => setPhase("enter"), 4000);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const scrollToTerminal = () => {
        document.getElementById("pandora-terminal")?.scrollIntoView({ behavior: "smooth" });
    };

    // Glitch animation variants for the "tremble" effect on hover
    const glitchVariants: Variants = {
        idle: { x: 0, y: 0, opacity: 1 },
        hoverHover: {
            x: [0, -2, 2, -1, 1, 0, -3, 3, 0],
            y: [0, 1, -1, 2, -2, 0, 1, -1, 0],
            opacity: [1, 0.8, 1, 0.6, 1, 0.9, 1],
            transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
            },
        },
    };

    // Expanding sonar ring variants
    const ringVariants: Variants = {
        idle: { scale: 0.8, opacity: 0 },
        pulse: {
            scale: [0.8, 1.5, 2.5],
            opacity: [0, 0.5, 0],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
            },
        },
    };

    const ringVariantsDelay: Variants = {
        idle: { scale: 0.8, opacity: 0 },
        pulse: {
            scale: [0.8, 1.5, 2.5],
            opacity: [0, 0.5, 0],
            transition: {
                duration: 2.5,
                delay: 1.25,
                repeat: Infinity,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative flex items-center justify-center w-full h-32">
            {/* Background pulsing "sonar" rings to draw the eye */}
            <motion.div
                variants={ringVariants}
                initial="idle"
                animate={phase === "enter" && !isHovered ? "pulse" : "idle"}
                className="absolute w-24 h-24 border border-foreground/20 rounded-full pointer-events-none"
            />
            <motion.div
                variants={ringVariantsDelay}
                initial="idle"
                animate={phase === "enter" && !isHovered ? "pulse" : "idle"}
                className="absolute w-24 h-24 border border-foreground/10 rounded-full pointer-events-none"
            />

            {/* Main Interactive Button Area */}
            <motion.button
                onClick={scrollToTerminal}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={glitchVariants}
                initial="idle"
                animate={isHovered ? "hoverHover" : "idle"}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex flex-col items-center justify-center gap-2 group cursor-pointer focus:outline-none"
            >
                {/* Text Container with narrative swapping state */}
                <div className="h-6 overflow-hidden flex items-center justify-center relative w-48 bg-foreground/5 border border-foreground/10 rounded-sm">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: phase === "lost" ? 1 : 0, y: phase === "lost" ? 0 : -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-[9px] font-mono tracking-[0.2em] text-red-500/80 uppercase"
                    >
                        [ signal lost ]
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: phase === "override" ? 1 : 0, y: phase === "override" ? 0 : phase === "lost" ? 10 : -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-[9px] font-mono tracking-[0.2em] text-foreground/50 uppercase"
                    >
                        [ override detected ]
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: phase === "enter" ? 1 : 0, y: phase === "enter" ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute text-[10px] font-mono tracking-[0.2em] font-bold uppercase transition-colors duration-200 ${isHovered ? "text-foreground" : "text-foreground/70"}`}
                    >
                        {isHovered ? "> ACCESS TERMINAL <" : "[ SCROLL DOWN ]"}
                    </motion.span>

                    {/* Scanline overlay over the text box */}
                    <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] dark:bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)]" />
                </div>

                {/* Central pointing line/structure */}
                <div className="relative flex flex-col items-center mt-1">
                    <motion.div
                        animate={{ height: isHovered ? [24, 12, 32, 24] : 24 }}
                        transition={{ duration: 0.2 }}
                        className="w-[1px] bg-foreground/40 transition-colors duration-200 group-hover:bg-foreground/80"
                    />
                    <div className="w-1.5 h-1.5 border border-foreground/40 rotate-45 transform translate-y-[-1px] transition-colors duration-200 group-hover:border-foreground/80 group-hover:bg-foreground/20" />
                </div>
            </motion.button>
        </div>
    );
}
