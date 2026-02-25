"use client";

import { useState, useCallback, useRef } from "react";
import MonitorFrame from "@/components/MonitorFrame";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import EnterScreen from "@/components/EnterScreen";
import PandoraChat from "@/components/PandoraChat";
import GoldenAgeSection from "@/components/sections/GoldenAgeSection";
import MetaphorSection from "@/components/sections/MetaphorSection";
import BloatedSection from "@/components/sections/BloatedSection";
import ShiftSection from "@/components/sections/ShiftSection";
import AiSection from "@/components/sections/AiSection";
import RevealSection from "@/components/sections/RevealSection";
import FooterSection from "@/components/sections/FooterSection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

type AppState = "loading" | "enter" | "content";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("loading");
  const showContent = appState === "content";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(showContent, scrollContainerRef);

  const handleLoadingComplete = useCallback(() => {
    setAppState("enter");
  }, []);

  const handleEnter = useCallback(() => {
    setAppState("content");
  }, []);

  return (
    <MonitorFrame>
      {/* Navbar - visible after enter */}
      <Navbar visible={appState !== "loading"} />

      {/* Loading screen overlay */}
      {appState === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Enter screen overlay */}
      {appState === "enter" && (
        <EnterScreen onEnter={handleEnter} />
      )}

      {/* Main scrollable content */}
      {showContent && (
        <div
          ref={scrollContainerRef}
          className="monitor-content absolute inset-0 overflow-y-auto"
          style={{
            pointerEvents: "auto",
          }}
        >
          {/* Scrollable sections below */}
          <MetaphorSection />
          <BloatedSection />
          <ShiftSection />
          <AiSection />
          <RevealSection />

          {/* Pandora terminal moved here */}
          <PandoraChat visible={true} />

          <FooterSection />
        </div>
      )}
    </MonitorFrame>
  );
}
