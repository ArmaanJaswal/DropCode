import React from "react";

export const Hero = ({ onCreateRoom, onJoinClick, peerId }) => {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      {/* LEFT COPY */}
      <div className="hero-copy">
        <div className="eyebrow hero-badge">
          <span className="status-dot"></span>
          A little room. A direct connection.
        </div>

        <h1 id="hero-title">
          Send files straight<br />
          to another <span>device.</span>
        </h1>

        <p className="hero-description">
          Create a room, share the code, and drop your file.
          <br className="hidden sm:block" />
          No uploads, no accounts.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            onClick={onCreateRoom}
            disabled={!peerId}
            className="rd-button rd-button-brand h-11 px-6 py-2.5 text-sm"
          >
            <span>{peerId ? "Create a Room" : "Initializing..."}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>

          <button
            type="button"
            onClick={onJoinClick}
            className="rd-button rd-button-outline h-11 px-5 py-2.5 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-door-open"
              aria-hidden="true"
            >
              <path d="M11 20H2"></path>
              <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"></path>
              <path d="M11 4H8a2 2 0 0 0-2 2v14"></path>
              <path d="M14 12h.01"></path>
              <path d="M22 20h-3"></path>
            </svg>
            <span>Join a Room</span>
          </button>
        </div>

        <div className="trust-line">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-check"
            aria-hidden="true"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <span>Files never touch our servers.</span>
        </div>
      </div>

      {/* RIGHT: EXACT DEVICE SCENE GRAPHIC (MATCHING USER HTML & PROTOTYPE) */}
      <div
        className="device-scene"
        role="img"
        aria-label="A laptop and phone sharing files directly in room 7K4-9QX"
      >
        <div className="scene-dot-grid"></div>

        {/* CONNECTION PATH */}
        <svg
          className="connection-path"
          viewBox="0 0 600 420"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M135 210C150 65 480 65 486 204M245 290C320 400 455 386 477 286"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 7"
          ></path>
        </svg>

        {/* ROOM BADGE */}
        <div className="scene-room">
          <span className="status-dot"></span>
          ROOM <span className="room-divider">·</span>
          <strong>7K4-9QX</strong>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock-keyhole"
            aria-hidden="true"
          >
            <circle cx="12" cy="16" r="1"></circle>
            <rect x="3" y="10" width="18" height="12" rx="2"></rect>
            <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
          </svg>
        </div>

        {/* LAPTOP */}
        <div className="laptop">
          <div className="laptop-screen">
            <div className="mini-window-top">
              <span></span>
              <span></span>
              <span></span>
              <span className="window-brand">room drop</span>
            </div>
            <div className="laptop-inner">
              <span className="mini-device-label">Your laptop</span>
              <div className="upload-symbol">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload"
                  aria-hidden="true"
                >
                  <path d="M12 3v12"></path>
                  <path d="m17 8-5-5-5 5"></path>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                </svg>
              </div>
              <strong>Drop something good.</strong>
              <span className="mini-muted">Or choose a file to share</span>
              <div className="mini-transfer">
                <span className="file-icon file-orange">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-file-text"
                    aria-hidden="true"
                  >
                    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                    <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </span>
                <div>
                  <strong>Project brief.pdf</strong>
                  <span>2.4 MB · Sending...</span>
                </div>
                <span className="mini-percent">68%</span>
              </div>
              <div className="mini-progress">
                <span></span>
              </div>
            </div>
          </div>
          <div className="laptop-base"></div>
          <div className="laptop-foot"></div>
        </div>

        {/* PHONE */}
        <div className="phone">
          <div className="phone-camera"></div>
          <div className="phone-top">
            9:41<span>••• ▰</span>
          </div>
          <span className="mini-device-label">Your phone</span>
          <div className="phone-received">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-down"
              aria-hidden="true"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          <strong>Incoming file</strong>
          <span className="mini-muted">From your laptop</span>
          <div className="phone-file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
              aria-hidden="true"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <strong>Project brief.pdf</strong>
            <span>2.4 MB</span>
          </div>
          <div className="phone-status">
            <span className="status-dot"></span>
            Connected
          </div>
          <div className="phone-home"></div>
        </div>

        {/* FLOATING PDF */}
        <div className="floating-file floating-pdf">
          <span className="file-icon file-orange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
              aria-hidden="true"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
              <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
          </span>
          <div>
            <strong>Project brief.pdf</strong>
            <span>2.4 MB</span>
          </div>
          <span className="file-done">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
        </div>

        {/* FLOATING IMAGE */}
        <div className="floating-file floating-image">
          <span className="file-icon file-green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-image"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
          </span>
          <div>
            <strong>Weekend.jpg</strong>
            <span>8.1 MB</span>
          </div>
        </div>

        {/* FLOATING ZIP */}
        <div className="floating-zip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-archive"
            aria-hidden="true"
          >
            <path d="M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5"></path>
            <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
            <path d="M8 12v-1"></path>
            <path d="M8 18v-2"></path>
            <path d="M8 7V6"></path>
            <circle cx="8" cy="20" r="2"></circle>
          </svg>
          <span>ZIP</span>
        </div>

        {/* FLOATING QR */}
        <div className="qr-floating">
          <svg
            className="mini-qr"
            viewBox="0 0 29 29"
            role="img"
            aria-label="Illustrative QR code"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1 1h9v9H1zM3 3v5h5V3zM19 1h9v9h-9zM21 3v5h5V3zM1 19h9v9H1zM3 21v5h5v-5z"
            ></path>
            <path
              fill="currentColor"
              d="M4 4h3v3H4zM22 4h3v3h-3zM4 22h3v3H4zM12 1h2v4h-2zM15 3h2v5h-2zM12 8h3v3h-3zM1 12h4v2H1zM7 12h3v4H7zM3 15h3v2H3zM12 13h3v3h-3zM16 11h2v5h-2zM20 12h4v2h-4zM26 12h2v5h-2zM19 16h5v2h-5zM12 18h3v5h-3zM16 19h2v3h-2zM20 20h3v3h-3zM25 19h3v4h-3zM12 25h5v3h-5zM19 25h3v3h-3zM24 24h4v2h-4zM25 27h3v1h-3z"
            ></path>
          </svg>
          <span>Scan &amp; join</span>
        </div>

        {/* SCENE CAPTION */}
        <div className="scene-caption">
          <span className="status-dot"></span>
          Just your devices. Nothing in between.
        </div>
      </div>
    </section>
  );
};
