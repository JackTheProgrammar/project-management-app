import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./tasks.less";

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [openTaskSection, setopenTaskSection] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:2001/projects/${projectId}/getTasks/`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  }, []);

  function addTask() {
    let newtask = {
      id: tasks.length + 1,
      projectId: Number(projectId),
      taskName: taskName,
      taskDesc: taskDesc,
      taskPriority: taskPriority,
    };
    setTasks([...tasks, newtask]);
    fetch("http://localhost:2001/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setTaskName("");
    setTaskDesc("");
    setTaskPriority("");
    closeSection();
  }

  function createTask() {
    setopenTaskSection(true);
  }

  function closeSection() {
    setopenTaskSection(false);
  }

  function openDetailsPage(element) {
    navigate(`/projects/${projectId}/taskdetails/${element}`);
  }
  return (
    <main className="tasks-page">
      <section className="tasks-panel">
        <div className="tasks-panel-header">
          <div>
            <p className="tasks-panel-eyebrow">Project workspace</p>
            <h1>Tasks</h1>
          </div>
          <span className="tasks-panel-count">{tasks.length} total</span>
        </div>
        <ul className="task-list">
          {tasks.map((data) => (
            <li
              className="task-list-item"
              key={data.id}
              onClick={() => openDetailsPage(data.id)}
            >
              <div className="task-list-number">
                {String(data.id).padStart(2, "0")}
              </div>
              <div className="task-list-content">
                <h2>{data.taskName}</h2>
                <p>{data.taskDesc}</p>
              </div>
              <span
                className={`priority priority-${data.taskPriority || "medium"}`}
              >
                {data.taskPriority || "medium"}
              </span>
            </li>
          ))}
        </ul>
        <button className="button button-primary" onClick={createTask}>
          + Create task
        </button>
      </section>
      {openTaskSection && (
        <section className="task-form" aria-label="Create a new task">
          <div className="task-form-header">
            <div>
              <p className="tasks-panel-eyebrow">Add to your board</p>
              <h2>New task</h2>
            </div>
            <button
              className="task-form-close"
              type="button"
              onClick={closeSection}
              aria-label="Close form"
            >
              &times;
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <label htmlFor="task-name">Task name</label>
            <input
              id="task-name"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g. Polish dashboard"
              required
            />
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="What needs to be done?"
              rows="3"
              required
            />
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              required
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="button button-secondary">Add task</button>
          </form>
        </section>
      )}
      <Outlet />
    </main>
  );
}

export default Tasks;
