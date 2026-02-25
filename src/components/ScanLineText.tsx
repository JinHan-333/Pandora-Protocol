"use client";

import React from "react";

interface ScanLineTextProps {
    text: string;
    className?: string;
    dark?: boolean;
}

export default function ScanLineText({ text, className = "", dark = false }: ScanLineTextProps) {
    return (
        <div className={`scan-line-text ${dark ? "scan-line-text-dark" : ""} ${className}`}>
            {text}
        </div>
    );
}
