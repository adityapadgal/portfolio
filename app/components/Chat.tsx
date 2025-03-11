"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress, Box, Avatar, Flex, Button } from "@radix-ui/themes";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ query: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when chat expands
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Close chatbox when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const sendMessage = async () => {
    if (!query) return;
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setMessages([...messages, { query, answer: data.answer }]);
    setQuery("");
    setLoading(false);
  };

  return (
    <>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-black/10 backdrop-blur-md transition-opacity z-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <Flex direction="column" align="center" className="w-10/12 max-w-md mx-auto relative">
        <motion.div
          ref={chatRef}
          className="w-full relative z-10"
          animate={{ height: isExpanded ? "400px" : "auto" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {isExpanded && (
            <Box className="relative bg-white rounded-lg shadow-inner mt-3 h-98">
              {/* Fixed Header */}
              <Box className="bg-blue-500 text-white w-full h-10 p-2 shadow-md absolute rounded-tr-lg rounded-tl-lg top-0 left-0 right-0 z-10 flex items-center justify-center">
                ChatMe
              </Box>

              {/* Scrollable Chat Content */}
              <Box className="overflow-y-auto h-full pt-14 p-4 space-y-4">
                {/* Default AI Greeting */}
                <Flex align="start" gap="3">
                  <Avatar fallback="Ai" className="w-9 h-9 bg-black text-white" />
                  <Box className="bg-gray-100 dark:bg-gray-300 p-3 rounded-lg max-w-xs text-start">
                    <p className="text-sm dark:text-black">Hello! How can I help you today?</p>
                  </Box>
                </Flex>

                {/* Chat Messages */}
                {messages.map((msg, i) => (
                  <Box key={i} className="space-y-2">
                    {/* User Message */}
                    <Flex align="end" justify="end" gap="3">
                      <Box className="bg-blue-500 text-white p-3 rounded-lg max-w-xs text-start">{msg.query}</Box>
                      <Avatar fallback="U" className="w-9 h-9 bg-blue-500 text-white" />
                    </Flex>

                    {/* AI Response */}
                    <Flex align="start" gap="3">
                      <Avatar fallback="Ai" className="w-9 h-9 bg-black text-white" />
                      <Box className="bg-gray-100 dark:bg-gray-300 p-3 rounded-lg max-w-xs text-start">
                        <p className="text-sm text-gray-800 dark:text-black">{msg.answer}</p>
                      </Box>
                    </Flex>
                  </Box>
                ))}

                {/* Loading Progress Bar */}
                {loading && (
                  <Box maxWidth="width-full" className="mx-auto mt-3">
                    <Progress />
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* Input Box (Always Visible) */}
          <Flex align="center" className="relative w-full mt-4">
            <input
              ref={inputRef}
              className={`flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-1 focus:ring-white 
              bg-transparent w-full ${isExpanded ? "border-gray-300 dark:border-gray-600" : "border border-gray-400"} pr-14`}
              placeholder="Chat with AI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => setIsExpanded(true)}
            />
            <button
              onClick={sendMessage}
              className="absolute right-3 text-white px-4 py-1.5 rounded-full hover:bg-gray-100 hover:text-black transition duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Flex>
        </motion.div>
      </Flex>
    </>
  );
}
