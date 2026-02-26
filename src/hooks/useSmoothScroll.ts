"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useSmoothScroll(
    enabled: boolean = true,
    wrapperRef?: React.RefObject<HTMLElement | null>
) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const wrapper = wrapperRef?.current;
        if (wrapperRef && !wrapper) return;

        const lenis = new Lenis({
            duration: 2.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.8,
            ...(wrapper
                ? {
                    wrapper: wrapper,
                }
                : {}),
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Global scroll lock listener
        let lockTimeout: NodeJS.Timeout;
        const handleScrollLock = () => {
            lenis.stop();
            clearTimeout(lockTimeout);
            lockTimeout = setTimeout(() => {
                lenis.start();
            }, 1200);
        };

        window.addEventListener("lock-scroll", handleScrollLock);

        return () => {
            window.removeEventListener("lock-scroll", handleScrollLock);
            clearTimeout(lockTimeout);
            lenis.destroy();
        };
    }, [enabled, wrapperRef]);

    return lenisRef;
}
