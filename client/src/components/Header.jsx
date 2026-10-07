import React from "react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-4">
        <span className="text-3xl">📁</span>
      </div>

      <h1 className="text-4xl font-bold">PeerShare</h1>

      <p className="text-slate-400 mt-2">Peer-to-peer file sharing</p>
    </div>
  );
};
