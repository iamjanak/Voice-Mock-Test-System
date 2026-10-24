
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Mic,
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesColumn,
  UserRound,
  LogOut,
  TrendingUp,
  Globe,
  MessageCircle,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import "../../styles/dashboard.css";

const mockTests = [
  {
    id: 1,
    title: "Everyday conversation",
    level: "Beginner",
    questions: 5,
    duration: 10,
    status: "Ready",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "Travel and tourism",
    level: "Intermediate",
    questions: 5,
    duration: 12,
    status: "In progress",
    icon: Globe,
  },
  {
    id: 3,
    title: "Job interview",
    level: "Intermediate",
    questions: 5,
    duration: 15,
    status: "Ready",
    icon: BriefcaseBusiness,
  },
];

const navigation = [
  { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "Mock tests", path: "/student/mock-tests", icon: ClipboardList },
  { label: "My results", path: "/student/results", icon: ChartNoAxesColumn },
  { label: "Profile", path: "/student/profile", icon: UserRound },
];

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function getFirstName(user) {
  const fullName = user.full_name || user.name || user.username || "";
  return fullName.trim().split(/\s+/)[0] || "Student";
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = readUser();
  const firstName = getFirstName(user);
  const fullName = user.full_name || user.name || "Student";
  const streak = user.practice_streak ?? 4;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  const startTest = (test) => {
    navigate("/test-instructions", {
      state: { test },
    });
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <aside className={`student-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Mic size={19} />
          </div>

          <div className="sidebar-brand-text">
            <strong>Voice Mock Test</strong>
            <span>Student</span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <nav className="sidebar-navigation" aria-label="Student navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/student/dashboard"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-account">
          <div className="account-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="account-details">
            <strong>{fullName}</strong>
            <span>{user.email || "Student account"}</span>
          </div>

          <button
            type="button"
            className="logout-button"
            title="Sign out"
            aria-label="Sign out"
            onClick={handleLogout}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {menuOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="dashboard-greeting">
            <h1>Hello, {firstName}!</h1>
            <p>Ready to improve your speaking skills today?</p>
          </div>

          <div className="practice-streak">
            <span className="streak-icon">
              <TrendingUp size={17} />
            </span>
            <span>
              Practice streak: <strong>{streak} days</strong>
            </span>
          </div>
        </header>

        {/* Resume test */}
        <section className="resume-banner">
          <div className="resume-icon">
            <Globe size={21} />
          </div>

          <div className="resume-details">
            <span className="eyebrow">Continue where you left off</span>
            <h2>Travel and tourism · Question 3 of 5</h2>
          </div>

          <button
            type="button"
            className="primary-button resume-button"
            onClick={() =>
              startTest({
                id: 2,
                title: "Travel and tourism",
                level: "Intermediate",
                questions: 5,
                duration: 12,
                resume: true,
                questionNumber: 3,
              })
            }
          >
            Continue test <ArrowRight size={16} />
          </button>
        </section>

        {/* Statistics */}
        <section className="dashboard-stats" aria-label="Your statistics">
          <article className="stat-card">
            <span className="stat-label">Tests taken</span>
            <strong className="stat-value">12</strong>
            <span className="stat-foot positive">+3 this week</span>
          </article>

          <article className="stat-card">
            <span className="stat-label">Average score</span>
            <strong className="stat-value">78%</strong>
            <span className="stat-foot positive">+6% this month</span>
          </article>

          <article className="stat-card">
            <span className="stat-label">Best skill</span>
            <strong className="stat-value stat-word">Fluency</strong>
            <span className="stat-foot">88% average</span>
          </article>

          <article className="stat-card">
            <span className="stat-label">Study time</span>
            <strong className="stat-value">5.5h</strong>
            <span className="stat-foot">This month</span>
          </article>
        </section>

        {/* Lower dashboard panels */}
        <section className="dashboard-bottom">
          {/* Available tests */}
          <article className="dashboard-panel available-tests">
            <div className="panel-heading">
              <h2>Available mock tests</h2>
              <button
                type="button"
                className="panel-link"
                onClick={() => navigate("/student/mock-tests")}
              >
                View all <ChevronRight size={15} />
              </button>
            </div>

            <div className="test-list">
              {mockTests.map((test) => {
                const Icon = test.icon;
                const inProgress = test.status === "In progress";

                return (
                  <div className="mock-test-item" key={test.id}>
                    <div className="mock-test-icon">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div className="mock-test-info">
                      <h3>{test.title}</h3>
                      <p>
                        {test.level} <span>•</span> {test.questions} questions{" "}
                        <span>•</span> {test.duration} min
                      </p>
                    </div>

                    <span
                      className={`test-status ${
                        inProgress ? "status-progress" : "status-ready"
                      }`}
                    >
                      <span className="status-dot" />
                      {test.status}
                    </span>

                    <button
                      type="button"
                      className={`test-action ${
                        inProgress ? "secondary-button" : "primary-button"
                      }`}
                      onClick={() => startTest(test)}
                    >
                      {inProgress ? "Continue" : "Start test"}
                    </button>
                  </div>
                );
              })}
            </div>
          </article>

          {/* Latest result */}
          <article className="dashboard-panel latest-result">
            <div className="panel-heading">
              <h2>Latest result</h2>
              <button
                type="button"
                className="panel-link"
                onClick={() => navigate("/student/results")}
              >
                All results <ChevronRight size={15} />
              </button>
            </div>

            <div className="result-summary">
              <div
                className="score-ring"
                role="img"
                aria-label="Overall score 85 percent"
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    className="score-ring-track"
                    cx="50"
                    cy="50"
                    r="42"
                  />
                  <circle
                    className="score-ring-progress"
                    cx="50"
                    cy="50"
                    r="42"
                    strokeDasharray="224 264"
                  />
                </svg>
                <strong>85%</strong>
              </div>

              <div className="result-details">
                <h3>Everyday conversation</h3>
                <p>Yesterday <span>•</span> 9 min 40 s</p>
                <span className="completed-status">
                  <CheckCircle2 size={12} /> Completed
                </span>
              </div>
            </div>

            <div className="skill-scores">
              <div className="skill-score">
                <div className="skill-score-heading">
                  <span>Fluency</span>
                  <strong>88%</strong>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="skill-score">
                <div className="skill-score-heading">
                  <span>Pronunciation</span>
                  <strong>80%</strong>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: "80%" }} />
                </div>
              </div>

              <div className="skill-score">
                <div className="skill-score-heading">
                  <span>Grammar</span>
                  <strong>75%</strong>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="feedback-button"
              onClick={() => navigate("/student/results")}
            >
              View feedback
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}
