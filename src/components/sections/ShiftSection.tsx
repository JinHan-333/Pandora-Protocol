"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScanLineText from "../ScanLineText";

export default function ShiftSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex flex-col justify-center px-[8%] py-24 overflow-hidden"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative text-[clamp(24px,3.5vw,48px)] font-bold tracking-tight text-foreground/85 mb-0 mt-8 leading-tight z-10"
            >
                They believed they were controlling the<span className="animate-pulse ml-1 text-foreground/50">_</span>
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="relative mt-8 group"
                style={{ marginLeft: "-8%", marginRight: "-8%", width: "calc(100% + 16%)" }}
            >
                {/* Full-width background scan lines */}
                <div
                    className="scan-lines-bg"
                    style={{
                        top: "5%",
                        bottom: "5%",
                        opacity: 0.45,
                    }}
                />

                <div className="relative px-[8%]">
                    <ScanLineText
                        text="MACHINE"
                        className="text-[clamp(80px,16vw,240px)] block tracking-tighter drop-shadow-[0_0_40px_rgba(0,0,0,0.2)] transition-all duration-700 font-bold"
                    />
                </div>
            </motion.div>
        </section>
    );
}
