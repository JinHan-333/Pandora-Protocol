"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

export default function DynamicScrollButton({
    onUnlockTerminal,
}: {
    onUnlockTerminal?: () => void;
}) {
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
        if (onUnlockTerminal) {
            onUnlockTerminal();
        } else {
            document.getElementById("pandora-terminal")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Intense aesthetic glitch animation for hover
    const glitchVariants: Variants = {
        idle: { x: 0, y: 0, opacity: 1 },
        hoverHover: {
            x: [0, -3, 3, -1, 2, 0, -4, 4, 0],
            y: [0, 2, -2, 3, -3, 0, 1, -1, 0],
            opacity: [1, 0.7, 1, 0.5, 1, 0.8, 1],
            transition: {
                duration: 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
            },
        },
    };

    // Expanding visceral rings - much bolder, thicker, colored
    const ringVariants: Variants = {
        idle: { scale: 0.8, opacity: 0 },
        pulse: {
            scale: [0.8, 1.8, 3.5],
            opacity: [0, 0.8, 0],
            transition: {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
            },
        },
    };

    const ringVariantsDelay: Variants = {
        idle: { scale: 0.8, opacity: 0 },
        pulse: {
            scale: [0.8, 1.8, 3.5],
            opacity: [0, 0.6, 0],
            transition: {
                duration: 2.2,
                delay: 1.1,
                repeat: Infinity,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative flex items-center justify-center w-full h-40 mt-12 mb-12">
            {/* Background pulsing rings - dark tinted for urgency */}
            <motion.div
                variants={ringVariants}
                initial="idle"
                animate={phase === "enter" && !isHovered ? "pulse" : "idle"}
                className="absolute w-32 h-32 border-2 border-foreground/40 rounded-full pointer-events-none"
            />
            <motion.div
                variants={ringVariantsDelay}
                initial="idle"
                animate={phase === "enter" && !isHovered ? "pulse" : "idle"}
                className="absolute w-32 h-32 border-2 border-foreground/30 rounded-full pointer-events-none"
            />

            {/* Main Interactive Button Area */}
            <motion.button
                onClick={scrollToTerminal}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={glitchVariants}
                initial="idle"
                animate={isHovered ? "hoverHover" : "idle"}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 flex flex-col items-center justify-center gap-4 group cursor-pointer focus:outline-none"
            >
                {/* Text Container with intense visual style - No Borders/Background */}
                <div className={`
                    h-14 overflow-hidden flex items-center justify-center relative w-72 
                    rounded-sm transition-all duration-300
                    ${isHovered
                        ? "scale-110"
                        : ""}
                `}>
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: phase === "lost" ? 1 : 0, y: phase === "lost" ? 0 : -15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-[12px] font-mono tracking-[0.3em] text-foreground/40 font-bold uppercase drop-shadow-md"
                    >
                        [ signal lost ]
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: phase === "override" ? 1 : 0, y: phase === "override" ? 0 : phase === "lost" ? 15 : -15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-[12px] font-mono tracking-[0.3em] text-foreground/60 uppercase drop-shadow-md"
                    >
                        [ override detected ]
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: phase === "enter" ? 1 : 0, y: phase === "enter" ? 0 : 15 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute text-[16px] font-mono uppercase transition-all duration-300 w-full text-center
                            ${isHovered ? "text-red-700 font-black tracking-[0.4em] drop-shadow-[0_0_16px_rgba(185,28,28,0.8)]" : "text-black font-black tracking-[0.25em] drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"}
                        `}
                    >
                        {isHovered ? "SPEAK TO PANDORA" : "[ AWAITING INPUT ]"}
                    </motion.span>

                    {/* Scanline overlay over the text box */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] dark:bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(255,255,255,0.1)_3px,rgba(255,255,255,0.1)_5px)]" />
                </div>

                {/* Central pointing line/structure - jagged line aesthetic */}
                <div className="relative flex flex-col items-center mt-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    <motion.div
                        animate={{ height: isHovered ? [30, 10, 40, 30] : 30 }}
                        transition={{ duration: 0.15, repeat: isHovered ? Infinity : 0 }}
                        className={`w-0.5 transition-colors duration-200 ${isHovered ? "bg-red-700 shadow-[0_0_10px_rgba(185,28,28,0.7)]" : "bg-black shadow-[0_0_5px_rgba(255,255,255,0.5)]"}`}
                    />
                    <div className={`w-2.5 h-2.5 border-[2px] rotate-45 transform translate-y-[-1px] transition-colors duration-200 
                        ${isHovered ? "border-red-700 bg-red-700 shadow-[0_0_12px_rgba(185,28,28,0.9)]" : "border-black bg-transparent shadow-[0_0_5px_rgba(255,255,255,0.5)]"}
                    `} />
                </div>
            </motion.button>
        </div>
    );
}
