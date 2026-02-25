"use client";

import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

/**
 * Get a response for a user message from the backend API.
 */
async function getResponse(
    userMessage: string,
    history: ChatMessage[]
): Promise<string> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: history
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data.error);
            if (data.error && data.error.includes("not configured")) {
                return "[SYSTEM: API key missing. Please add OPENAI_API_KEY to .env.local]";
            }
            return "The connection severed. Try again.";
        }

        return data.reply;
    } catch (error) {
        console.error("Fetch Error:", error);
        return "The system is unreachable. Try again later.";
    }
}

// --- Hook ---

export function usePandoraChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const idCounter = useRef(0);

    const makeId = () => {
        idCounter.current += 1;
        return `msg-${idCounter.current}-${Date.now()}`;
    };

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || isTyping) return;

            const userMsg: ChatMessage = {
                id: makeId(),
                role: "user",
                content: trimmed,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsTyping(true);

            try {
                const response = await getResponse(trimmed, [
                    ...messages,
                    userMsg,
                ]);

                const assistantMsg: ChatMessage = {
                    id: makeId(),
                    role: "assistant",
                    content: response,
                    timestamp: Date.now(),
                };

                setMessages((prev) => [...prev, assistantMsg]);
            } catch {
                const errorMsg: ChatMessage = {
                    id: makeId(),
                    role: "assistant",
                    content: "The box falters. Try again.",
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsTyping(false);
            }
        },
        [isTyping, messages]
    );

    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return {
        messages,
        isOpen,
        isTyping,
        sendMessage,
        toggle,
        open,
        close,
    };
}
