<<<<<<< HEAD

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
=======
export default function StudentLayout({ children }) {
  return <>{children}</>
>>>>>>> 4e3956b564cfbe5c5f465f97057ee96081f8f6a2
}
