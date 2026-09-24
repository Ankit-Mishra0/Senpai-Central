"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const SUGGESTED_PROMPTS = [
  "🔥 What is the latest trending anime news?",
  "⚔️ Any updates on Jujutsu Kaisen?",
  "👑 What are the top ranked anime?",
  "🍿 Tell me about upcoming anime trailers",
];

function formatMarkdown(text) {
  if (!text) return "";

  const lines = text.split("\n");
  const elements = [];

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`empty-${lineIdx}`} className="h-2" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4
          key={`h3-${lineIdx}`}
          className="text-purple-300 font-semibold text-sm mt-2 mb-1"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h4>,
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h3
          key={`h2-${lineIdx}`}
          className="text-purple-400 font-bold text-base mt-2 mb-1"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h3>,
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h2
          key={`h1-${lineIdx}`}
          className="text-purple-400 font-extrabold text-lg mt-3 mb-1"
        >
          {trimmed.replace(/^#\s+/, "")}
        </h2>,
      );
      return;
    }

    const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
    const content = isBullet ? trimmed.replace(/^[-*]\s+/, "") : trimmed;

    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    const renderedParts = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="text-purple-200 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      elements.push(
        <li
          key={`li-${lineIdx}`}
          className="ml-4 list-disc text-zinc-300 text-sm my-0.5"
        >
          {renderedParts}
        </li>,
      );
    } else {
      elements.push(
        <p
          key={`p-${lineIdx}`}
          className="text-zinc-300 text-sm leading-relaxed my-1"
        >
          {renderedParts}
        </p>,
      );
    }
  });

  return elements;
}

export default function AiChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Konnichiwa! I am **Senpai AI** ⚡\nAsk me anything about anime news, release dates, upcoming seasons, or rankings from the Senpai Central archive!",
      sources: [],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  if (pathname === "/ai-assistant") {
    return null;
  }

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === "string" ? textToSend : input;
    if (!query.trim() || isLoading) return;

    const userMessage = { role: "user", text: query.trim(), sources: [] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = updatedMessages
        .slice(0, -1)
        .slice(-6)
        .map((m) => ({
          role: m.role === "model" ? "model" : "user",
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query.trim(),
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.answer || "No response received.",
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.error("Error asking Senpai AI:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Gomen ne! An error occurred while retrieving anime news. Please try asking again.",
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Chat cleared! What anime topic would you like to explore next?",
        sources: [],
      },
    ]);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-purple-400/40"
            aria-label="Open Senpai AI"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-sm tracking-wide">
              <span>Ask Senpai AI</span>
              <span className="text-yellow-300 text-base animate-pulse">
                ⚡
              </span>
            </div>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-[#0c0d14]/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-label="Senpai AI Assistant"
        >
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-purple-950/80 via-zinc-900/90 to-zinc-950/90 border-b border-purple-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    Senpai AI
                  </h3>
                  <span className="text-[10px] bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded-full border border-purple-500/30">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  News Archive & Gemini
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/ai-assistant");
                }}
                className="p-1.5 text-zinc-400 hover:text-purple-300 hover:bg-purple-950/50 rounded-lg transition-colors cursor-pointer"
                title="Open Dedicated Full Page"
                aria-label="Open Full Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>

              <button
                onClick={clearChat}
                className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                title="Clear conversation"
                aria-label="Clear chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                title="Minimize widget"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs shadow-[0_2px_10px_rgba(168,85,247,0.3)]"
                      : "bg-zinc-900/90 text-zinc-100 border border-purple-500/20 rounded-tl-xs shadow-md"
                  }`}
                >
                  {formatMarkdown(msg.text)}
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 w-full max-w-[95%] bg-purple-950/20 border border-purple-500/20 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-purple-300 font-semibold mb-2">
                      <span>📰</span>
                      <span>Sources from Senpai Central Archive</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {msg.sources.slice(0, 3).map((source, sIdx) => (
                        <Link
                          key={sIdx}
                          href={`/article?url=${encodeURIComponent(source.url)}&title=${encodeURIComponent(source.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-1.5 rounded-lg bg-zinc-900/60 hover:bg-purple-900/30 border border-zinc-800 hover:border-purple-500/40 transition-colors group"
                        >
                          {source.image && (
                            <img
                              src={source.image}
                              alt=""
                              className="w-10 h-10 object-cover rounded shrink-0 bg-zinc-800"
                            />
                          )}
                          <div className="overflow-hidden flex-1">
                            <p className="text-zinc-200 group-hover:text-purple-300 font-medium truncate text-xs">
                              {source.title}
                            </p>
                            <span className="text-[10px] text-zinc-400 group-hover:text-purple-400">
                              Read full article →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-purple-300 bg-zinc-900/80 border border-purple-500/30 rounded-2xl px-3.5 py-2.5 max-w-[70%]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="animate-pulse">Senpai AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-2">
              <p className="text-[11px] text-zinc-400 font-medium mb-1.5">
                Suggested Questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] bg-zinc-900/90 hover:bg-purple-900/50 text-zinc-300 hover:text-purple-200 border border-zinc-800 hover:border-purple-500/40 px-2.5 py-1 rounded-full transition-colors text-left cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-zinc-950 border-t border-purple-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-zinc-900/90 border border-purple-500/30 focus-within:border-purple-500 rounded-xl px-3 py-1.5 transition-colors"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about any anime or news..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 text-white p-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
            <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-zinc-500">
              <span>Uses Neon DB + Gemini</span>
              <Link
                href="/ai-assistant"
                className="text-purple-400 hover:text-purple-300 hover:underline"
              >
                Open Full Screen ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
