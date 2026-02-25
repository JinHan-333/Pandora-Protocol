"use client";

import { motion } from "framer-motion";

interface NavbarProps {
    visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-4"
            style={{ pointerEvents: visible ? "auto" : "none" }}
        >
            {/* Left side */}
            <div className="flex items-start gap-8">
                <span className="text-[11px] font-medium tracking-wide text-foreground/80">
                    Human Interface Research Network.
                </span>
                {/* <div className="text-[10px] leading-tight text-foreground/50">
                    <div>Archive Access: Limited.</div>
                </div> */}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
                <span className="text-[12px] font-mono tracking-normal text-foreground/70">
                    Archive Access: Limited.
                </span>
            </div>
        </motion.nav>
    );
}
