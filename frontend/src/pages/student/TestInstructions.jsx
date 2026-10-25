
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/TestInstructions.css";

const instructions = [
  {
    number: "01",
    icon: "◷",
    title: "Time management",
    description:
      "You have 10 minutes to answer 5 questions. The timer starts when you begin the test.",
  },
  {
    number: "02",
    icon: "♫",
    title: "Speak clearly",
    description:
      "Aim to speak for about 1 minute per question. Start and stop your recording using the recording controls.",
  },
  {
    number: "03",
    icon: "↻",
    title: "Review your answers",
    description:
      "Listen to your recordings and re-record your answers before submitting them.",
  },
  {
    number: "04",
    icon: "✓",
    title: "Understand your score",
    description:
      "After the final question, review your fluency, pronunciation and grammar scores.",
  },
];

export default function TestInstructions() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [micReady, setMicReady] = useState(false);
  const [checkingMic, setCheckingMic] = useState(false);
  const [error, setError] = useState("");

  async function testMicrophone() {
    setCheckingMic(true);
    setError("");
    setMicReady(false);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone access is unavailable. Please use HTTPS or localhost.");
      setCheckingMic(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      stream.getTracks().forEach((track) => track.stop());
      setMicReady(true);
    } catch {
      setError(
        "Microphone access was denied. Allow microphone permission in your browser settings and try again."
      );
    } finally {
      setCheckingMic(false);
    }
  }

  function beginTest() {
    if (micReady) {
      navigate(`/student/tests/${id || "1"}/speaking`);
    }
  }

  return (
    <main className="instructions-page">
      <button
        type="button"
        className="back-to-tests"
        onClick={() => navigate("/student/mock-tests")}
      >
        <span className="back-arrow">←</span>
        <span>Back to Mock Tests</span>
      </button>

      <section className="instructions-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            TEST PREPARATION
          </span>

          <h1>Get ready to speak.</h1>

          <p className="hero-description">
            Review the instructions, check your microphone and prepare for
            your speaking assessment.
          </p>

          <div className="test-meta">
            <span>
              <span className="meta-icon">◷</span>
              10 minutes
            </span>
            <span>
              <span className="meta-icon">▤</span>
              5 questions
            </span>
            <span>
              <span className="meta-icon">◎</span>
              Beginner
            </span>
          </div>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <div className="hero-circle hero-circle-one" />
          <div className="hero-circle hero-circle-two" />
          <div className="hero-mic">
            <svg viewBox="0 0 64 64" fill="none">
              <rect
                x="23"
                y="7"
                width="18"
                height="32"
                rx="9"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M15 30v3a17 17 0 0 0 34 0v-3M32 50v7M23 57h18"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="hero-spark hero-spark-one">✦</span>
          <span className="hero-spark hero-spark-two">✧</span>
          <div className="hero-floating-note">Your voice matters</div>
        </div>
      </section>

      <div className="instructions-section-heading">
        <div>
          <span className="section-eyebrow">BEFORE YOU BEGIN</span>
          <h2>Know what to expect</h2>
          <p>Four simple things to keep in mind during your test.</p>
        </div>

        <span className="instructions-count">04 GUIDELINES</span>
      </div>

      <div className="instructions-layout">
        <section className="instructions-card">
          <div className="card-heading">
            <div className="card-heading-icon">☰</div>
            <div>
              <h3>Test guidelines</h3>
              <p>Take a moment to read each point.</p>
            </div>
          </div>

          <div className="guidelines-list">
            {instructions.map((item) => (
              <div className="guideline-item" key={item.number}>
                <div className="guideline-number">{item.number}</div>

                <div className="guideline-icon">{item.icon}</div>

                <div className="guideline-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="quiet-reminder">
            <span className="quiet-reminder-icon">!</span>
            <div>
              <strong>Find a quiet place</strong>
              <p>
                Background noise may affect your pronunciation score.
                Choose a comfortable place before starting.
              </p>
            </div>
          </div>
        </section>

        <aside className="microphone-card">
          <div className="microphone-card-top">
            <span className="microphone-label">AUDIO SETUP</span>
            <span
              className={`microphone-status ${
                micReady ? "status-ready" : ""
              }`}
            >
              <span className="status-dot" />
              {micReady ? "Ready" : "Not checked"}
            </span>
          </div>

          <div className={`microphone-visual ${micReady ? "visual-ready" : ""}`}>
            <div className="microphone-visual-ring">
              <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect
                  x="23"
                  y="7"
                  width="18"
                  height="32"
                  rx="9"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M15 30v3a17 17 0 0 0 34 0v-3M32 50v7M23 57h18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <h3>Check your microphone</h3>
          <p className="microphone-description">
            Say a sentence out loud, such as "My name is Aarati and I'm ready."
            Allow microphone access when your browser asks.
          </p>

          <div className={`audio-wave ${micReady ? "wave-ready" : ""}`}>
            {Array.from({ length: 27 }, (_, index) => (
              <span
                key={index}
                style={{
                  "--bar-height": `${10 + ((index * 17 + 11) % 27)}px`,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="microphone-button"
            onClick={testMicrophone}
            disabled={checkingMic}
          >
            {checkingMic ? (
              <>
                <span className="button-spinner" />
                Checking microphone...
              </>
            ) : micReady ? (
              "↻  Test again"
            ) : (
              "♫  Test microphone"
            )}
          </button>

          {error && (
            <div className="microphone-message microphone-error" role="alert">
              {error}
            </div>
          )}

          {micReady && (
            <div className="microphone-message microphone-success" role="status">
              <span>✓</span>
              Microphone access successful!
            </div>
          )}

          <div className="microphone-divider" />

          <div className="ready-summary">
            <span className="ready-summary-icon">
              {micReady ? "✓" : "i"}
            </span>
            <p>
              {micReady
                ? "Everything is set. You're ready to begin."
                : "Microphone access is required before you can begin."}
            </p>
          </div>

          <button
            type="button"
            className="begin-test-button"
            onClick={beginTest}
            disabled={!micReady}
          >
            Begin speaking test
            <span>→</span>
          </button>

          <p className="microphone-hint">
            Your 10-minute test begins on the next screen.
          </p>
        </aside>
      </div>

      <footer className="instructions-footer">
        <span>Speaking assessment</span>
        <span className="footer-separator">•</span>
        <span>Take your time. Speak with confidence.</span>
      </footer>
    </main>
  );
}
