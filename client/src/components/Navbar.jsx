import React from "react";

export const Navbar = ({ roomCode, connected, onLaunchClick, onLeaveRoom }) => {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* BRAND */}
        <a href="#top" className="brand flex-shrink-0" aria-label="Room Drop home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 30 30" fill="none">
              <path
                d="M8 24V7.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V24M5 24h20M12 24V10l7-2v16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16.5 16v2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
          <span className="whitespace-nowrap font-extrabold text-stone-900 tracking-tight">
            Room Drop
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* HEADER ACTION */}
        <div className="header-action flex items-center gap-3 flex-shrink-0">
          {roomCode ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200 whitespace-nowrap">
                <span
                  className={`w-2 h-2 rounded-full ${
                    connected ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                  }`}
                />
                ROOM {roomCode}
              </span>
              <button
                type="button"
                onClick={onLeaveRoom}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition cursor-pointer whitespace-nowrap"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLaunchClick}
              className="rd-button rd-button-ink h-9 px-4 py-2 whitespace-nowrap"
            >
              <span>Launch App</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
