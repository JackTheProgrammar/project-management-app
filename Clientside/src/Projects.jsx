import React from "react";
import OrgTopBar from "./Components/OrgTopBar/OrgTopBar";
import OrgSideBar from "./Components/OrgSideBar/OrgSideBar";

function Projects() {
  return (
    <>
      <div className="jd-app-full-outer-container">
        <div className="jd-app-topbar-container">
          <OrgTopBar></OrgTopBar>
        </div>
        <div className="jd-app-sidebar-container">
          <OrgSideBar></OrgSideBar>
        </div>
      </div>
    </>
  );
}

export default Projects;
