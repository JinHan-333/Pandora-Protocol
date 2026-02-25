"use client";

import React, { useState, useEffect } from "react";
import DeviceFrame from "./DeviceFrame";

interface MonitorFrameProps {
  children: React.ReactNode;
}

export default function MonitorFrame({ children }: MonitorFrameProps) {
  const [padding, setPadding] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      setPadding({
        top: vh * 0.09,    // 9dvh
        bottom: vh * 0.09, // 9dvh
        left: vw * 0.075,  // 7.5dvw
        right: vw * 0.075, // 7.5dvw
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {/* Frame border — full viewport, padding creates the bezel */}
      <div
        className="fixed inset-0 flex flex-col"
        style={{
          padding: "9dvh 7.5dvw",
          backgroundColor: "#292929",
          border: "1px solid rgba(180, 175, 168, 0.15)",
          boxShadow: [
            // Wide soft outer glow — floating depth
            "0 0 80px 20px rgba(0, 0, 0, 0.35)",
            "0 8px 60px rgba(0, 0, 0, 0.3)",
            "0 2px 20px rgba(0, 0, 0, 0.25)",
            // Inset highlight along top edge — rim light
            "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
            "inset 0 2px 8px rgba(255, 255, 255, 0.03)",
            // Inner edge darkening — hardware recess feel
            "inset 0 -2px 12px rgba(0, 0, 0, 0.2)",
            "inset 0 0 40px rgba(0, 0, 0, 0.15)",
          ].join(", "),
        }}
      >
        {/* Canvas-rendered bezel effect */}
        <DeviceFrame
          paddingTop={padding.top}
          paddingBottom={padding.bottom}
          paddingLeft={padding.left}
          paddingRight={padding.right}
          screenRadius={20}
        />

        {/* Inset shadow overlay — sits above canvas, below interactive content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 200,
            pointerEvents: "none",
            boxShadow: [
              "inset 0 4px 20px rgba(0,0,0,0.6)",
              "inset 0 -4px 20px rgba(0,0,0,0.4)",
              "inset 4px 0 16px rgba(0,0,0,0.35)",
              "inset -4px 0 16px rgba(0,0,0,0.35)",
              "inset 0 0 60px rgba(0,0,0,0.3)",
              "inset 0 1px 0 rgba(255,255,255,0.05)",
            ].join(", "),
          }}
        />

        {/* Inner screen area */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            background: "rgb(226, 222, 218)",
            borderRadius: "20px",
            zIndex: 101,
          }}
        >
          {children}

          {/* Inset shadow overlay — always visible on top of all content */}
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              zIndex: 999,
              pointerEvents: "none",
              boxShadow: [
                "inset 0 6px 24px rgba(0,0,0,0.25)",
                "inset 0 -4px 16px rgba(0,0,0,0.15)",
                "inset 6px 0 20px rgba(0,0,0,0.18)",
                "inset -6px 0 20px rgba(0,0,0,0.18)",
                "inset 0 0 50px rgba(0,0,0,0.08)",
                "inset 0 1px 0 rgba(255,255,255,0.4)",
              ].join(", "),
            }}
          />
        </div>

        {/* Bottom center logo */}
        <div
          className="absolute z-[1000]"
          style={{
            width: "36px",
            aspectRatio: "64 / 42",
            bottom: "4.5dvh",
            left: "calc(50% - 18px)",
            transform: "translateY(50%)",
            backgroundImage: "url(/image/logo.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </>
  );
}
