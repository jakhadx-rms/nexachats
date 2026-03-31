import { useState, useCallback, useEffect, useRef } from "react";
import { Chat, Message, chats as initialChats, chatMessages, autoReplies } from "@/data/sampleData";

const STORAGE_KEY = "nexachat-store";

interface StoredState {
  conversations: Record<string, Message[]>;
  chatsMeta: Chat[];
}

function loadFromStorage(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveToStorage(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatTimestamp() {
  const now = new Date();
  const diff = 0;
  if (diff < 60) return "Just now";
  return formatTime(now);
}

export function useChatStore() {
  const stored = useRef(loadFromStorage());

  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    () => stored.current?.conversations ?? { ...chatMessages }
  );

  const [chatsMeta, setChatsMeta] = useState<Chat[]>(
    () => stored.current?.chatsMeta ?? initialChats.map(c => ({ ...c }))
  );

  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [typingChatId, setTypingChatId] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    saveToStorage({ conversations, chatsMeta });
  }, [conversations, chatsMeta]);

  const sendMessage = useCallback((chatId: string, text: string) => {
    const now = new Date();
    const newMsg: Message = {
      id: `${chatId}-${Date.now()}`,
      text,
      sender: "me",
      timestamp: formatTime(now),
    };

    setConversations(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));

    // Update chat meta
    setChatsMeta(prev =>
      prev.map(c =>
        c.id === chatId
          ? { ...c, lastMessage: text, timestamp: "Just now" }
          : c
      )
    );

    // Simulate auto-reply
    const replies = autoReplies[chatId];
    if (replies && replies.length > 0) {
      const chat = chatsMeta.find(c => c.id === chatId);
      const senderName = chat?.name.split(" ")[0] || "User";

      setTypingChatId(chatId);

      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        setTypingChatId(null);
        const replyText = replies[Math.floor(Math.random() * replies.length)];
        const replyMsg: Message = {
          id: `${chatId}-reply-${Date.now()}`,
          text: replyText,
          sender: "other",
          senderName,
          timestamp: formatTime(new Date()),
        };

        setConversations(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), replyMsg],
        }));

        setChatsMeta(prev =>
          prev.map(c =>
            c.id === chatId
              ? {
                  ...c,
                  lastMessage: replyText,
                  timestamp: "Just now",
                  unread: c.id !== activeChatId ? c.unread + 1 : c.unread,
                }
              : c
          )
        );
      }, delay);
    }
  }, [chatsMeta, activeChatId]);

  const selectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    // Clear unread for selected chat
    setChatsMeta(prev =>
      prev.map(c => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
  }, []);

  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConversations({ ...chatMessages });
    setChatsMeta(initialChats.map(c => ({ ...c })));
  }, []);

  const activeMessages = activeChatId ? conversations[activeChatId] || [] : [];
  const activeChat = chatsMeta.find(c => c.id === activeChatId) || null;
  const isTyping = typingChatId === activeChatId;

  return {
    chatsMeta,
    activeChatId,
    activeChat,
    activeMessages,
    isTyping,
    typingChatId,
    selectChat,
    sendMessage,
    clearStorage,
  };
}
