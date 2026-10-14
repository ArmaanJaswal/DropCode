import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { JoinModal } from "./JoinModal";

export const LandingPage = ({ onCreateRoom, onJoinRoom, peerId }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#ff5a00] selection:text-white flex flex-col justify-between">
      {/* NAVBAR */}
      <Navbar
        onLaunchClick={() => setShowJoinModal(true)}
      />

      <main>
        {/* HERO SECTION WITH EXACT ILLUSTRATION & BOTH BUTTONS */}
        <Hero
          onCreateRoom={onCreateRoom}
          onJoinClick={() => setShowJoinModal(true)}
          peerId={peerId}
        />

        {/* THREE STEPS HOW IT WORKS */}
        <HowItWorks />

        {/* FAQ ACCORDION */}
        <FAQ onLaunchClick={onCreateRoom} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* JOIN ROOM MODAL */}
      <JoinModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoinRoom={(code) => {
          setShowJoinModal(false);
          onJoinRoom(code);
        }}
        peerId={peerId}
      />
    </div>
  );
};
