import React from "react";

export const JoinRoomCard = ({
  joinCode,
  setJoinCode,
  onJoinRoom,
  peerId,
}) => {
  return (
    <div className="p-6 border-b border-slate-800">
      <h2 className="text-lg font-semibold">Join Room</h2>

      <p className="text-sm text-slate-400 mt-1 mb-4">
        Enter another user's room code.
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="6-digit room code"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={onJoinRoom}
          disabled={!peerId}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 px-6 rounded-xl font-semibold transition"
        >
          Join
        </button>
      </div>
    </div>
  );
};
