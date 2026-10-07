import React from "react";

export const FileTransferCard = ({
  file,
  handleFileSelect,
  sendFile,
  connected,
  sending,
  sendProgress,
  receiving,
  receivedFileName,
  receiveProgress,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Send File</h2>

      <p className="text-sm text-slate-400 mt-1 mb-5">
        Select a file and send it directly to your peer.
      </p>

      {/* FILE INPUT */}
      <label className="block cursor-pointer">
        <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-8 text-center transition">
          <div className="text-4xl mb-3">📤</div>

          <p className="font-medium">Click to select a file</p>

          <p className="text-sm text-slate-500 mt-1">Any file type</p>

          {file && (
            <div className="mt-4">
              <p className="text-blue-400 font-medium break-all">{file.name}</p>

              <p className="text-xs text-slate-500 mt-1">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        <input
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      {/* SEND BUTTON */}
      <button
        onClick={sendFile}
        disabled={!file || !connected || sending}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 py-3 rounded-xl font-semibold transition"
      >
        {sending ? `Sending ${sendProgress}%` : "Send File"}
      </button>

      {/* SEND PROGRESS */}
      {sending && (
        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Uploading</span>

            <span className="text-blue-400">{sendProgress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${sendProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* RECEIVE PROGRESS */}
      {receiving && (
        <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium">Receiving file</p>

              <p className="text-sm text-slate-400 break-all">
                {receivedFileName}
              </p>
            </div>

            <span className="text-green-400">{receiveProgress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{
                width: `${receiveProgress}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
