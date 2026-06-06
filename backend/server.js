const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Serve frontend static files in production
const FRONTEND_DIST = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
}

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ roles: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all roles
app.get('/api/roles', (_req, res) => {
  res.json(readDB().roles);
});

// POST create role
app.post('/api/roles', (req, res) => {
  const { title, department, level, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  const db = readDB();
  const role = {
    id: uuidv4(),
    title,
    department: department || '',
    level: level || '',
    priority: priority || 'Medium',
    currentStage: 1,
    stageNotes: {},
    candidateName: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.roles.push(role);
  writeDB(db);
  res.status(201).json(role);
});

// PUT update role (stage, notes, candidate, etc.)
app.put('/api/roles/:id', (req, res) => {
  const db = readDB();
  const idx = db.roles.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Role not found' });

  db.roles[idx] = {
    ...db.roles[idx],
    ...req.body,
    id: db.roles[idx].id,
    updatedAt: new Date().toISOString(),
  };
  writeDB(db);
  res.json(db.roles[idx]);
});

// DELETE role
app.delete('/api/roles/:id', (req, res) => {
  const db = readDB();
  const exists = db.roles.some(r => r.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'Role not found' });

  db.roles = db.roles.filter(r => r.id !== req.params.id);
  writeDB(db);
  res.status(204).end();
});

// For any non-API route, serve the frontend
if (fs.existsSync(FRONTEND_DIST)) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HIQ Hiring API → http://localhost:${PORT}`);
});
