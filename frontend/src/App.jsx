<<<<<<< HEAD

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/common/Login.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import MockTests from "./pages/student/MockTests.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";

function SimplePage({ title, description }) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-card">
        <h1>{title}</h1>
        <p>{description}</p>
        <a className="text-link" href="/student/dashboard">
          Return to dashboard
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
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

      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="mock-tests" element={<MockTests />} />

        <Route
          path="results"
          element={
            <SimplePage
              title="My Results"
              description="Your completed mock test results will appear here."
            />
          }
        />

        <Route
          path="profile"
          element={
            <SimplePage
              title="My Profile"
              description="Your profile information will appear here."
            />
          }
        />

        <Route
          path="tests/:id/instructions"
          element={
            <SimplePage
              title="Test Instructions"
              description="Instructions for your selected speaking test will appear here."
            />
          }
        />

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

      <Route
        path="/admin/dashboard"
        element={
          <SimplePage
            title="Admin Dashboard"
            description="The admin dashboard is under development."
          />
        }
      />

      <Route
        path="*"
        element={<Navigate to="/student/dashboard" replace />}
      />
    </Routes>
  );
}
=======
import Home from './pages/common/Home.jsx'
import './styles/global.css'

export default function App() {
  return <Home />
}
>>>>>>> 4e3956b564cfbe5c5f465f97057ee96081f8f6a2
