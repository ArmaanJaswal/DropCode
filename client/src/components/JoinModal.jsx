import React, { useState } from "react";

export const JoinModal = ({ isOpen, onClose, onJoinRoom, peerId }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    onJoinRoom(code.trim());
    setCode("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-6">
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-stone-200 text-stone-400 hover:text-stone-700 hover:border-stone-400 flex items-center justify-center text-sm font-bold transition cursor-pointer"
        >
          ✕
        </button>

        {/* ICON */}
        <div className="w-12 h-12 rounded-2xl bg-[#fff2ea] border border-[#ffd8c4] flex items-center justify-center text-[#ff5a00]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-door-open"
          >
            <path d="M11 20H2"></path>
            <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"></path>
            <path d="M11 4H8a2 2 0 0 0-2 2v14"></path>
            <path d="M14 12h.01"></path>
            <path d="M22 20h-3"></path>
          </svg>
        </div>

        {/* TITLE */}
        <div>
          <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Join a Room
          </h3>
          <p className="text-sm text-stone-500 mt-1 font-normal">
            Enter the 6-digit room code to connect to the other device.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              Room Code
            </label>
            <input
              type="text"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              placeholder="e.g. 310948"
              maxLength={10}
              className="w-full bg-[#fbfaf8] border border-stone-200 rounded-2xl px-4 py-3.5 text-stone-900 font-mono font-bold tracking-wider placeholder:font-sans placeholder:font-normal placeholder:text-stone-400 outline-none focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/10 transition text-lg text-center"
            />
          </div>

          <div className="bg-[#fcfaf7] border border-stone-200/80 rounded-2xl p-4 text-center">
            <p className="text-xs text-stone-500">
              📱 Alternatively, scan the host's QR code using your phone camera.
            </p>
          </div>

          <button
            type="submit"
            disabled={!code.trim() || !peerId}
            className="w-full bg-[#ff5a00] hover:bg-[#ea5100] text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-md shadow-[#ff5a00]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {peerId ? "Join Room Now →" : "Initializing Peer..."}
          </button>
        </form>
      </div>
    </div>
  );
};
