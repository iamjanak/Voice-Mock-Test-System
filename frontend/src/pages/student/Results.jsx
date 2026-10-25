
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CircleCheck,
  CircleAlert,
  Play,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import "../../styles/results.css";

const result = {
  testTitle: "Everyday conversation",
  date: "Today",
  duration: "9 min 40 s",
  score: 85,
  previousScore: 78,
  skills: [
    { name: "Fluency", score: 88 },
    { name: "Pronunciation", score: 80 },
    { name: "Grammar", score: 75 },
  ],
  feedback: [
    {
      type: "success",
      text: "You're making good progress in your speaking.",
    },
    {
      type: "success",
      text: "Your ideas are clear and well organized.",
    },
    {
      type: "tip",
      text: "Try connecting sentences more naturally and practising difficult word sounds.",
    },
  ],
  questions: [
    {
      id: 1,
      score: 86,
      question: "Introduce yourself and describe a normal day in your life.",
      transcript:
        "I usually wake up early in the morning, get ready for my classes, and study during the day. In the evening, I spend time with my friends and review what I learned.",
      tip: "Add one specific detail about your daily routine to make your answer more personal.",
    },
    {
      id: 2,
      score: 88,
      question:
        "Describe your favourite place and explain why you enjoy visiting it.",
      transcript:
        "My favourite place is the river near my home. In the evening I walk there with my friends because it is quiet and the view is beautiful.",
      tip: 'Add one feeling word, like "relaxed" or "peaceful", to make the answer more personal.',
    },
    {
      id: 3,
      score: 82,
      question:
        "Talk about a person who has helped you. Who are they and what did you learn from them?",
      transcript:
        "A person who helped me a lot was my teacher. They encouraged me to keep learning and taught me to be confident when speaking in front of other people.",
      tip: "Include a short example of what the person did to help you.",
    },
    {
      id: 4,
      score: 84,
      question:
        "What do you usually do at the weekend? Would you like to change anything about it?",
      transcript:
        "At weekends, I usually relax, finish my assignments, and meet my friends. I would like to spend more time exercising and learning new skills.",
      tip: "Explain why you want to make this change to develop your answer.",
    },
    {
      id: 5,
      score: 85,
      question:
        "Some people like to study alone and others in a group. Which do you prefer, and why?",
      transcript:
        "I prefer studying alone because I can concentrate better and work at my own speed. However, group study is useful when I need to discuss difficult topics.",
      tip: "Give a brief example that supports your preferred way of studying.",
    },
  ],
};

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="result-score-ring"
      role="img"
      aria-label={`Overall score ${score} percent`}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="result-ring-track" cx="50" cy="50" r="42" />
        <circle
          className="result-ring-value"
          cx="50"
          cy="50"
          r="42"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <strong>{score}%</strong>
    </div>
  );
}

function SkillBar({ name, score }) {
  return (
    <div className="result-skill">
      <div className="result-skill-heading">
        <span>{name}</span>
        <strong>{score}%</strong>
      </div>
      <div
        className="result-skill-track"
        role="progressbar"
        aria-label={name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <div
          className="result-skill-fill"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState([2]);

  function toggleTranscript(id) {
    setExpandedQuestions((current) =>
      current.includes(id)
        ? current.filter((questionId) => questionId !== id)
        : [...current, id]
    );
  }

  function retakeTest() {
    navigate("/student/tests/1/instructions");
  }

  return (
    <main className="results-page">
      <header className="results-header">
        <div>
          <h1>Your test results</h1>
          <p>
            {result.testTitle} · {result.date} · {result.duration}
          </p>
        </div>

        <button
          type="button"
          className="results-back-link"
          onClick={() => navigate("/student/dashboard")}
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </button>
      </header>

      <section className="results-summary">
        <ScoreRing score={result.score} />

        <div className="results-summary-text">
          <h2>Great job!</h2>
          <p>
            You're making good progress in your speaking. Your score is{" "}
            {result.score - result.previousScore}% higher than last time.
          </p>
        </div>

        <div className="results-summary-actions">
          <button
            type="button"
            className="results-button results-button-outline"
            onClick={retakeTest}
          >
            <RotateCcw size={14} />
            Retake test
          </button>
          <button
            type="button"
            className="results-button results-button-primary"
            onClick={() => navigate("/student/mock-tests")}
          >
            Try another test
          </button>
        </div>
      </section>

      <section className="results-overview">
        <article className="results-card results-skills-card">
          <h2>Skill breakdown</h2>
          <div className="results-skills">
            {result.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                score={skill.score}
              />
            ))}
          </div>
        </article>

        <article className="results-card results-feedback-card">
          <h2>Personalized feedback</h2>

          <ul className="results-feedback-list">
            {result.feedback.map((item, index) => (
              <li key={index}>
                <span
                  className={`results-feedback-icon ${
                    item.type === "tip" ? "feedback-tip" : ""
                  }`}
                >
                  {item.type === "tip" ? (
                    <CircleAlert size={12} />
                  ) : (
                    <Check size={12} />
                  )}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="results-next-step">
            <strong>NEXT STEP</strong>
            <p>Practise one short answer each day.</p>
          </div>
        </article>
      </section>

      <section className="results-card results-answers-card">
        <div className="results-answers-heading">
          <h2>Answer by answer</h2>
          <span>Listen to each answer and read what we heard</span>
        </div>

        <div className="results-question-list">
          {result.questions.map((question) => {
            const expanded = expandedQuestions.includes(question.id);

            return (
              <article
                className="results-question"
                key={question.id}
              >
                <div className="results-question-main">
                  <button
                    type="button"
                    className="results-play-button"
                    aria-label={`Play answer to question ${question.id}`}
                    title="Audio playback will be connected later"
                    onClick={() =>
                      alert(
                        "Audio playback will be available when recording is connected."
                      )
                    }
                  >
                    <Play size={14} fill="currentColor" />
                  </button>

                  <div className="results-question-text">
                    <span className="results-question-label">
                      QUESTION {question.id}
                    </span>
                    <h3>{question.question}</h3>
                  </div>

                  <span className="results-question-score">
                    <span />
                    {question.score}%
                  </span>

                  <button
                    type="button"
                    className="results-transcript-toggle"
                    aria-expanded={expanded}
                    onClick={() => toggleTranscript(question.id)}
                  >
                    {expanded ? "Hide transcript" : "Show transcript"}
                  </button>
                </div>

                {expanded && (
                  <div className="results-transcript">
                    <strong>What we heard</strong>
                    <p>{question.transcript}</p>
                    <div className="results-tip">
                      <strong>Tip:</strong> {question.tip}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
