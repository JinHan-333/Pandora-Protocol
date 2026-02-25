"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * DeviceFrame — renders the physical monitor bezel effect on a <canvas>.
 *
 * Replicates the reference site's 4-layer rendering pipeline:
 * 1. Base fill (#b0aba5)
 * 2. Grain texture overlay (device-texture.webp repeating pattern)
 * 3. Directional inset shadows (dark top/left, blur 30px)
 * 4. Highlight rims (light bottom/right, blur 30px)
 *
 * Plus outer drop shadows for floating depth.
 */

interface DeviceFrameProps {
    /** Padding values matching the bezel geometry */
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    /** Inner screen border radius */
    screenRadius: number;
}

export default function DeviceFrame({
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    screenRadius,
}: DeviceFrameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textureRef = useRef<HTMLImageElement | null>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.scale(dpr, dpr);

        // Screen cutout coordinates
        const sx = paddingLeft;
        const sy = paddingTop;
        const sw = w - paddingLeft - paddingRight;
        const sh = h - paddingTop - paddingBottom;
        const r = screenRadius;

        // --- Build frame path (full viewport with rounded rect cutout) ---
        const framePath = new Path2D();
        framePath.rect(0, 0, w, h);
        // Rounded rect cutout (counter-clockwise for evenodd)
        framePath.moveTo(sx + r, sy);
        framePath.lineTo(sx + sw - r, sy);
        framePath.arcTo(sx + sw, sy, sx + sw, sy + r, r);
        framePath.lineTo(sx + sw, sy + sh - r);
        framePath.arcTo(sx + sw, sy + sh, sx + sw - r, sy + sh, r);
        framePath.lineTo(sx + r, sy + sh);
        framePath.arcTo(sx, sy + sh, sx, sy + sh - r, r);
        framePath.lineTo(sx, sy + r);
        framePath.arcTo(sx, sy, sx + r, sy, r);
        framePath.closePath();

        // --- Layer 0: Outer drop shadows ---
        ctx.save();
        // We draw the frame 3x with different shadow settings
        const shadows = [
            { blur: 90, ox: 0, oy: 0, color: "rgba(47,47,47,0.33)" },
            { blur: 30, ox: 4, oy: 12, color: "rgba(47,47,47,0.5)" },
            { blur: 5, ox: 0, oy: 0, color: "rgba(47,47,47,0.33)" },
        ];

        for (const s of shadows) {
            ctx.save();
            ctx.shadowBlur = s.blur;
            ctx.shadowOffsetX = s.ox;
            ctx.shadowOffsetY = s.oy;
            ctx.shadowColor = s.color;
            ctx.fillStyle = "rgba(0,0,0,0)";
            // Clip so only the shadow is drawn (not the fill itself)
            // We draw outside the screen cutout
            ctx.fillStyle = "#b0aba5";
            ctx.fill(framePath, "evenodd");
            ctx.restore();
        }
        ctx.restore();

        // --- Layer 1: Base fill ---
        ctx.save();
        ctx.fillStyle = "#b0aba5";
        ctx.fill(framePath, "evenodd");
        ctx.restore();

        // --- Layer 2: Grain texture ---
        const tex = textureRef.current;
        if (tex && tex.complete && tex.naturalWidth > 0) {
            ctx.save();
            const pattern = ctx.createPattern(tex, "repeat");
            if (pattern) {
                ctx.globalAlpha = 0.6;
                ctx.fillStyle = pattern;
                ctx.fill(framePath, "evenodd");
            }
            ctx.restore();
        }

        // --- Layer 3: Directional inset shadows (recessed screen edges) ---
        // We draw shapes along each edge with blur filter

        if (typeof ctx.filter !== "undefined") {
            ctx.save();
            ctx.filter = "blur(30px)";

            // Clip to the frame area only
            ctx.save();
            ctx.clip(framePath, "evenodd");

            // Top edge shadow (dark)
            const topPath = new Path2D();
            topPath.rect(sx - 40, sy - 10, sw + 80, 50);
            ctx.fillStyle = "rgba(71,66,61,0.4)";
            ctx.fill(topPath);

            // Left edge shadow (dark, lighter)
            const leftPath = new Path2D();
            leftPath.rect(sx - 10, sy - 40, 50, sh + 80);
            ctx.fillStyle = "rgba(71,66,61,0.2)";
            ctx.fill(leftPath);

            // Bottom edge highlight (light)
            const bottomPath = new Path2D();
            bottomPath.rect(sx - 40, sy + sh - 40, sw + 80, 50);
            ctx.fillStyle = "rgba(245,240,245,0.3)";
            ctx.fill(bottomPath);

            // Right edge highlight (light, lighter)
            const rightPath = new Path2D();
            rightPath.rect(sx + sw - 40, sy - 40, 50, sh + 80);
            ctx.fillStyle = "rgba(245,240,245,0.15)";
            ctx.fill(rightPath);

            ctx.restore(); // unclip
            ctx.filter = "none";
            ctx.restore();
        }
    }, [paddingTop, paddingBottom, paddingLeft, paddingRight, screenRadius]);

    useEffect(() => {
        // Load texture
        const img = new Image();
        img.src = "/image/device-texture.webp";
        img.onload = () => {
            textureRef.current = img;
            draw();
        };
        // Draw even without texture
        draw();

        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                zIndex: 100,
                pointerEvents: "none",
            }}
        />
    );
}
