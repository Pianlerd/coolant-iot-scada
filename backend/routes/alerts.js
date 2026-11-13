import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
router.get('/', (req, res) => res.json(db.getAlerts(req.query.status)));
router.post('/:id/acknowledge', (req, res) => { const a = db.ackAlert(req.params.id); if (!a) return res.status(404).json({ error: 'ไม่พบ' }); res.json(a); });
export default router;
