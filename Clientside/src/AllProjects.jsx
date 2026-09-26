import { React } from "react";
import { Outlet, Link } from "react-router-dom";

function AllProjects() {
  const defaultProject = 1;

  return (
    <div>
      <Link to={`/projects/${defaultProject}`}>Default Project</Link>
    </div>
  );
}

export default AllProjects;
