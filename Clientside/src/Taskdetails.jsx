import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Taskdetails.less";

function Taskdetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:2001/getTask/" + params.taskId)
      .then((response) => response.json())
      .then((data) => {
        setTask(data.project);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch task details", err);
        setLoading(false);
      });
  }, [params.taskId]);

  if (loading) {
    return (
      <div className="task-detail-page">
        <div className="task-detail-card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <p style={{ fontFamily: "Arial, sans-serif", color: "#687384" }}>Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="task-detail-page">
        <div className="task-detail-card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <h2>Task not found</h2>
          <button className="back-button" onClick={() => navigate("/tasks")} style={{ marginTop: "16px" }}>
            &larr; Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-detail-page">
      <div className="task-detail-card">
        <div className="task-detail-header">
          <span className="task-detail-id">TASK #{String(task.id || "").padStart(2, "0")}</span>
          <button className="back-button" onClick={() => navigate("/tasks")}>
            &larr; Return to Tasks
          </button>
        </div>

        <div className="task-detail-body">
          <h1>{task.name}</h1>

          <div className="task-section-group">
            <span className="task-detail-label">Description</span>
            <p>{task.desc || "No description provided."}</p>
          </div>
        </div>

        <div className="task-detail-footer">
          <div className="task-section-group">
            <span className="task-detail-label">Priority Level</span>
          </div>
          <span className={`priority priority-${task.priority || "medium"}`}>
            {task.priority || "medium"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Taskdetails;
