import React from "react";
import {
  LayoutDashboard,
  Film,
  Tags,
  Star,
  Users,
  Settings,
  ArrowLeft,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cineraUser");
    navigate("/login");
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        {/* LOGO */}

        <div className="admin-logo">
          <span>CINERA</span>
          <small>ADMIN PANEL</small>
        </div>

        {/* NAVIGATION */}

        <nav className="admin-nav">

          <p className="admin-nav-label">
            MAIN MENU
          </p>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/movies"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Film size={19} />
            <span>Movies</span>
          </NavLink>

          <NavLink
            to="/admin/genres"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Tags size={19} />
            <span>Genres</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Star size={19} />
            <span>Reviews</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <Users size={19} />
            <span>Users</span>
          </NavLink>

        </nav>

        {/* BOTTOM */}

        <div className="admin-sidebar-bottom">

          <button
            className="admin-bottom-link"
            onClick={() =>
              navigate("/settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <button
            className="admin-bottom-link"
            onClick={() =>
              navigate("/")
            }
          >
            <ArrowLeft size={19} />
            <span>Back to CINERA</span>
          </button>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Sign Out</span>
          </button>

        </div>

      </aside>

      {/* CONTENT */}

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;