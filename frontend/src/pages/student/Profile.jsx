
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesColumn,
  UserRound,
  LogOut,
  LockKeyhole,
  ArrowRightFromLine,
} from "lucide-react";
import "../../styles/profile.css";

const INITIAL_PROFILE = {
  fullName: "Janak Bhatta",
  email: "janak@example.com",
  englishLevel: "Intermediate",
  weeklyGoal: "3",
};

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const user = readUser();

  const [profile, setProfile] = useState({
    fullName:
      user.full_name || user.name || INITIAL_PROFILE.fullName,
    email: user.email || INITIAL_PROFILE.email,
    englishLevel: user.english_level || INITIAL_PROFILE.englishLevel,
    weeklyGoal: String(user.weekly_goal || INITIAL_PROFILE.weeklyGoal),
  });

  const [preferences, setPreferences] = useState({
    emailResults: true,
    dailyReminder: false,
    transcripts: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
  });

  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");

  const firstName = profile.fullName.trim().split(/\s+/)[0] || "Student";
  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();

  function updateProfileField(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  }

  function updatePasswordField(event) {
    const { name, value } = event.target;
    setPasswords((previous) => ({ ...previous, [name]: value }));
  }

  function togglePreference(name) {
    setPreferences((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  }

  function saveProfile(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      full_name: profile.fullName.trim(),
      email: profile.email.trim(),
      english_level: profile.englishLevel,
      weekly_goal: Number(profile.weeklyGoal),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setNotice("Profile changes saved on this device.");
    setNoticeType("success");
  }

  function updatePassword(event) {
    event.preventDefault();

    if (!passwords.current || !passwords.newPassword) {
      setNotice("Please enter your current and new password.");
      setNoticeType("error");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setNotice("Your new password must contain at least 8 characters.");
      setNoticeType("error");
      return;
    }

    setNotice(
      "The password form is ready. Connect your Django password-change API to update your account securely."
    );
    setNoticeType("error");
  }

  function handleLogout() {
    [
      "user",
      "access",
      "refresh",
      "access_token",
      "refresh_token",
      "token",
    ].forEach((key) => localStorage.removeItem(key));

    navigate("/login", { replace: true });
  }

  const navigation = [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "Mock tests", path: "/student/mock-tests", icon: ClipboardList },
    { label: "My results", path: "/student/results", icon: ChartNoAxesColumn },
    { label: "Profile", path: "/student/profile", icon: UserRound },
  ];

  return (
    <main className="profile-page">
      <header className="profile-header">
        <div className="profile-identity">
          <div className="profile-avatar">{initials || "ST"}</div>

          <div className="profile-identity-text">
            <h1>{profile.fullName || firstName}</h1>
            <p>Student · Joined August 2026</p>
          </div>
        </div>

        <button
          type="button"
          className="profile-logout-button"
          onClick={handleLogout}
        >
          <ArrowRightFromLine size={15} />
          Log out
        </button>
      </header>

      {notice && (
        <div
          className={`profile-notice ${
            noticeType === "error" ? "profile-notice-error" : ""
          }`}
          role="status"
        >
          {notice}
          <button type="button" onClick={() => setNotice("")}>
            Dismiss
          </button>
        </div>
      )}

      <form className="profile-card personal-details-card" onSubmit={saveProfile}>
        <h2>Personal details</h2>

        <div className="profile-fields">
          <label className="profile-field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={updateProfileField}
              required
            />
          </label>

          <label className="profile-field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={updateProfileField}
              required
            />
          </label>

          <label className="profile-field">
            <span>English level</span>
            <select
              name="englishLevel"
              value={profile.englishLevel}
              onChange={updateProfileField}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <small>We show tests at this level first.</small>
          </label>

          <label className="profile-field profile-weekly-goal">
            <span>Weekly goal</span>
            <select
              name="weeklyGoal"
              value={profile.weeklyGoal}
              onChange={updateProfileField}
            >
              <option value="1">1 test a week</option>
              <option value="2">2 tests a week</option>
              <option value="3">3 tests a week</option>
              <option value="5">5 tests a week</option>
              <option value="7">7 tests a week</option>
            </select>
          </label>
        </div>

        <div className="profile-card-actions">
          <button type="submit" className="profile-primary-button">
            Save changes
          </button>
        </div>
      </form>

      <form className="profile-card password-card" onSubmit={updatePassword}>
        <h2 className="profile-section-title">
          <LockKeyhole size={18} />
          Change password
        </h2>

        <div className="password-fields">
          <label className="profile-field">
            <span>Current password</span>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={updatePasswordField}
              placeholder="Current password"
              autoComplete="current-password"
              required
            />
          </label>

          <label className="profile-field">
            <span>New password</span>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={updatePasswordField}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
        </div>

        <div className="profile-card-actions">
          <button type="submit" className="profile-outline-button">
            Update password
          </button>
        </div>
      </form>

      <section className="profile-card preferences-card">
        <h2>Preferences</h2>

        <PreferenceRow
          title="Email me my results"
          description="A summary after every test"
          checked={preferences.emailResults}
          onChange={() => togglePreference("emailResults")}
        />

        <PreferenceRow
          title="Daily practice reminder"
          description="One reminder at 6 pm"
          checked={preferences.dailyReminder}
          onChange={() => togglePreference("dailyReminder")}
        />

        <PreferenceRow
          title="Show transcripts with results"
          description="See what we heard for each answer"
          checked={preferences.transcripts}
          onChange={() => togglePreference("transcripts")}
        />
      </section>
    </main>
  );
}

function PreferenceRow({ title, description, checked, onChange }) {
  return (
    <div className="profile-preference-row">
      <div className="profile-preference-text">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <button
        type="button"
        className={`profile-toggle ${checked ? "is-on" : ""}`}
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={onChange}
      >
        <span />
      </button>
    </div>
  );
}
