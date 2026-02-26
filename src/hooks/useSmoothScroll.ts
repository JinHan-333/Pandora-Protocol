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

        // Tuned for a buttery smooth, continuous 'float' effect
        const lenis = new Lenis({
            duration: 1.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            syncTouch: true,
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

        return () => {
            lenis.destroy();
        };
    }, [enabled, wrapperRef]);

    return lenisRef;
}
