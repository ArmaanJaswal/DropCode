import React, { useMemo } from "react";
import { useFileTransfer } from "./hooks/useFileTransfer";
import { usePeer } from "./hooks/usePeer";
import {
  Header,
  PeerIdCard,
  CreateRoomCard,
  JoinRoomCard,
  ConnectionStatus,
  FileTransferCard,
} from "./components";

const App = () => {
  const {
    file,
    sending,
    sendProgress,
    receivedFileName,
    receiving,
    receiveProgress,
    handleFileSelect,
    sendFile,
    handleIncomingData,
  } = useFileTransfer();

  const {
    peerId,
    roomCode,
    joinCode,
    setJoinCode,
    connected,
    status,
    connectionRef,
    createRoom,
    joinRoom,
    leaveRoom,
    qr,
    shareLink,
  } = usePeer(handleIncomingData);

  // Check if current user is actively auto-joining from a shared link or QR code
  const targetRoomFromUrl = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("room");
  }, []);

  const isAutoJoining = !connected && Boolean(targetRoomFromUrl) && status.toLowerCase().includes("joining");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <Header />

        {/* ======================================================== */}
        {/* CONNECTED DASHBOARD MODE                                */}
        {/* ======================================================== */}
        {connected ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* DASHBOARD TOP BAR */}
            <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    Room Dashboard
                    {roomCode && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-mono">
                        #{roomCode}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-400">Direct WebRTC P2P Data Connection active</p>
                </div>
              </div>

              <button
                type="button"
                onClick={leaveRoom}
                className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-2 rounded-xl font-medium transition cursor-pointer"
              >
                Disconnect & Leave Room
              </button>
            </div>

            {/* DASHBOARD PEER ID INFO */}
            <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="font-mono">
                My Peer ID: <span className="text-slate-200">{peerId || "Ready"}</span>
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                P2P Encrypted
              </span>
            </div>

            {/* FILE TRANSFER WORKSPACE */}
            <FileTransferCard
              file={file}
              handleFileSelect={handleFileSelect}
              sendFile={() => sendFile(connectionRef)}
              connected={connected}
              sending={sending}
              sendProgress={sendProgress}
              receiving={receiving}
              receivedFileName={receivedFileName}
              receiveProgress={receiveProgress}
            />
          </div>
        ) : isAutoJoining ? (
          /* ======================================================== */
          /* AUTO-CONNECTING SCREEN (FROM LINK / QR SCAN)            */
          /* ======================================================== */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
              <span className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            </div>

            <h2 className="text-2xl font-bold">Connecting to Room</h2>
            <p className="text-blue-400 font-mono text-xl tracking-widest mt-1">
              #{targetRoomFromUrl}
            </p>

            <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto">
              Please wait while the WebRTC peer-to-peer handshake completes. You will be redirected to the transfer dashboard in a moment.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={leaveRoom}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Cancel & Return to Lobby
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* LOBBY MODE                                              */
          /* ======================================================== */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* PEER ID */}
            <PeerIdCard peerId={peerId} />

            {/* CREATE ROOM (WITH LINK & QR CODE) */}
            <CreateRoomCard
              peerId={peerId}
              roomCode={roomCode}
              onCreateRoom={createRoom}
              qr={qr}
              shareLink={shareLink}
            />

            {/* JOIN ROOM */}
            {!roomCode && (
              <JoinRoomCard
                joinCode={joinCode}
                setJoinCode={setJoinCode}
                onJoinRoom={() => joinRoom()}
                peerId={peerId}
              />
            )}

            {/* CONNECTION STATUS */}
            <ConnectionStatus status={status} connected={connected} />

            {roomCode && !connected && (
              <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
                <button
                  type="button"
                  onClick={leaveRoom}
                  className="text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  Cancel this room and create another
                </button>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Files are transferred directly between peers using WebRTC.
        </p>
      </div>
    </div>
  );
};

export default App;
 