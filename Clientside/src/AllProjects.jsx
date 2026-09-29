import { React } from "react";
import { Outlet, Link } from "react-router-dom";

function AllProjects() {
  const defaultProject = 1001;

  return (
    <div>
      <Link to={`/projects/${defaultProject}`}>First Project</Link>
    </div>
  );
}

export default AllProjects;
