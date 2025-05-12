"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const scrollDistance = 75;

const VimNavigation = () => {
  const keyBufferRef = useRef<string>("");
  const [displayBuffer, setDisplayBuffer] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA");

      if (e.metaKey || isInputFocused) {
        return;
      }

      if (e.key == "Escape") {
        keyBufferRef.current = "";
        setDisplayBuffer("");
      }

      // Scroll to bottom with Shift+G
      if (e.shiftKey && key === "G") {
        keyBufferRef.current = "";
        setDisplayBuffer("");
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }

      // Handle 'gg' to scroll to top
      if (key === "g") {
        if (keyBufferRef.current === "g") {
          keyBufferRef.current = "";
          setDisplayBuffer("");
          window.scrollTo({ top: 0 });
        } else {
          keyBufferRef.current = "g";
          setDisplayBuffer("g");
        }
        return;
      }

      // If key is a number, add it to the buffer
      if (/^[0-9]$/.test(key)) {
        if (keyBufferRef.current === "g") {
          keyBufferRef.current = key;
        } else {
          keyBufferRef.current += key;
        }
        setDisplayBuffer(keyBufferRef.current);
        return;
      }

      // Determine count from buffer or default to 1
      const count = parseInt(keyBufferRef.current) || 1;

      switch (key) {
        case "j":
          window.scrollBy({ top: scrollDistance * count });
          break;
        case "k":
          window.scrollBy({ top: -scrollDistance * count });
          break;
        case "h":
          window.scrollBy({ left: -scrollDistance * count });
          break;
        case "l":
          window.scrollBy({ left: scrollDistance * count });
          break;
        default:
          return;
      }

      keyBufferRef.current = "";
      setDisplayBuffer("");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0">
      <div className="container mx-auto px-6 h-full flex items-center font-mono">
        <div
          data-keybuf={displayBuffer}
          className={cn(
            "ml-auto bg-background shadow border hidden origin-bottom-right rounded-md px-2 py-1 font-mono text-xs",
            displayBuffer.length > 0 && "animate-in zoom-in-80 block",
          )}
        >
          {displayBuffer}
        </div>
      </div>
    </div>
  );
};

export { VimNavigation };
