import React from "react";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner wrap">
        {/* BRAND */}
        <a className="brand" href="#top" aria-label="Room Drop home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 30 30" fill="none">
              <path
                d="M8 24V7.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V24M5 24h20M12 24V10l7-2v16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16.5 16v2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
          <span>Room Drop</span>
        </a>

        {/* FOOTER LINKS */}
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Privacy</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* COPYRIGHT */}
        <span className="copyright">
          © 2026 Room Drop. Made for the little transfers.
        </span>
      </div>
    </footer>
  );
};
