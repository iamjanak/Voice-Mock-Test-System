
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <Sidebar />

      <div className="student-layout-content">
        <Outlet />
      </div>
    </div>
  );
}
