import React, { useState, useRef } from "react";

export const RoomWorkspace = ({
  peerId,
  roomCode,
  joinCode,
  setJoinCode,
  connected,
  status,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onShowQR,
  shareLink,
  // File Transfer props
  file,
  setFile,
  handleFileSelect,
  sendFile,
  sending,
  sendProgress,
  receiving,
  receivedFileName,
  receiveProgress,
}) => {
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
    <section id="workspace" className="py-16 md:py-24 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Share files, room to room.
          </h2>
          <p className="text-stone-500 mt-2 text-base font-normal">
            Create a room or join one with a code.
          </p>
        </div>

        {/* TWO CARDS GRID (MATCHING IMAGE 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* ======================================================== */}
          {/* CARD 1: CREATE ROOM / ROOM DASHBOARD                     */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between transition-all min-h-[440px]">
            <div>
              {/* TOP CARD HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#fff2ea] text-[#ff5a00] flex items-center justify-center font-bold text-lg">
                  +
                </div>
                <h3 className="text-xl font-bold text-stone-900">Create Room</h3>
              </div>

              {!roomCode ? (
                /* STATE A: NO ROOM CREATED YET */
                <div className="space-y-6 pt-4">
                  <p className="text-stone-500 text-sm leading-relaxed">
                    One click generates your private, direct P2P space. You'll get a
                    code, a shareable link, and a QR code for your other device.
                  </p>

                  <div className="bg-[#fcfaf7] border border-stone-200/80 rounded-2xl p-6 text-center">
                    <span className="text-3xl mb-2 block">🚪</span>
                    <p className="text-xs font-semibold text-stone-800">
                      Your own private room
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      No registration. Instant WebRTC connection.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onCreateRoom}
                    disabled={!peerId}
                    className="w-full bg-[#ff5a00] hover:bg-[#ea5100] text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-md shadow-[#ff5a00]/20 hover:shadow-lg hover:shadow-[#ff5a00]/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {peerId ? "Create a Room →" : "Initializing Peer..."}
                  </button>
                </div>
              ) : (
                /* STATE B: ROOM CREATED - DISPLAY AT MAIN DASHBOARD (MATCHING USER REQUIREMENT) */
                <div className="space-y-5">
                  {/* ROOM CODE & STATUS BAR */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        Active Room
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-wider font-mono">
                        {roomCode}
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

                  {/* TWO BUTTONS: SHOW QR CODE & SEND LINK (USER REQUIREMENT) */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* BUTTON 1: SHOW QR CODE */}
                    <button
                      type="button"
                      onClick={onShowQR}
                      className="bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold py-2.5 px-3 rounded-xl border border-stone-200/90 flex items-center justify-center gap-2 transition cursor-pointer"
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

                    {/* BUTTON 2: SEND LINK (COPIES LINK) */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`text-xs font-semibold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer ${
                        copied
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
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

                  {/* DROPZONE AREA (MATCHING IMAGE 4) */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
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

                    <div className="w-10 h-10 rounded-full bg-[#fff2ea] text-[#ff5a00] mx-auto flex items-center justify-center text-lg mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m16 16-4-4-4 4" />
                      </svg>
                    </div>

                    <p className="text-xs font-semibold text-stone-800">
                      Drop files here or{" "}
                      <span className="text-[#ff5a00] underline font-bold">
                        browse
                      </span>
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1">
                      Direct P2P • Any file type & size
                    </p>

                    {/* SELECTED FILE PREVIEW */}
                    {file && (
                      <div className="mt-3 bg-white border border-stone-200/80 rounded-xl p-2.5 text-left flex items-center justify-between">
                        <div className="truncate max-w-[200px]">
                          <p className="text-xs font-semibold text-stone-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-stone-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <span className="text-xs text-stone-400">Ready</span>
                      </div>
                    )}
                  </div>

                  {/* SEND BUTTON & PROGRESS */}
                  {file && (
                    <button
                      type="button"
                      onClick={sendFile}
                      disabled={!connected || sending}
                      className="w-full bg-[#ff5a00] hover:bg-[#ea5100] text-white font-semibold py-3 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                    >
                      {sending
                        ? `Sending ${sendProgress}%`
                        : connected
                        ? "Send File Now"
                        : "Waiting for other device to join..."}
                    </button>
                  )}

                  {sending && (
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#ff5a00] h-full transition-all duration-150"
                        style={{ width: `${sendProgress}%` }}
                      />
                    </div>
                  )}

                  {/* INCOMING RECEIVE PROGRESS */}
                  {receiving && (
                    <div className="bg-[#f0fdf4] border border-emerald-200 rounded-xl p-3 text-left">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-emerald-800 truncate max-w-[180px]">
                          Receiving: {receivedFileName}
                        </span>
                        <span className="font-bold text-emerald-600">
                          {receiveProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-emerald-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full transition-all"
                          style={{ width: `${receiveProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CARD BOTTOM: DISCONNECT */}
            {roomCode && (
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onLeaveRoom}
                  className="text-xs font-medium text-stone-400 hover:text-stone-700 transition cursor-pointer"
                >
                  Disconnect
                </button>
                <span className="text-[10px] text-stone-400 font-mono">
                  WebRTC Direct
                </span>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* CARD 2: JOIN ROOM (MATCHING IMAGE 4)                     */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-7 sm:p-8 flex flex-col justify-between transition-all min-h-[440px]">
            <div>
              {/* TOP CARD HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#fff2ea] text-[#ff5a00] flex items-center justify-center font-bold text-lg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-stone-900">Join Room</h3>
              </div>

              <div className="space-y-6 pt-2">
                <p className="text-stone-500 text-sm leading-relaxed">
                  Have a code? Join an existing room.
                </p>

                {/* JOIN INPUT */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Enter 6-digit Room Code
                  </label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.trim())}
                    placeholder="e.g. 310948"
                    maxLength={10}
                    className="w-full bg-[#fbfaf8] border border-stone-200 rounded-2xl px-4 py-3.5 text-stone-900 font-mono font-bold tracking-wider placeholder:font-sans placeholder:font-normal placeholder:text-stone-400 outline-none focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/10 transition"
                  />
                </div>

                <div className="bg-[#fcfaf7] border border-stone-200/80 rounded-2xl p-5 text-center">
                  <span className="text-2xl mb-1 block">📱</span>
                  <p className="text-xs font-semibold text-stone-800">
                    Or scan host's QR Code
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Point your smartphone camera at the QR code to auto-connect
                    without typing.
                  </p>
                </div>

                {/* STATUS MESSAGE */}
                {status && (
                  <p className="text-xs text-stone-500 text-center font-medium">
                    {status}
                  </p>
                )}
              </div>
            </div>

            {/* JOIN BUTTON */}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => onJoinRoom()}
                disabled={!joinCode || !peerId}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:bg-stone-50 disabled:text-stone-300 font-semibold py-3.5 px-6 rounded-2xl transition cursor-pointer disabled:cursor-not-allowed shadow-none"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
