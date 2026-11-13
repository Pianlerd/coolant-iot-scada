import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
router.get('/:machineId', (req, res) => res.json(db.getThresholds(req.params.machineId)));
router.post('/:machineId', (req, res) => { db.addAuditLog({ event: 'threshold', description: 'ปรับเกณฑ์แจ้งเตือน', user: req.body.user || 'system', ip: req.ip, status: 'Updated' }); res.json(db.updateThresholds(req.params.machineId, req.body)); });
export default router;
