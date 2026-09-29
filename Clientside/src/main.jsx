import { React } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DashBoard from "./DashBoard";
import Tasks from "./Tasks";
import Taskdetails from "./Taskdetails";
import Projects from "./Projects";
import AllProjects from "./AllProjects";

import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/projects" replace />} />*/}
      <Route path="/" element={<AllProjects />} />
      <Route path="/projects/:projectId" element={<Projects />}>
        <Route index element={<Navigate to="tasks" replace />}></Route>
        <Route path="tasks" element={<Tasks />}></Route>
        <Route path="taskdetails/:taskId" element={<Taskdetails />}></Route>
      </Route>
      <Route path="dashboard" element={<DashBoard />}></Route>
    </Routes>
  </BrowserRouter>,
);
