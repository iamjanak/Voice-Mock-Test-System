
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  UserRound,
  LogOut,
  Mic,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Mock Tests",
    path: "/student/mock-tests",
    icon: ClipboardList,
  },
  {
    label: "My Results",
    path: "/student/results",
    icon: BarChart3,
  },
  {
    label: "My Profile",
    path: "/student/profile",
    icon: UserRound,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Mic size={23} />
        </span>

        <div>
          <h2>Voice Mock Test</h2>
          <p>Speaking practice</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Student navigation">
        <p className="sidebar-section-title">MENU</p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} aria-hidden="true" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
