import React from "react";
import { Link } from "react-router-dom";
import "./OrgSideBar.less";

function OrgSideBar({ customClass = "" }) {
  return (
    <aside className={`jd-org-sidebar ${customClass}`}>
      <nav className="jd-org-sidebar-nav">
        <ul className="jd-org-sidebar-list">
          <li className="jd-org-sidebar-item">
            <Link to="/dashboard" className="jd-org-sidebar-link">
              <i className="jd-org-sidebar-icon jd-icon-dashboard">🏠</i>
              <span className="jd-org-sidebar-text">Dashboard</span>
            </Link>
          </li>
          <li className="jd-org-sidebar-item">
            <Link to="/tasks" className="jd-org-sidebar-link">
              <i className="jd-org-sidebar-icon jd-icon-tasks">📋</i>
              <span className="jd-org-sidebar-text">Tasks</span>
            </Link>
          </li>
          <li className="jd-org-sidebar-item">
            <Link to="/reports" className="jd-org-sidebar-link">
              <i className="jd-org-sidebar-icon jd-icon-reports">📊</i>
              <span className="jd-org-sidebar-text">Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default OrgSideBar;
