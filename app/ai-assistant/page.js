"use client";
import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Particles from "../components/Particle";
import Link from "next/link";

const SUGGESTED_PROMPTS = [
  "🔥 What is the latest trending anime news?",
  "⚔️ Tell me all updates on Jujutsu Kaisen",
  "👑 What are the current top ranked anime?",
  "🍿 Which anime trailers are out recently?",
  "⚡ What's happening in Bleach Thousand-Year Blood War?",
  "🌸 Any announcements for Demon Slayer Infinity Castle?",
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
          className="text-purple-300 font-semibold text-base mt-3 mb-1"
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
          className="text-purple-400 font-bold text-lg mt-4 mb-2"
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
          className="text-purple-400 font-extrabold text-xl mt-4 mb-2"
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
          className="ml-5 list-disc text-zinc-300 text-sm sm:text-base my-1"
        >
          {renderedParts}
        </li>,
      );
    } else {
      elements.push(
        <p
          key={`p-${lineIdx}`}
          className="text-zinc-300 text-sm sm:text-base leading-relaxed my-1.5"
        >
          {renderedParts}
        </p>,
      );
    }
  });

  return elements;
}

export default function AiAssistantPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Konnichiwa! I am **Senpai AI** ⚡\n\nI can answer questions regarding anime releases, character lore, trending news, rankings, and trailers using the Senpai Central news archive.\n\nPick a topic below or type your question!",
      sources: [],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
        throw new Error(`Server responded with ${res.status}`);
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
      console.error("Error with Senpai AI:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Gomen ne! An error occurred while communicating with the anime knowledge base. Please try asking again.",
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
        text: "Conversation cleared! What would you like to ask next?",
        sources: [],
      },
    ]);
  };

  return (
    <div className="relative bg-black min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <Particles
        className={"particles-fixed"}
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={1000}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={50}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <NavBar />

      <main className="w-full max-w-4xl px-4 py-6 flex-1 flex flex-col items-center z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-medium mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RAG-Powered Anime Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 tracking-tight">
            Senpai AI Assistant
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Ask any questions about anime, characters, upcoming releases, and
            rankings grounded in Senpai Central’s news archive.
          </p>
        </div>

        <div className="w-full flex-1 flex flex-col bg-zinc-950/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.15)] overflow-hidden min-h-[550px] max-h-[75vh]">
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/80 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                ⚡
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">
                  Senpai AI Assistant
                </h2>
                <p className="text-xs text-zinc-400">
                  Gemini 1.5 Flash • Neon Database
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-zinc-700/50"
              title="Clear Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Clear</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3.5 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
                      : "bg-zinc-900/90 text-zinc-100 border border-purple-500/20 rounded-tl-xs shadow-lg"
                  }`}
                >
                  {formatMarkdown(msg.text)}
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 w-full max-w-[95%] sm:max-w-[85%] bg-purple-950/20 border border-purple-500/20 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-xs sm:text-sm mb-2.5">
                      <span>📰</span>
                      <span>
                        Referenced Articles from Senpai Central Archive
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.sources.map((source, sIdx) => (
                        <Link
                          key={sIdx}
                          href={`/article?url=${encodeURIComponent(source.url)}&title=${encodeURIComponent(source.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/80 hover:bg-purple-900/40 border border-zinc-800 hover:border-purple-500/40 transition-colors group"
                        >
                          {source.image && (
                            <img
                              src={source.image}
                              alt=""
                              className="w-12 h-12 object-cover rounded-md shrink-0 bg-zinc-800"
                            />
                          )}
                          <div className="overflow-hidden flex-1">
                            <p className="text-zinc-200 group-hover:text-purple-300 font-medium truncate text-xs">
                              {source.title}
                            </p>
                            <span className="text-[11px] text-purple-400 group-hover:underline">
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
              <div className="flex items-center gap-2.5 text-sm text-purple-300 bg-zinc-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 max-w-sm">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                </span>
                <span className="animate-pulse">
                  Senpai AI is searching news & analyzing with Gemini...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isLoading && (
            <div className="px-5 pb-3">
              <p className="text-xs text-zinc-400 font-medium mb-2">
                Popular Questions to Ask:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-xs bg-zinc-900/90 hover:bg-purple-900/40 text-zinc-300 hover:text-purple-200 border border-zinc-800 hover:border-purple-500/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-zinc-950 border-t border-purple-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3 bg-zinc-900/90 border border-purple-500/30 focus-within:border-purple-500 rounded-xl px-4 py-2 transition-colors"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about an anime, character, release date, or ranking..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 text-white p-2 rounded-lg transition-colors cursor-pointer"
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
