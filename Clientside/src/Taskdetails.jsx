import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Taskdetails.less";

function Taskdetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  useEffect(() => {
    fetch(
      `http://localhost:2003/projects/${params.projectId}/getTask/${params.taskId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTask(data.task);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch task details", err);
        setLoading(false);
      });
  }, [params.projectId, params.taskId]);

  function handleEditClick() {
    setEditName(task.taskName);
    setEditDesc(task.taskDesc || "");
    setEditPriority(task.taskPriority || "medium");
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  async function handleSave() {
    const updatedTask = {
      taskName: editName,
      taskDesc: editDesc,
      taskPriority: editPriority,
    };

    try {
      const response = await fetch(
        `http://localhost:2003/projects/${params.projectId}/updateTask/${params.taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        },
      )
      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        setTask(data.task);
        setIsEditing(false);
      } else {
        alert("Could not save task");
      }
    }
    catch (error) {
      console.error("Failed to save task", error);
      alert("Could not save task");
    }
  }

  if (loading) {
    return (
      <div className="task-detail-page">
        <div
          className="task-detail-card"
          style={{ textAlign: "center", padding: "64px 24px" }}
        >
          <p style={{ fontFamily: "Arial, sans-serif", color: "#687384" }}>
            Loading task details...
          </p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="task-detail-page">
        <div
          className="task-detail-card"
          style={{ textAlign: "center", padding: "64px 24px" }}
        >
          <h2>Task not found</h2>
          <button
            className="back-button"
            onClick={() => navigate(`/projects/${params.projectId}/tasks`)}
            style={{ marginTop: "16px" }}
          >
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
          <span className="task-detail-id">
            TASK #{String(task.id || "").padStart(2, "0")}
          </span>
          <div className="task-detail-header-actions">
            {!isEditing && (
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <button
              className="back-button"
              onClick={() => navigate(`/projects/${task.projectId}/tasks`)}
            >
              &larr; Return to Tasks
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="task-edit-form">
            <label htmlFor="edit-task-name">Task name</label>
            <input
              id="edit-task-name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <label htmlFor="edit-task-desc">Description</label>
            <textarea
              id="edit-task-desc"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              rows="4"
            />

            <label htmlFor="edit-task-priority">Priority</label>
            <select
              id="edit-task-priority"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="task-edit-buttons">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-detail-body">
              <h1>{task.taskName}</h1>

              <div className="task-section-group">
                <span className="task-detail-label">Description</span>
                <p>{task.taskDesc || "No description provided."}</p>
              </div>
            </div>

            <div className="task-detail-footer">
              <div className="task-section-group">
                <span className="task-detail-label">Priority Level</span>
              </div>
              <span
                className={`priority priority-${task.taskPriority || "medium"}`}
              >
                {task.taskPriority || "medium"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Taskdetails;
