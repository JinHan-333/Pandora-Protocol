"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function GoldenAgeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const [containerReady, setContainerReady] = useState(false);

    // Get the .monitor-content wrapper on mount
    useEffect(() => {
        if (sectionRef.current) {
            scrollContainerRef.current = sectionRef.current.closest(".monitor-content");
            setContainerReady(true);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container: containerReady ? scrollContainerRef : undefined,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [30, 0, 0, -30]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[800vh]"
            style={{
                background: "linear-gradient(180deg, var(--screen-bg) 0%, #d8d4cf 50%, var(--screen-bg) 100%)",
            }}
        >
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-[8%]">
                {/* Subtle vintage overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0,0,0,0.08) 0%, transparent 70%)",
                    }}
                />

                <motion.h2
                    style={{ opacity, y }}
                    className="relative z-10 text-[clamp(28px,4vw,56px)] font-normal text-foreground/85 text-center max-w-[800px] leading-[1.2]"
                >
                    <span className="block">You pressed ENTER.</span>
                    <span className="block h-[0.4em]" />
                    <span className="block">Most people do.</span>
                </motion.h2>
            </div>
        </section>
    );
}
