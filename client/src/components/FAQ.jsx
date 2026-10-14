import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does Room Drop work?",
    answer:
      "Create a room, join on another device with the code or QR, and drop a file. It travels directly between your browsers — not to a storage server.",
  },
  {
    question: "Are my files stored anywhere?",
    answer:
      "Never. Room Drop does not store, buffer, or cache your files on any cloud server or database. Data streams purely in real-time from device to device and disappears from memory the second the transfer completes.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There are no artificial file size limits. You can send large zip archives, 4K videos, or entire photo batches. Performance depends purely on your internet upload and download speeds.",
  },
  {
    question: "Do both devices need to be on the same Wi-Fi?",
    answer:
      "No! You can share files whether your devices are on the same local Wi-Fi or across different networks and cellular connections worldwide.",
  },
  {
    question: "Do I need an app or an account?",
    answer:
      "No accounts, no phone numbers, and no app installs required. Room Drop runs 100% in your browser on iOS, Android, macOS, Windows, and Linux.",
  },
];

export const FAQ = ({ onLaunchClick }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section wrap">
      <div className="section-heading">
        <p className="section-kicker">A few good questions</p>
        <h2>Glad you asked.</h2>
        <p>Less wondering. More sharing.</p>
        <button
          type="button"
          onClick={onLaunchClick}
          className="rd-button rd-button-brand h-10 px-5 py-2 mt-4 text-sm"
        >
          <span>Launch Room Drop</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="faq-item">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="faq-trigger"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
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
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};
