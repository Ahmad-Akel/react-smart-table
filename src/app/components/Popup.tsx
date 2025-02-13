"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";

interface PopupProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute z-10 mt-2 bg-white border rounded shadow-lg text-black w-64 p-4 break-words"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popup;
