"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import DynamicScrollButton from "@/components/DynamicScrollButton";

export default function RevealSection({
    onUnlockTerminal,
}: {
    onUnlockTerminal?: () => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [binaryString, setBinaryString] = useState("");

    useEffect(() => {
        if (isInView) {
            window.dispatchEvent(new CustomEvent('lock-scroll'));
        }
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
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center px-[8%] py-24 overflow-hidden snap-start"
            style={{ background: "var(--screen-bg)" }}
        >
            {/* Background Binary Field */}
            <div
                className="absolute top-0 left-0 w-full h-[60%] overflow-hidden pointer-events-none opacity-20 z-0 px-4 pt-4"
                style={{ WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)" }}
            >
                <p className="text-[12px] font-mono leading-relaxed tracking-[0.2em] select-none break-all text-foreground text-justify">
                    {binaryString}
                </p>
            </div>

            {/* Typographic Cross */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
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
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="text-center max-w-[700px] z-10"
            >
                <h2 className="text-[clamp(28px,4vw,56px)] font-mono tracking-normal text-foreground/90 leading-[1.2]">
                    Control Was Never Verified.
                </h2>
            </motion.div>

            {/* Dynamic Interactive Scroll Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-48 z-20"
            >
                <DynamicScrollButton onUnlockTerminal={onUnlockTerminal} />
            </motion.div>
        </section>
    );
}
