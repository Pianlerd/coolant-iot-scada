import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
router.get('/', (req, res) => res.json(db.getMaintenance(req.query.machine_id)));
router.post('/', (req, res) => res.json(db.addMaintenance(req.body)));
export default router;
