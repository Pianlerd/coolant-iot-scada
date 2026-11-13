import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
const router = Router();
const SECRET = 'coolant-iot-scada-2026-nrct';
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.findUser(username);
  if (!user || user.password !== password) return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role, station: user.station, name: user.name }, SECRET, { expiresIn: '24h' });
  db.addAuditLog({ event: 'login', description: 'เข้าสู่ระบบสำเร็จ', user: user.name, ip: req.ip, status: 'Authorized' });
  res.json({ token, user: { id: user.id, username: user.username, name: user.name, role: user.role, station: user.station, email: user.email, phone: user.phone } });
});
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'ไม่มี token' });
  try { res.json({ user: jwt.verify(token, SECRET) }); } catch { res.status(401).json({ error: 'Token ไม่ถูกต้อง' }); }
});
export { router, SECRET };
