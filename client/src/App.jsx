import React, { useState, useEffect } from "react";
import { useFileTransfer } from "./hooks/useFileTransfer";
import { usePeer } from "./hooks/usePeer";
import { LandingPage, DashboardPage } from "./components";

const App = () => {
  // Determine initial view: if ?room= exists in URL, go straight to dashboard
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("room") ? "dashboard" : "landing";
    }
    return "landing";
  });

  const {
    file,
    setFile,
    sending,
    sendProgress,
    receivedFileName,
    receiving,
    receiveProgress,
    receivedFile,
    downloadFile,
    clearReceivedFile,
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
    isHost,
  } = usePeer(handleIncomingData);

  // If a room is created or connected, switch to dashboard
  useEffect(() => {
    if (roomCode || connected) {
      setCurrentPage("dashboard");
    }
  }, [roomCode, connected]);

  const handleCreateRoom = () => {
    createRoom();
    setCurrentPage("dashboard");
  };

  const handleJoinRoom = (code) => {
    setJoinCode(code);
    joinRoom(code);
    setCurrentPage("dashboard");
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setCurrentPage("landing");
  };

  return (
    <>
      {currentPage === "dashboard" ? (
        <DashboardPage
          peerId={peerId}
          roomCode={roomCode || joinCode}
          connected={connected}
          status={status}
          isHost={isHost}
          onLeaveRoom={handleLeaveRoom}
          shareLink={shareLink}
          qr={qr}
          file={file}
          setFile={setFile}
          handleFileSelect={handleFileSelect}
          sendFile={() => sendFile(connectionRef)}
          sending={sending}
          sendProgress={sendProgress}
          receiving={receiving}
          receivedFileName={receivedFileName}
          receiveProgress={receiveProgress}
          receivedFile={receivedFile}
          downloadFile={downloadFile}
          clearReceivedFile={clearReceivedFile}
        />
      ) : (
        <LandingPage
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          peerId={peerId}
        />
      )}
    </>
  );
};

export default App;