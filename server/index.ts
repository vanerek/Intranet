import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db, seedIfEmpty } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

seedIfEmpty();

app.get('/api/announcements', (req, res) => {
  const { category, limit } = req.query;
  let sql = 'SELECT * FROM announcements';
  const params: unknown[] = [];
  if (category && category !== 'all') {
    sql += ' WHERE category = ?';
    params.push(category);
  }
  sql += ' ORDER BY pinned DESC, date DESC';
  if (limit) {
    sql += ' LIMIT ?';
    params.push(Number(limit));
  }
  res.json(db.prepare(sql).all(...params));
});

app.get('/api/announcements/categories', (_req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM announcements ORDER BY category').all() as { category: string }[];
  res.json(rows.map((r) => r.category));
});

app.get('/api/events', (req, res) => {
  const limit = Number(req.query.limit ?? 20);
  res.json(
    db
      .prepare("SELECT * FROM events WHERE date >= date('now') ORDER BY date LIMIT ?")
      .all(limit)
  );
});

app.get('/api/employees', (req, res) => {
  const { q, department } = req.query;
  let sql = 'SELECT * FROM employees WHERE 1=1';
  const params: unknown[] = [];
  if (q) {
    sql += ' AND (name LIKE ? OR position LIKE ? OR email LIKE ?)';
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (department && department !== 'all') {
    sql += ' AND department = ?';
    params.push(department);
  }
  sql += ' ORDER BY name';
  res.json(db.prepare(sql).all(...params));
});

app.get('/api/employees/departments', (_req, res) => {
  const rows = db.prepare('SELECT DISTINCT department FROM employees ORDER BY department').all() as { department: string }[];
  res.json(rows.map((r) => r.department));
});

app.get('/api/links', (_req, res) => {
  res.json(db.prepare('SELECT * FROM links ORDER BY category, id').all());
});

app.get('/api/canteen', (_req, res) => {
  const rows = db.prepare('SELECT * FROM canteen ORDER BY day').all() as { day: number; soup: string; mains: string }[];
  res.json(rows.map((r) => ({ ...r, mains: JSON.parse(r.mains) as string[] })));
});

// V produkci servíruje sestavený frontend z dist/
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`API server běží na http://localhost:${port}`);
});
