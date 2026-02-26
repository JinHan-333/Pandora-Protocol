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
            duration: 2.2, // Increased from 1.8 for a slightly longer, smoother decay
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.65, // Decreased from 0.9 to make the scroll wheel move less distance per tick
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
