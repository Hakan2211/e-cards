"use client";

import { useState, useEffect } from "react";

interface MessageEditorProps {
  recipientName: string;
  senderName: string;
  messageText: string;
  onUpdate: (data: {
    recipientName?: string;
    senderName?: string;
    messageText?: string;
  }) => void;
}

export function MessageEditor({
  recipientName: initialRecipient,
  senderName: initialSender,
  messageText: initialMessage,
  onUpdate,
}: MessageEditorProps) {
  const [recipientName, setRecipientName] = useState(initialRecipient);
  const [senderName, setSenderName] = useState(initialSender);
  const [messageText, setMessageText] = useState(initialMessage);

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate({ recipientName, senderName, messageText });
    }, 500);
    return () => clearTimeout(timer);
  }, [recipientName, senderName, messageText, onUpdate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">To</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient's name"
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">From</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your name"
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Your Message
        </label>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Write your personalized message here..."
          rows={6}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {messageText.length} characters
        </p>
      </div>
    </div>
  );
}
