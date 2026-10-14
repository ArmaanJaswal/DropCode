import React, { useState, useRef } from "react";
import { QRModal } from "./QRModal";

export const DashboardPage = ({
  peerId,
  roomCode,
  connected,
  status,
  isHost,
  onLeaveRoom,
  shareLink,
  qr,
  // File transfer
  file,
  setFile,
  handleFileSelect,
  sendFile,
  sending,
  sendProgress,
  receiving,
  receivedFileName,
  receiveProgress,
  receivedFile,
  downloadFile,
  clearReceivedFile,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleCopyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col justify-between">
      {/* DASHBOARD NAVBAR - NO COLLAPSING */}
      <header className="site-header">
        <div className="site-header-inner">
          <button
            type="button"
            onClick={onLeaveRoom}
            className="brand flex-shrink-0 bg-transparent border-0 cursor-pointer p-0"
          >
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
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <span
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                connected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span className="hidden sm:inline">ROOM {roomCode} · </span>
              {connected ? "Connected" : "Waiting"}
            </span>

            <button
              type="button"
              onClick={onLeaveRoom}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-xl hover:bg-stone-100 transition cursor-pointer whitespace-nowrap"
            >
              Leave Room
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD MAIN CONTENT */}
      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-xl mx-auto px-6">
          {/* MAIN CARD */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-7 sm:p-9 space-y-6">
            {/* ROOM HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">
                  ACTIVE ROOM
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-wider font-mono">
                  {roomCode || "Connecting..."}
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  connected
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    connected ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                  }`}
                />
                {connected ? "Connected" : "Waiting for peer"}
              </span>
            </div>

            {/* ACTION BUTTONS: ONLY THE HOST SEES SHOW QR AND SEND LINK */}
            {isHost ? (
              <div className="grid grid-cols-2 gap-3">
                {/* BUTTON 1: SHOW QR CODE */}
                <button
                  type="button"
                  onClick={() => setShowQR(true)}
                  className="bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold py-3 px-4 rounded-xl border border-stone-200 flex items-center justify-center gap-2 transition cursor-pointer shadow-sm whitespace-nowrap"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-stone-700"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Show QR Code</span>
                </button>

                {/* BUTTON 2: SEND LINK */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`text-xs font-semibold py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer shadow-sm whitespace-nowrap ${
                    copied
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "bg-[#fff5ee] hover:bg-[#ffede2] text-[#ff5a00] border-[#ffd8c4]"
                  }`}
                >
                  {copied ? (
                    <>
                      <span>✓</span>
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-[#ff5a00]"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <span>Send Link</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-[#fbfaf8] border border-stone-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                <span className="text-stone-500">Connected as guest to room</span>
                <span className="font-mono font-bold text-stone-800">
                  #{roomCode}
                </span>
              </div>
            )}

            {/* DROPZONE AREA */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#ff5a00] bg-[#fff5ee]"
                  : "border-stone-200 bg-[#fbfaf8] hover:border-stone-300 hover:bg-[#f8f6f3]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-full bg-[#fff2ea] text-[#ff5a00] mx-auto flex items-center justify-center text-xl mb-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
              </div>

              <p className="text-sm font-semibold text-stone-800">
                Drop files here or{" "}
                <span className="text-[#ff5a00] underline font-bold">browse</span>
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Direct WebRTC peer-to-peer transfer
              </p>

              {/* SELECTED FILE PREVIEW */}
              {file && (
                <div className="mt-4 bg-white border border-stone-200/90 rounded-xl p-3 text-left flex items-center justify-between">
                  <div className="truncate max-w-[240px]">
                    <p className="text-xs font-semibold text-stone-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-stone-500">
                    Selected
                  </span>
                </div>
              )}
            </div>

            {/* SEND BUTTON */}
            {file && (
              <button
                type="button"
                onClick={sendFile}
                disabled={!connected || sending}
                className="w-full bg-[#ff5a00] hover:bg-[#ea5100] text-white font-semibold py-3.5 rounded-xl transition shadow-md shadow-[#ff5a00]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {sending
                  ? `Sending ${sendProgress}%`
                  : connected
                  ? "Send File Now"
                  : "Waiting for other device to join..."}
              </button>
            )}

            {/* SEND PROGRESS */}
            {sending && (
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#ff5a00] h-full transition-all duration-150"
                  style={{ width: `${sendProgress}%` }}
                />
              </div>
            )}

            {/* INCOMING RECEIVE PROGRESS (DURING TRANSFER) */}
            {receiving && (
              <div className="bg-[#fffbf8] border border-stone-200 rounded-2xl p-4 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 truncate max-w-[220px]">
                    Receiving: {receivedFileName}
                  </span>
                  <span className="font-bold text-[#ff5a00]">
                    {receiveProgress}%
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#ff5a00] h-full transition-all duration-150"
                    style={{ width: `${receiveProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* COMPLETED RECEIVED FILE: MANUAL DOWNLOAD BUTTON (DOES NOT AUTO-DOWNLOAD) */}
            {receivedFile && (
              <div className="bg-[#f0fdf4] border border-emerald-300 rounded-2xl p-5 text-left shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg flex-shrink-0">
                      📄
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        File Ready
                      </p>
                      <p className="text-sm font-bold text-stone-900 truncate">
                        {receivedFile.name}
                      </p>
                      {receivedFile.size && (
                        <p className="text-[11px] text-stone-500">
                          {(receivedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      )}
                    </div>
                  </div>

                  {/* DOWNLOAD SIGN & BUTTON */}
                  <button
                    type="button"
                    onClick={downloadFile}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer flex-shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download File</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-700">
                  <span>✓ Transfer complete. Click to save to your device.</span>
                  <button
                    type="button"
                    onClick={clearReceivedFile}
                    className="text-stone-400 hover:text-stone-600 cursor-pointer ml-2"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* CARD BOTTOM: STATUS & DISCONNECT */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <button
                type="button"
                onClick={onLeaveRoom}
                className="text-stone-400 hover:text-stone-800 transition cursor-pointer"
              >
                Disconnect & Leave Room
              </button>
              <span className="font-mono">P2P Encrypted</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-stone-200/60 text-center text-xs text-stone-400">
        Direct browser-to-browser transfer • Files never touch a server
      </footer>

      {/* QR MODAL (ONLY AVAILABLE FOR HOST) */}
      {isHost && (
        <QRModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          roomCode={roomCode}
          qr={qr}
          shareLink={shareLink}
        />
      )}
    </div>
  );
};
