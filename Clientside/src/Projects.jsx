import { React } from "react";
import { Outlet, useParams } from "react-router-dom";
import OrgTopBar from "./Components/OrgTopBar/OrgTopBar";
import OrgSideBar from "./Components/OrgSideBar/OrgSideBar";
import './Projects.less'


function Projects() {
  const { projectId } = useParams();
  console.log(projectId);

  return (
    <>
      <div className="jd-app-full-outer-container">
        <div className="jd-app-topbar-container">
          <OrgTopBar></OrgTopBar>
        </div>
        <section className="jd-app-main-container">
          <section className="jd-app-sidebar-container">
            <OrgSideBar></OrgSideBar>
          </section>
          <main className="jd-app-content-container">
            <Outlet></Outlet>
          </main>
        </section>
      </div>
    </>
  );
}

export default Projects;
