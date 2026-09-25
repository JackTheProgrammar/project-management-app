const express = require('express');
const cors = require('cors');
const fs = require("fs");

const app = express();
const PORT = 2001;

app.use(cors());
app.use(express.json()); // instead of bodyParser

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/getTasks', (req, res) => {
  var data = fs.readFileSync("./data/projects.json", "utf-8")
  var projects = JSON.parse(data);
  res.json({
    projects: projects
  })
})

app.get('/getTask/:id', (req, res) => {
  var reqId = req.params.id;
  var data = fs.readFileSync("./data/projects.json", "utf-8")
  var projects = JSON.parse(data);

  var singleProject = projects.find(project =>
    project.id == reqId
  );

  res.json({
      success: true,
      task: "This is your task data",
      project: singleProject
    });
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
