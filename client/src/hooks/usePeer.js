import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { socket } from "../services/socket";
import QRcode from "qrcode";
import { CLIENT_BASE_URL } from "../constants";

export const usePeer = (onDataReceived) => {
  // =========================
  // STATE
  // =========================
  const [peerId, setPeerId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Waiting for connection");
  const [qr, setQr] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isHost, setIsHost] = useState(false);

  // =========================
  // REFS
  // =========================
  const peerRef = useRef(null);
  const connectionRef = useRef(null);
  const onDataReceivedRef = useRef(onDataReceived);
  const autoJoinedRef = useRef(false);

  useEffect(() => {
    onDataReceivedRef.current = onDataReceived;
  }, [onDataReceived]);

  // =========================
  // SETUP CONNECTION
  // =========================
  const setupConnection = (conn) => {
    conn.on("open", () => {
      console.log("PeerJS connection established");

      setConnected(true);
      setStatus("Connected");

      connectionRef.current = conn;
    });

    conn.on("data", (data) => {
      if (onDataReceivedRef.current) {
        onDataReceivedRef.current(data);
      }
    });

    conn.on("close", () => {
      console.log("Connection closed");

      setConnected(false);
      setStatus("Disconnected");
    });

    conn.on("error", (error) => {
      console.log("Connection error:", error);

      setStatus("Connection error");
    });
  };

  // =========================
  // CONNECT WITH PEER
  // =========================
  const connectWithPeer = (otherPeerId) => {
    if (!peerRef.current) {
      console.log("Peer is not ready");
      return;
    }

    console.log("Connecting to:", otherPeerId);

    const conn = peerRef.current.connect(otherPeerId);

    connectionRef.current = conn;

    setupConnection(conn);
  };

  // =========================
  // CREATE PEER
  // =========================
  useEffect(() => {
    const peer = new Peer();

    peerRef.current = peer;

    // PeerJS ID generated
    peer.on("open", (id) => {
      console.log("My Peer ID:", id);

      setPeerId(id);
      setStatus("Peer ready");
    });

    // =========================
    // RECEIVE CONNECTION
    // =========================
    peer.on("connection", (conn) => {
      console.log("Incoming connection");

      connectionRef.current = conn;

      setupConnection(conn);
    });

    peer.on("error", (error) => {
      console.log("PeerJS error:", error);
      setStatus("PeerJS error");
    });

    return () => {
      peer.destroy();
    };
  }, []);

  // =========================
  // SOCKET.IO EVENTS
  // =========================
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    // Server sends room code
    const handleRoomCode = (code) => {
      console.log("Room created:", code);

      setRoomCode(code);
      const link = `${CLIENT_BASE_URL}/?room=${code}`;
      setShareLink(link);
      console.log("Shareable link:", link);

      QRcode.toDataURL(
        link,
        {
          width: 256,
          margin: 2,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        },
        (err, url) => {
          if (!err) {
            setQr(url);
          } else {
            console.error("QR generation error:", err);
          }
        }
      );
      setStatus("Room created. Waiting for peer...");
    };

    // Joining user receives owner's Peer ID
    const handleOwnerPeerId = (ownerPeerId) => {
      console.log("Owner Peer ID:", ownerPeerId);

      connectWithPeer(ownerPeerId);
    };

    // Owner receives joining user's Peer ID
    const handlePeerJoined = (otherPeerId) => {
      console.log("Other user's Peer ID:", otherPeerId);

      connectWithPeer(otherPeerId);
    };

    // Room error
    const handleRoomError = (message) => {
      console.log("Room error:", message);

      alert(message);
      setStatus(message);
      setRoomCode("");
      if (window.location.search) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("room-code", handleRoomCode);
    socket.on("owner-peer-id", handleOwnerPeerId);
    socket.on("peer-joined", handlePeerJoined);
    socket.on("room-error", handleRoomError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("room-code", handleRoomCode);
      socket.off("owner-peer-id", handleOwnerPeerId);
      socket.off("peer-joined", handlePeerJoined);
      socket.off("room-error", handleRoomError);
    };
  }, []);

  // =========================
  // AUTO JOIN VIA URL (FROM LINK / QR SCAN)
  // =========================
  useEffect(() => {
    if (!peerId || autoJoinedRef.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const targetRoom = urlParams.get("room");

    if (targetRoom) {
      autoJoinedRef.current = true;
      setIsHost(false);
      setJoinCode(targetRoom);
      setRoomCode(targetRoom);
      setStatus(`Joining room ${targetRoom}...`);

      socket.emit("join-room", {
        roomCode: targetRoom,
        peerId: peerId,
      });
    }
  }, [peerId]);

  // =========================
  // CREATE ROOM
  // =========================
  const createRoom = () => {
    if (!peerId) {
      alert("Peer is not ready yet");
      return;
    }

    setIsHost(true);
    socket.emit("create-room", peerId);

    setStatus("Creating room...");
  };

  // =========================
  // JOIN ROOM
  // =========================
  const joinRoom = (codeOverride) => {
    const code = codeOverride || joinCode;

    if (!code) {
      alert("Enter room code");
      return;
    }

    if (!peerId) {
      alert("Peer is not ready yet");
      return;
    }

    setIsHost(false);
    setRoomCode(code);
    socket.emit("join-room", {
      roomCode: code,
      peerId: peerId,
    });

    setStatus("Joining room...");
  };

  // =========================
  // LEAVE / DISCONNECT ROOM
  // =========================
  const leaveRoom = () => {
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }

    setIsHost(false);
    setConnected(false);
    setRoomCode("");
    setJoinCode("");
    setQr("");
    setShareLink("");
    setStatus("Disconnected");

    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return {
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
  };
};

