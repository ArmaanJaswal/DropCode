import React from "react";

export const PeerIdCard = ({ peerId }) => {
  return (
    <div className="p-6 border-b border-slate-800">
      <h2 className="text-lg font-semibold mb-3">Your Peer ID</h2>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
        <p className="font-mono text-sm text-slate-300 break-all">
          {peerId || "Generating..."}
        </p>
      </div>
    </div>
  );
};
