// FloatingChat.tsx
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text?: string; // user hoặc lỗi
  isUser: boolean;
  timestamp: Date;
  think?: string;
  summary?: string;
  content?: string;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added OR when close/open the bubble chat
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen]);
  

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: inputValue }),
      });

      const text = await res.text(); // luôn đọc text trước
      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
      }

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Expected JSON but got ${contentType}. Response preview: ${text.slice(
            0,
            200
          )}`
        );
      }

      const data = JSON.parse(text);

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        timestamp: new Date(),
        think: data.think,
        summary: data.summary,
        content: data.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: `⚠️ Error: ${err.message}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-1/2 shadow-kms-hover z-50 flex flex-col md:w-96">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b shrink-0">
            <CardTitle className="text-lg">AI Assistant</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Chat History */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation with our AI Assistant</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col space-y-2",
                        message.isUser ? "items-end" : "items-start"
                      )}
                    >
                      {message.isUser && message.text && (
                        <div className="max-w-[260px] rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap bg-primary text-primary-foreground">
                          {message.text}
                        </div>
                      )}

                      {!message.isUser && (
                        <>
                          {message.text && (
                            <div className="max-w-[260px] rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap bg-muted text-muted-foreground">
                              {message.text}
                            </div>
                          )}
                          {message.think && (
                            <div className="max-w-[260px] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap bg-muted text-muted-foreground">
                              🤔 <b>Think:</b> {message.think}
                            </div>
                          )}
                          {message.summary && (
                            <div className="max-w-[260px] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap bg-muted text-muted-foreground">
                              📌 <b>Summary:</b> {message.summary}
                            </div>
                          )}
                          {message.content && (
                            <div className="max-w-[260px] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap bg-muted text-muted-foreground">
                              📖 <b>Content:</b> {message.content}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t shrink-0">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={loading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || loading}
                  size="sm"
                  className="px-3"
                >
                  {loading ? "..." : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Bubble */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-kms-hover z-50",
          "bg-primary hover:bg-primary/90 transition-all duration-300",
          isOpen && "rotate-180"
        )}
        size="sm"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    </>
  );
};

export { FloatingChat };
