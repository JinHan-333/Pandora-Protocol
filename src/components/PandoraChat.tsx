"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePandoraChat } from "@/hooks/usePandoraChat";
import type { ChatMessage } from "@/hooks/usePandoraChat";

// --- Typewriter for bot messages ---
function TypewriterText({
    text,
    onComplete,
}: {
    text: string;
    onComplete?: () => void;
}) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        let index = 0;
        setDisplayed("");
        setDone(false);

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayed(text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setDone(true);
                onComplete?.();
            }
        }, 25);

        return () => clearInterval(interval);
    }, [text, onComplete]);

    return (
        <span>
            {displayed}
            {!done && (
                <span className="typing-cursor inline-block w-[2px] h-[1em] bg-foreground/60 ml-[2px] align-text-bottom" />
            )}
        </span>
    );
}

// --- Single message row ---
function MessageRow({
    message,
    isLatestAssistant,
}: {
    message: ChatMessage;
    isLatestAssistant: boolean;
}) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`pandora-msg ${isUser ? "pandora-msg-user" : "pandora-msg-bot"}`}
        >
            <span className="pandora-msg-label">
                {isUser ? "YOU" : "PANDORA"}
            </span>
            <div className="pandora-msg-content">
                {isUser || !isLatestAssistant ? (
                    message.content
                ) : (
                    <TypewriterText text={message.content} />
                )}
            </div>
        </motion.div>
    );
}

// --- Main embedded terminal ---
interface PandoraChatProps {
    visible: boolean;
}

export default function PandoraChat({ visible }: PandoraChatProps) {
    const { messages, isTyping, sendMessage } = usePandoraChat();
    const [input, setInput] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom — only within the messages container
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages, isTyping]);

    // Focus input when terminal becomes visible - Disabled to prevent scroll-jacking
    useEffect(() => {
        // if (visible) {
        //     const t = setTimeout(() => inputRef.current?.focus(), 500);
        //     return () => clearTimeout(t);
        // }
    }, [visible]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage(input);
            setInput("");
        },
        [input, sendMessage]
    );

    // Find latest assistant message for typewriter
    const latestAssistantIdx = (() => {
        for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].role === "assistant") return i;
        }
        return -1;
    })();

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pandora-terminal"
        >
            {/* Terminal header bar */}
            <div className="pandora-term-header font-mono">
                <div className="pandora-term-header-left">
                    <span className="pandora-term-title text-[1.1em] font-bold tracking-[0.2em] text-foreground">PANDORA</span>
                    <span className="pandora-term-ver text-foreground/70 tracking-normal">
                        v0.1 — connection established
                    </span>
                </div>
                <div className="pandora-term-status">
                    <span className="pandora-term-dot" />
                    <span className="pandora-term-status-text font-mono tracking-normal text-foreground font-bold">listening</span>
                </div>
            </div>

            {/* Scan line overlay */}
            <div className="pandora-term-scanlines" />

            {/* Messages area — independently scrollable */}
            <div
                ref={messagesContainerRef}
                className="pandora-term-messages"
                style={{ overscrollBehavior: "contain" }}
            >
                {/* Welcome / empty state */}
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pandora-term-welcome"
                    >
                        <p className="pandora-term-welcome-main font-mono text-[1em] font-bold tracking-[0.1em] text-foreground">
                            The box is open.
                        </p>
                        <p className="pandora-term-welcome-sub font-mono tracking-normal text-[0.85em] text-foreground/70 mt-2">
                            Type something to begin the conversation.
                        </p>
                        <div className="pandora-term-welcome-line" />
                    </motion.div>
                )}

                {messages.map((msg, i) => (
                    <MessageRow
                        key={msg.id}
                        message={msg}
                        isLatestAssistant={
                            msg.role === "assistant" &&
                            i === latestAssistantIdx
                        }
                    />
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pandora-msg pandora-msg-bot"
                    >
                        <span className="pandora-msg-label">PANDORA</span>
                        <div className="pandora-msg-content">
                            <span className="typing-cursor inline-block w-[2px] h-[1.1em] bg-foreground/60 align-text-bottom" />
                        </div>
                    </motion.div>
                )}


            </div>

            {/* Input prompt */}
            <form onSubmit={handleSubmit} className="pandora-term-input-area">
                <span className="pandora-term-prompt font-mono text-[1.1em] text-foreground/50">›</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ask the box..."
                    className="pandora-term-input font-mono text-foreground tracking-normal"
                    disabled={isTyping}
                    autoComplete="off"
                    spellCheck={false}
                />
            </form>
        </motion.div>
    );
}
