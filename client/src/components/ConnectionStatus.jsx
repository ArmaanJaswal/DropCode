import React from "react";

export const ConnectionStatus = ({ status, connected }) => {
  return (
    <div className="p-6 border-b border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Connection</h2>

          <p className="text-sm text-slate-400 mt-1">{status}</p>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            connected
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {connected ? "🟢 Connected" : "🔴 Not Connected"}
        </div>
      </div>
    </div>
  );
};
