import React, { useState } from "react";

export const QRModal = ({ isOpen, onClose, roomCode, qr, shareLink }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
      {/* MODAL CARD (MATCHING IMAGE 3) */}
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-6">
        {/* CLOSE BUTTON (ORANGE CIRCULAR X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-stone-300 text-stone-500 hover:text-[#ff5a00] hover:border-[#ff5a00] flex items-center justify-center text-sm font-bold transition cursor-pointer"
        >
          ✕
        </button>

        {/* DOOR ICON */}
        <div className="w-12 h-12 rounded-2xl bg-[#fff2ea] border border-[#ffd8c4] flex items-center justify-center text-[#ff5a00]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
            <path d="M9 21V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14" />
            <circle cx="12.5" cy="14" r="0.8" fill="currentColor" />
          </svg>
        </div>

        {/* TITLE & SUBTITLE */}
        <div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            A little room of your own.
          </h3>
          <p className="text-sm text-stone-500 mt-1 font-normal">
            Take a peek at your Room Drop space.
          </p>
        </div>

        {/* STATUS BANNER */}
        <div className="bg-[#fff4ed] border border-[#ffe0cc] rounded-2xl p-4 text-xs font-medium text-[#c44300] leading-relaxed">
          Open your smartphone's camera app and point it at the QR code to join
          instantly without downloading any app.
        </div>

        {/* INNER PREVIEW CARD (MATCHING IMAGE 3) */}
        <div className="bg-[#faf8f5] border border-stone-200/90 rounded-2xl p-6 text-center space-y-4">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
            ROOM CODE
          </p>

          <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono tracking-widest">
            {roomCode}
          </p>

          {/* QR CODE */}
          {qr ? (
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
                <img
                  src={qr}
                  alt="Room QR Code"
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto flex items-center justify-center bg-stone-100 rounded-2xl text-stone-400 text-xs">
              Generating QR Code...
            </div>
          )}

          <p className="text-xs text-stone-400">
            Scan with phone camera • No app needed
          </p>
        </div>

        {/* MODAL ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-[#ff5a00] hover:bg-[#ea5100] text-white shadow-sm"
            }`}
          >
            {copied ? "✓ Link Copied!" : "Send Link"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
