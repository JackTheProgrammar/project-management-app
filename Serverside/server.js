const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 2003;

// Middleware
app.use(cors());
app.use(express.json()); // instead of bodyParser

const data = 10;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// testing purpose
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // In a real application, you would validate the user credentials
  // against a database or authentication service

  // For this example, we'll use a simple check
  if (email === 'arun@gmail.com' && password === '1234') {
    // Generate a simple token (in a real app, use JWT or similar)
    const token = 'simple-auth-token-12345';

    res.json({
      success: true,
      token,
      user: {
        email,
        name: 'arunkumar'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.get("/projects/:projectId/getTasks", (req, res) => {
  try {
    const data = fs.readFileSync("./data/tasks.json", "utf-8");
    const tasks = JSON.parse(data);

    const projectTasks = tasks.filter(task => task.projectId == req.params.projectId);

    res.json({
      success: true,
      tasks: projectTasks,
    });
  } catch (error) {
    console.error("Error reading tasks file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to read tasks data"
    });
  }
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

app.post("/projects/:projectId/createTask", (req, res) => {
  var projectId = req.params.projectId;
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

app.delete("/projects/:projectId/deleteTask/:taskId", (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const data = fs.readFileSync("./data/tasks.json", "utf-8");
    let projects = JSON.parse(data);

    // Filter out the task to delete
    const initialLength = projects.length;
    projects = projects.filter(task => !(task.projectId == projectId && task.id == taskId));

    if (projects.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    fs.writeFileSync("./data/tasks.json", JSON.stringify(projects), "utf-8");
    res.status(200).json({
      success: true,
      message: "Deleted",
      taskId: taskId,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete task"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
