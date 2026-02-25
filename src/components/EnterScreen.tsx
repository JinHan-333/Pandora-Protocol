"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ScanLineText from "./ScanLineText";

interface EnterScreenProps {
    onEnter: () => void;
}

const enterTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function EnterScreen({ onEnter }: EnterScreenProps) {
    const fullText = "Initial access recorded";
    const [displayedText, setDisplayedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const [introDone, setIntroDone] = useState(false);
    const [visible, setVisible] = useState(true);

    // Typing animation — sets typingDone when finished
    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setTypingDone(true);
            }
        }, 40);

        return () => clearInterval(typingInterval);
    }, []);

    const handleEnter = useCallback(() => {
        if (!introDone) return;
        setVisible(false);
        setTimeout(onEnter, 600);
    }, [introDone, onEnter]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleEnter();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleEnter]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-[90] flex flex-col justify-center px-[6%] cursor-pointer"
                    style={{ background: "var(--screen-bg)", paddingTop: "12%" }}
                    onClick={handleEnter}
                >
                    {/* Typed text */}
                    <div className="mb-0">
                        <span className="text-[clamp(24px,3.5vw,48px)] font-normal text-foreground/80 leading-tight">
                            {displayedText}
                            <span className="typing-cursor inline-block w-[2px] h-[1em] bg-foreground/60 ml-1 align-text-bottom" />
                        </span>
                    </div>

                    {/* Giant ENTER with scan lines - full width with background lines */}
                    <motion.div
                        variants={enterTextVariants}
                        initial="hidden"
                        animate={typingDone ? "visible" : "hidden"}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onAnimationComplete={(definition) => {
                            if (definition === "visible") {
                                setIntroDone(true);
                            }
                        }}
                        className="relative w-full"
                        style={{ marginLeft: "-6%", marginRight: "-6%", width: "calc(100% + 12%)" }}
                    >
                        {/* Full-width background horizontal lines */}
                        <div
                            className="scan-lines-bg"
                            style={{
                                top: "0%",
                                bottom: "0%",
                                opacity: 0.5,
                            }}
                        />

                        {/* The ENTER text centered */}
                        <div className="relative px-[6%]">
                            <ScanLineText
                                text="ENTER"
                                className="text-[clamp(90px,18vw,280px)] block tracking-[-0.04em]"
                            />
                        </div>
                    </motion.div>

                    {/* Enter to Continue prompt — only rendered after intro completes */}
                    {introDone && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-end gap-2 pulse-enter"
                            style={{ marginTop: "20px", marginRight: "4%" }}
                        >
                            <span
                                className="inline-block text-[14px] font-medium lowercase"
                                style={{
                                    background: "#292929",
                                    color: "#E2DEDA",
                                    padding: "4px 10px",
                                    borderRadius: "2px",
                                    marginRight: "3px",
                                    lineHeight: "1.2",
                                }}
                            >
                                Enter
                            </span>
                            <span className="text-[14px] text-foreground/60">
                                to Proceed
                            </span>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
