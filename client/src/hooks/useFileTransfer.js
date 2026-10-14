import { useRef, useState } from "react";
import { CHUNK_SIZE } from "../constants";
import { downloadReceivedFile } from "../utils/fileHelpers";

export const useFileTransfer = () => {
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  const [receivedFileName, setReceivedFileName] = useState("");
  const [receiving, setReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [receivedFile, setReceivedFile] = useState(null);

  // Store incoming file information
  const incomingFileRef = useRef({
    chunks: [],
    name: "",
    size: 0,
    mimeType: "",
    totalChunks: 0,
    receivedChunks: 0,
  });

  // =========================
  // SELECT FILE
  // =========================
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    console.log("Selected file:", selectedFile);

    setFile(selectedFile);
    setSendProgress(0);
  };

  // =========================
  // SEND FILE
  // =========================
  const sendFile = async (connectionRef) => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    if (!connectionRef.current) {
      alert("Not connected");
      return;
    }

    if (!connectionRef.current.open) {
      alert("Connection is not open");
      return;
    }

    setSending(true);
    setSendProgress(0);

    const connection = connectionRef.current;

    try {
      // Convert file to ArrayBuffer
      const buffer = await file.arrayBuffer();

      // Calculate number of chunks
      const totalChunks = Math.ceil(buffer.byteLength / CHUNK_SIZE);

      console.log("Total chunks:", totalChunks);

      // =========================
      // SEND FILE INFORMATION
      // =========================
      connection.send({
        type: "file-start",
        name: file.name,
        size: file.size,
        mimeType: file.type,
        totalChunks: totalChunks,
      });

      // =========================
      // SEND CHUNKS
      // =========================
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;

        const end = Math.min(start + CHUNK_SIZE, buffer.byteLength);

        const chunk = buffer.slice(start, end);

        connection.send({
          type: "file-chunk",
          index: i,
          data: chunk,
        });

        // Update progress
        const progress = Math.round(((i + 1) / totalChunks) * 100);

        setSendProgress(progress);

        // Small delay to avoid overwhelming DataChannel
        await new Promise((resolve) => setTimeout(resolve, 1));
      }

      // =========================
      // FILE FINISHED
      // =========================
      connection.send({
        type: "file-end",
      });

      console.log("File sent successfully");

      setSendProgress(100);
    } catch (error) {
      console.log("File sending error:", error);

      alert("Failed to send file");
    }

    setSending(false);
  };

  // =========================
  // HANDLE RECEIVED DATA
  // =========================
  const handleIncomingData = (data) => {
    // =========================
    // FILE START
    // =========================
    if (data.type === "file-start") {
      console.log("Receiving file:", data.name);

      incomingFileRef.current = {
        chunks: [],
        name: data.name,
        size: data.size,
        mimeType: data.mimeType,
        totalChunks: data.totalChunks,
        receivedChunks: 0,
      };

      setReceivedFileName(data.name);
      setReceiving(true);
      setReceiveProgress(0);

      return;
    }

    // =========================
    // FILE CHUNK
    // =========================
    if (data.type === "file-chunk") {
      const incoming = incomingFileRef.current;

      incoming.chunks.push(data.data);

      incoming.receivedChunks++;

      const progress = Math.round(
        (incoming.receivedChunks / incoming.totalChunks) * 100
      );

      setReceiveProgress(progress);

      return;
    }

    // =========================
    // FILE END (DO NOT AUTO-DOWNLOAD, WAIT FOR USER ACTION)
    // =========================
    if (data.type === "file-end") {
      console.log("File received completely, ready for user download");

      const incoming = incomingFileRef.current;
      setReceivedFile({
        name: incoming.name,
        size: incoming.size,
        mimeType: incoming.mimeType,
        chunks: [...incoming.chunks],
      });

      setReceiving(false);
      setReceiveProgress(100);

      return;
    }
  };

  // =========================
  // USER-TRIGGERED DOWNLOAD
  // =========================
  const downloadFile = () => {
    if (!receivedFile) return;
    downloadReceivedFile(
      receivedFile.chunks,
      receivedFile.mimeType,
      receivedFile.name
    );
  };

  const clearReceivedFile = () => {
    setReceivedFile(null);
    setReceivedFileName("");
    setReceiveProgress(0);
  };

  return {
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
  };
};
