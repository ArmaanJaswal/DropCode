import React from "react";

export const CreateRoomCard = ({ peerId, roomCode, onCreateRoom }) => {
  return (
    <div className="p-6 border-b border-slate-800">
      <h2 className="text-lg font-semibold">Create Room</h2>

      <p className="text-sm text-slate-400 mt-1 mb-4">
        Create a room and share the code with another user.
      </p>

      <button
        onClick={onCreateRoom}
        disabled={!peerId}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 py-3 rounded-xl font-semibold transition"
      >
        Create Room
      </button>

      {roomCode && (
        <div className="mt-5 bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-400">Share this code</p>

          <p className="text-3xl font-bold tracking-[0.3em] text-blue-400 mt-2">
            {roomCode}
          </p>
        </div>
      )}
    </div>
  );
};
