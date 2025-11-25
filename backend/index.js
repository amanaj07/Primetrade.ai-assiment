require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

// Allow cross-origin requests from the frontend during development
app.use(cors({ origin: true, credentials: true }));
// Log incoming requests to help debug network issues from the browser
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/', (req, res) => res.json({ status: 'ok' }));

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    console.log('Register attempt for', email);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name } });
    const token = generateToken(user);
    console.log('Registered user', user.id);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, email: true, name: true } });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/profile', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.update({ where: { id: req.userId }, data: { name } });
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Notes - sample entity CRUD
app.get('/api/notes', authMiddleware, async (req, res) => {
  const q = req.query.q || '';
  try {
    const notes = await prisma.note.findMany({ where: { authorId: req.userId, OR: [{ title: { contains: q } }, { content: { contains: q } }] }, orderBy: { updatedAt: 'desc' } });
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/notes', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  try {
    const note = await prisma.note.create({ data: { title, content, authorId: req.userId } });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/notes/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.authorId !== req.userId) return res.status(404).json({ error: 'Not found' });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/notes/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.authorId !== req.userId) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.note.update({ where: { id }, data: { title, content } });
    res.json({ note: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/notes/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.authorId !== req.userId) return res.status(404).json({ error: 'Not found' });
    await prisma.note.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
