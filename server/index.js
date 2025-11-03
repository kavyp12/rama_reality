    const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const projectsFilePath = path.join(__dirname, 'projects.json');

// API Endpoint to get all projects
app.get('/api/projects', (req, res) => {
    fs.readFile(projectsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading project data');
        }
        res.json(JSON.parse(data));
    });
});

// API Endpoint to add a new project
app.post('/api/projects', (req, res) => {
    const newProject = req.body;

    fs.readFile(projectsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading project data');
        }

        const projectsData = JSON.parse(data);

        // Add a unique ID
        const allProjects = Object.values(projectsData).flatMap(category => category.projects);
        const maxId = allProjects.reduce((max, p) => p.id > max ? p.id : max, 0);
        newProject.id = maxId + 1;

        // Add the new project to the 'all' category
        // You can add more complex logic here to categorize it
        if (projectsData['all'] && projectsData['all'].projects) {
            projectsData['all'].projects.unshift(newProject); // Add to the top
        }

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving new project');
            }
            res.status(201).json(newProject);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});