
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/common/Login.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import MockTests from "./pages/student/MockTests.jsx";
import MyResults from "./pages/student/Results.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import Profile from "./pages/student/Profile.jsx";
import TestInstructions from "./pages/student/TestInstructions.jsx";

function SimplePage({ title, description }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-card">
        <h1>{title}</h1>
        <p>{description}</p>

        <button
          type="button"
          className="text-link"
          onClick={() => {
            window.location.href = "/student/dashboard";
          }}
        >
          Return to dashboard
        </button>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/forgot-password"
        element={
          <SimplePage
            title="Forgot password?"
            description="Password reset will be connected to your backend."
          />
        }
      />

      {/* Student pages share one sidebar layout */}
      <Route path="/student" element={<StudentLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="mock-tests"
          element={<MockTests />}
        />

        <Route
          path="results"
          element={<MyResults />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        {/* Test instructions page */}
        <Route
          path="tests/:id/instructions"
          element={<TestInstructions />}
        />

        {/* Speaking test page */}
        <Route
          path="tests/:id/speaking"
          element={
            <SimplePage
              title="Speaking Test"
              description="Your speaking test interface will appear here."
            />
          }
        />
      </Route>

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <SimplePage
            title="Admin Dashboard"
            description="The admin dashboard is under development."
          />
        }
      />

      {/* Unknown URLs */}
      <Route
        path="*"
        element={<Navigate to="/student/dashboard" replace />}
      />
    </Routes>
  );
}
