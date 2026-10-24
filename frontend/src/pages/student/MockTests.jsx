
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  MessageCircle,
  Globe,
  Briefcase,
  BookOpen,
} from "lucide-react";

import "../../styles/mocktests.css";

const MOCK_TESTS = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Everyday conversation",
    level: "Beginner",
    questions: 5,
    minutes: 10,
    status: "ready",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Daily routines and hobbies",
    level: "Beginner",
    questions: 5,
    minutes: 10,
    status: "completed",
    bestScore: 85,
  },
  {
    id: 3,
    icon: Globe,
    title: "Travel and tourism",
    level: "Intermediate",
    questions: 5,
    minutes: 12,
    status: "progress",
    currentQuestion: 3,
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Job interview",
    level: "Intermediate",
    questions: 5,
    minutes: 15,
    status: "ready",
  },
  {
    id: 5,
    icon: BookOpen,
    title: "Academic discussion",
    level: "Advanced",
    questions: 5,
    minutes: 15,
    status: "locked",
  },
  {
    id: 6,
    icon: BookOpen,
    title: "Opinions and debate",
    level: "Advanced",
    questions: 5,
    minutes: 18,
    status: "locked",
  },
];

const LEVELS = [
  "All levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const BADGES = {
  ready: {
    label: "Ready",
    className: "mt-badge-ready",
  },
  completed: {
    label: "Completed",
    className: "mt-badge-ready",
  },
  progress: {
    label: "In progress",
    className: "mt-badge-progress",
  },
  locked: {
    label: "Locked",
    className: "mt-badge-locked",
  },
};

function buildMeta(test, previousTitle) {
  const details = [
    test.level,
    `${test.questions} questions`,
    `${test.minutes} min`,
  ];

  if (test.status === "completed") {
    details.push(`Best score: ${test.bestScore}%`);
  }

  if (test.status === "progress") {
    details.push(
      `Question ${test.currentQuestion} of ${test.questions}`
    );
  }

  if (test.status === "locked" && previousTitle) {
    details.push(`Finish "${previousTitle}" to unlock`);
  }

  return details.join(" • ");
}

function TestRow({ test, previousTitle, onAction }) {
  const Icon = test.icon;
  const badge = BADGES[test.status];

  const action = {
    ready: {
      label: "Start test",
      className: "mt-btn-primary",
    },
    completed: {
      label: "View result",
      className: "mt-btn-outline",
    },
    progress: {
      label: "Continue",
      className: "mt-btn-outline",
    },
    locked: {
      label: "Locked",
      className: "mt-btn-locked",
    },
  }[test.status];

  return (
    <article className="mt-row">
      <span className="mt-row-icon">
        <Icon size={18} aria-hidden="true" />
      </span>

      <div className="mt-row-info">
        <h2 className="mt-row-title">{test.title}</h2>
        <p className="mt-row-meta">
          {buildMeta(test, previousTitle)}
        </p>
      </div>

      <span className={`mt-badge ${badge.className}`}>
        <i className="mt-dot" aria-hidden="true" />
        {badge.label}
      </span>

      <button
        type="button"
        className={`mt-btn ${action.className}`}
        disabled={test.status === "locked"}
        onClick={() => onAction(test)}
      >
        {action.label}
      </button>
    </article>
  );
}

export default function MockTests() {
  const [level, setLevel] = useState("All levels");
  const navigate = useNavigate();

  const visibleTests = MOCK_TESTS.filter(
    (test) =>
      level === "All levels" || test.level === level
  );

  function handleAction(test) {
    if (test.status === "ready") {
      navigate(`/student/tests/${test.id}/instructions`);
    } else if (test.status === "progress") {
      navigate(`/student/tests/${test.id}/speaking`);
    } else if (test.status === "completed") {
      navigate("/student/results");
    }
  }

  return (
    <main className="mt-main">
      <div className="mt-content">
        <header className="mt-head">
          <div>
            <h1>Mock tests</h1>
            <p className="mt-sub">
              Choose a test to practise your speaking skills.
              Each test has five spoken questions and a timer.
            </p>
          </div>

          <div
            className="mt-tabs"
            role="group"
            aria-label="Filter tests by level"
          >
            {LEVELS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={level === item}
                className={`mt-tab ${
                  level === item ? "active" : ""
                }`}
                onClick={() => setLevel(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <div className="mt-notice">
          <Lock size={16} aria-hidden="true" />
          <span>
            Some tests are locked until you complete the
            required earlier tests.
          </span>
        </div>

        <section
          className="mt-list"
          aria-label="Available mock tests"
        >
          {visibleTests.length > 0 ? (
            visibleTests.map((test) => {
              const index = MOCK_TESTS.findIndex(
                (item) => item.id === test.id
              );

              const previousTitle =
                index > 0
                  ? MOCK_TESTS[index - 1].title
                  : null;

              return (
                <TestRow
                  key={test.id}
                  test={test}
                  previousTitle={previousTitle}
                  onAction={handleAction}
                />
              );
            })
          ) : (
            <p>No tests available for this level.</p>
          )}
        </section>
      </div>
    </main>
  );
}
