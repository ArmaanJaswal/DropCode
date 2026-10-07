import React from "react";
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
  } = usePeer(handleIncomingData);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <Header />

        {/* MAIN CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* PEER ID */}
          <PeerIdCard peerId={peerId} />

          {/* CREATE ROOM */}
          <CreateRoomCard
            peerId={peerId}
            roomCode={roomCode}
            onCreateRoom={createRoom}
          />

          {/* JOIN ROOM */}
          <JoinRoomCard
            joinCode={joinCode}
            setJoinCode={setJoinCode}
            onJoinRoom={joinRoom}
            peerId={peerId}
          />

          {/* CONNECTION */}
          <ConnectionStatus status={status} connected={connected} />

          {/* FILE TRANSFER */}
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

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Files are transferred directly between peers using WebRTC.
        </p>
      </div>
    </div>
  );
};

export default App;