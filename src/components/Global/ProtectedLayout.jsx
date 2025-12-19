import Sidebar from "../Global/Sidebar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;