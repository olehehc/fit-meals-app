"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function Modal({ children, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      {children}
    </div>,
    document.body
  );
}
