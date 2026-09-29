const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 2001;

app.use(cors());
app.use(express.json()); // instead of bodyParser

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/projects/:projectId/getTasks", (req, res) => {
  var data = fs.readFileSync("./data/tasks.json", "utf-8");
  var tasks = JSON.parse(data);

  var projectTasks = tasks.filter((task) => {
    if (task.projectId == req.params.projectId) {
      return task;
    }
  });
  res.json({
    success: true,
    tasks: projectTasks,
  });
});

app.get("/projects/:projectId/getTask/:taskId", (req, res) => {
  var { projectId, taskId } = req.params;
  var data = fs.readFileSync("./data/tasks.json", "utf-8");
  var tasks = JSON.parse(data);

  var singleTask = tasks.find((task) => {
    if (task.projectId == projectId && task.id == taskId) {
      return task;
    }
  });

  res.json({
    success: true,
    task: singleTask,
  });
});

app.post("/createTask", (req, res) => {
  var newTask = req.body;

  var data = fs.readFileSync("./data/tasks.json", "utf-8");
  var projects = JSON.parse(data);
  projects.push(newTask);

  fs.writeFileSync("./data/tasks.json", JSON.stringify(projects), "utf-8");
  res.json({
    success: true,
    task: projects,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
