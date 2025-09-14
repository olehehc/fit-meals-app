"use client";

export default function Spinner({ size = 8, className = "", label = "" }) {
  const dotSize = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span className="sr-only">{label}</span>

      <div
        aria-hidden="true"
        className="inline-flex items-center gap-2 spinner-dots"
      >
        <span className="spinner-dot" />
        <span className="spinner-dot" />
        <span className="spinner-dot" />
      </div>

      <span aria-hidden="true" className="select-none">
        {label}
      </span>

      <style>{`
        @keyframes dotPulse {
          0%   { opacity: 0.25; transform: translateY(0); }
          30%  { opacity: 1;    transform: translateY(-4px); }
          60%  { opacity: 0.35; transform: translateY(0); }
          100% { opacity: 0.25; transform: translateY(0); }
        }
        .spinner-dots { display: inline-flex; align-items: center; gap: 0.5rem; }
        .spinner-dot {
          width: ${dotSize};
          height: ${dotSize};
          border-radius: 9999px;
          background-color: currentColor;
          opacity: 0.25;
          display: inline-block;
        }
        .spinner-dots .spinner-dot:nth-child(1) { animation: dotPulse 1s infinite ease-in-out; animation-delay: 0s; }
        .spinner-dots .spinner-dot:nth-child(2) { animation: dotPulse 1s infinite ease-in-out; animation-delay: 0.15s; }
        .spinner-dots .spinner-dot:nth-child(3) { animation: dotPulse 1s infinite ease-in-out; animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
