"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import DynamicScrollButton from "@/components/DynamicScrollButton";

export default function RevealSection({
    onUnlockTerminal,
}: {
    onUnlockTerminal?: () => void;
}) {
    const sectionRef = useRef(null);
    const [binaryString, setBinaryString] = useState("");

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // --- Background Parallax ---
    // The binary background moves slower than the scroll
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // --- Text Reveal & Float ---
    // The main header floats up and fades
    const textY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0.5]);

    // --- Interactive Button Fade ---
    const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

    useEffect(() => {
        let str = "";
        for (let i = 0; i < 2500; i++) {
            str += Math.random() > 0.5 ? "1 " : "0 ";
        }
        setBinaryString(str);
    }, []);

    const HORIZONTAL_TEXT = "SYSTEM_TRACE_OVERRIDE_ENGAGED_".repeat(20);
    const VERTICAL_TEXT = "SIGNAL_LOST_REESTABLISHING_CONNECTION_".repeat(30);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-[8%] py-24 overflow-hidden"
            style={{ background: "var(--screen-bg)" }}
        >
            {/* Background Binary Field with Parallax */}
            <motion.div
                className="absolute top-[-25%] left-0 w-full h-[150%] overflow-hidden pointer-events-none opacity-20 z-0 px-4 pt-4 origin-top"
                style={{
                    y: yBg,
                    WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)"
                }}
            >
                <p className="text-[12px] font-mono leading-relaxed tracking-[0.2em] select-none break-all text-foreground text-justify">
                    {binaryString}
                </p>
            </motion.div>

            {/* Typographic Cross */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 0.4]) }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                {/* Horizontal line */}
                <div className="absolute w-full flex items-center justify-center overflow-hidden">
                    <div className="text-[10px] whitespace-nowrap font-mono tracking-[0.4em] text-foreground">
                        {HORIZONTAL_TEXT}
                    </div>
                </div>
                {/* Vertical line */}
                <div className="absolute h-[250vh] flex items-center justify-center overflow-hidden">
                    <div className="text-[10px] whitespace-nowrap font-mono tracking-[0.4em] text-red-600 -rotate-90">
                        {VERTICAL_TEXT}
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="text-center max-w-[700px] z-10"
            >
                <h2 className="text-[clamp(28px,4vw,56px)] font-mono tracking-normal text-foreground/90 leading-[1.2]">
                    Control Was Never Verified.
                </h2>
            </motion.div>

            {/* Dynamic Interactive Scroll Button */}
            <motion.div
                style={{ opacity: buttonOpacity }}
                className="mt-48 z-20"
            >
                <DynamicScrollButton onUnlockTerminal={onUnlockTerminal} />
            </motion.div>
        </section>
    );
}
