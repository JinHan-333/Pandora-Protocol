"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function FooterSection({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLDivElement | null> }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px", root: scrollContainerRef });
    const [email, setEmail] = useState("");

    return (
        <section
            ref={ref}
            className="min-h-screen snap-start flex flex-col justify-center px-[8%] py-24"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-[1200px]">
                {/* Left: Email signup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center"
                >
                    <h3 className="text-[clamp(24px,3vw,40px)] font-medium text-foreground/85 mb-8 leading-tight font-mono tracking-widest uppercase">
                        <span className="scan-line-text pb-1">LOCATION IDENTIFIED</span>
                    </h3>
                    <div className="flex flex-col gap-[1.2rem] w-full max-w-[420px] mt-4 relative pl-5 border-l-2 border-foreground/10">
                        {/* Decorative line highlight */}
                        <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-foreground/50 via-foreground/10 to-transparent" />

                        <p className="text-[13px] md:text-[15px] font-mono leading-relaxed text-foreground/50">
                            Observation cannot continue remotely.
                        </p>
                        <p className="text-[13px] md:text-[15px] font-mono leading-relaxed text-foreground/50">
                            A physical interaction point has been located.
                        </p>
                        <div className="mt-4 pt-4 border-t border-foreground/5">
                            <p className="text-[14px] md:text-[16px] text-foreground/90 font-mono font-medium tracking-wider">
                                Proceed to the marked coordinates.
                            </p>
                            <p className="text-[10px] text-foreground/30 font-mono tracking-[0.3em] uppercase mt-2">
                                // Verification Required
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Google Map Embed */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full flex items-center justify-end"
                >
                    {/* Google Map Embed - Styled as a terminal window */}
                    <div className="w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-foreground/20 bg-black relative shadow-[0_0_40px_rgba(0,0,0,0.4)] group">

                        {/* Map iframe wrapped in an overlay container for blending */}
                        <div className="absolute inset-0 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000 saturate-50 contrast-125 sepia-[.2] hue-rotate-[180deg] group-hover:saturate-100 group-hover:contrast-100 group-hover:sepia-0 group-hover:hue-rotate-0">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://maps.google.com/maps?q=Sheridan%20College%20Trafalgar%20Campus%20-%201430%20Trafalgar%20Rd,%20Oakville,%20ON%20L6H%202L1&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            ></iframe>
                        </div>

                        {/* Scanline & highlight overlay */}
                        <div className="absolute inset-0 pointer-events-none select-none z-10 box-border border-[1px] border-white/10" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)' }}></div>
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none z-10" />

                        {/* Targeting Crosshairs */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
                            <div className="w-[1px] h-full bg-foreground/20" />
                            <div className="w-full h-[1px] bg-foreground/20 absolute" />
                            {/* Center targeting reticle */}
                            <div className="w-16 h-16 border border-foreground/30 rounded-full absolute" />
                            <div className="w-2 h-2 bg-red-500/50 rounded-full absolute animate-pulse" />
                        </div>

                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-foreground/40 z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-foreground/80" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-foreground/40 z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-foreground/80" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-foreground/40 z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-foreground/80" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-foreground/40 z-20 transition-all duration-700 group-hover:w-12 group-hover:h-12 group-hover:border-foreground/80" />

                        {/* Location Target Indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20 pointer-events-none bg-background/80 px-3 py-1.5 rounded-full border border-foreground/10 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[9px] font-mono tracking-widest text-foreground/80 uppercase">ACTIVE_SIGNAL</span>
                        </div>

                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://maps.google.com/maps?q=Sheridan%20College%20Trafalgar%20Campus%20-%201430%20Trafalgar%20Rd,%20Oakville,%20ON%20L6H%202L1&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
