import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { socket } from "../services/socket";

export const usePeer = (onDataReceived) => {
  // =========================
  // STATE
  // =========================
  const [peerId, setPeerId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Waiting for connection");

  // =========================
  // REFS
  // =========================
  const peerRef = useRef(null);
  const connectionRef = useRef(null);
  const onDataReceivedRef = useRef(onDataReceived);

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
      setStatus("Room created. Waiting for user...");
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
  // CREATE ROOM
  // =========================
  const createRoom = () => {
    if (!peerId) {
      alert("Peer is not ready yet");
      return;
    }

    socket.emit("create-room", peerId);

    setStatus("Creating room...");
  };

  // =========================
  // JOIN ROOM
  // =========================
  const joinRoom = () => {
    if (!joinCode) {
      alert("Enter room code");
      return;
    }

    if (!peerId) {
      alert("Peer is not ready yet");
      return;
    }

    socket.emit("join-room", {
      roomCode: joinCode,
      peerId: peerId,
    });

    setStatus("Joining room...");
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
  };
};
