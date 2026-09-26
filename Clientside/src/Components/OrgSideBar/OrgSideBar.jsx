import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./OrgSideBar.less";

function OrgSideBar({ customClass = "" }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`jd-org-sidebar ${customClass}`.trim()}>
      <nav className="jd-org-sidebar-nav">
        <ul className="jd-org-sidebar-list">
          <li className="jd-org-sidebar-item">
            <Link
              to="/dashboard"
              className={`jd-org-sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
            >
              <span className="jd-org-sidebar-content-wrapper">
                <span className="jd-org-sidebar-text">Dashboard</span>
              </span>
              <span className="jd-org-sidebar-indicator"></span>
            </Link>
          </li>
          <li className="jd-org-sidebar-item">
            <Link
              to="/tasks"
              className={`jd-org-sidebar-link ${isActive("/tasks") ? "active" : ""}`}
            >
              <span className="jd-org-sidebar-content-wrapper">
                <span className="jd-org-sidebar-text">Tasks</span>
              </span>
              <span className="jd-org-sidebar-indicator"></span>
            </Link>
          </li>
          <li className="jd-org-sidebar-item">
            <Link
              to="/reports"
              className={`jd-org-sidebar-link ${isActive("/reports") ? "active" : ""}`}
            >
              <span className="jd-org-sidebar-content-wrapper">
                <span className="jd-org-sidebar-text">Reports</span>
              </span>
              <span className="jd-org-sidebar-indicator"></span>
            </Link>
          </li>
          <li className="jd-org-sidebar-item">
            <Link
              to="/documents"
              className={`jd-org-sidebar-link ${isActive("/documents") ? "active" : ""}`}
            >
              <span className="jd-org-sidebar-content-wrapper">
                <span className="jd-org-sidebar-text">Documents</span>
              </span>
              <span className="jd-org-sidebar-indicator"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default OrgSideBar;
