import React from "react";

export const HowItWorks = () => {
  return (
    <>
      <section id="how-it-works" className="how-section">
        <div className="wrap">
          <div className="section-heading">
            <p className="section-kicker">Less friction. More sharing.</p>
            <h2>Three steps. That's it.</h2>
            <p>Open a room. Bring a device. Make the transfer.</p>
          </div>

          <div className="steps">
            {/* STEP 1 */}
            <article className="step">
              <span className="step-number">1</span>
              <div className="icon-tile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </div>
              <h3>Create a room</h3>
              <p>One click. Your own space. No account needed.</p>
            </article>

            {/* STEP 2 */}
            <article className="step">
              <span className="step-number">2</span>
              <div className="icon-tile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-qr-code"
                  aria-hidden="true"
                >
                  <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                  <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                  <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                  <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                  <path d="M21 21v.01"></path>
                  <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                  <path d="M3 12h.01"></path>
                  <path d="M12 3h.01"></path>
                  <path d="M12 16v.01"></path>
                  <path d="M16 12h1"></path>
                  <path d="M21 12v.01"></path>
                  <path d="M12 21v-1"></path>
                </svg>
              </div>
              <h3>Share the code or QR</h3>
              <p>A short code or a quick scan brings the other device in.</p>
            </article>

            {/* STEP 3 */}
            <article className="step">
              <span className="step-number">3</span>
              <div className="icon-tile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
              <h3>Drop your file</h3>
              <p>Straight from your device to theirs. No cloud detour.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section id="features" className="benefits wrap" aria-label="Room Drop features">
        <div className="benefit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-zap"
            aria-hidden="true"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          <span>Direct device-to-device</span>
        </div>

        <div className="benefit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="M20 21a8 8 0 0 0-16 0"></path>
          </svg>
          <span>No signup. No hassle.</span>
        </div>

        <div className="benefit" id="privacy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-check"
            aria-hidden="true"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <span>No server storage. Ever.</span>
        </div>
      </section>
    </>
  );
};
