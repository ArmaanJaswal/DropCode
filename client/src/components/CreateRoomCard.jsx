import React, { useState } from "react";

export const CreateRoomCard = ({
  peerId,
  roomCode,
  onCreateRoom,
  qr,
  shareLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 border-b border-slate-800">
      <h2 className="text-lg font-semibold">Create Room</h2>

      <p className="text-sm text-slate-400 mt-1 mb-4">
        Create a room and share the link or QR code with another user.
      </p>

      {!roomCode ? (
        <button
          onClick={onCreateRoom}
          disabled={!peerId}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 py-3 rounded-xl font-semibold transition cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
        >
          {peerId ? "Create Room" : "Initializing Peer..."}
        </button>
      ) : (
        <div className="space-y-4">
          {/* ROOM CODE BADGE */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 text-center">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Room Code
            </p>
            <p className="text-3xl font-bold tracking-[0.3em] text-blue-400 mt-1">
              {roomCode}
            </p>
          </div>

          {/* SHAREABLE LINK */}
          {shareLink && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-2 font-medium">Shareable Invite Link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 select-all outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* QR CODE PREVIEW */}
          {qr && (
            <div className="flex flex-col items-center justify-center p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="bg-white p-3 rounded-2xl shadow-xl">
                <img
                  src={qr}
                  alt="Room QR Code"
                  className="w-44 h-44 object-contain"
                />
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Scan with any phone camera to join automatically
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 py-2.5 px-3 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Waiting for peer to scan or open link...
          </div>
        </div>
      )}
    </div>
  );
};

