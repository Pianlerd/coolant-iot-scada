import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
router.get('/machines', (req, res) => res.json(db.getMachines()));
router.get('/current/:machineId', (req, res) => {
  const t = db.getCurrent(req.params.machineId);
  if (!t) return res.status(404).json({ error: 'ไม่พบข้อมูล' });
  res.json({ ...t, thresholds: db.getThresholds(req.params.machineId), machine: db.getMachine(req.params.machineId) });
});
router.get('/history/:machineId', (req, res) => res.json(db.getTelemetry(req.params.machineId, parseInt(req.query.limit) || 50)));
router.post('/simulate', (req, res) => {
  const { machine_id } = req.body;
  const last = db.getCurrent(machine_id);
  const nl = Math.max(0, Math.min(100, (last?.level_percent || 78) + (Math.random() - 0.5) * 2));
  const np = Math.max(6.0, Math.min(9.0, (last?.ph || 7.28) + (Math.random() - 0.5) * 0.1));
  const rec = db.addTelemetry({ machine_id, timestamp: new Date().toISOString(), level_percent: +nl.toFixed(2), level_liters: +(nl * 1.2).toFixed(2), ph: +np.toFixed(2), temperature: +(24 + Math.random() * 2).toFixed(1), raw_adc_level: Math.floor(3000 + nl * 30), raw_mv_ph: Math.floor(150 + np * 3), status: nl < 30 ? 'WARNING' : 'NORMAL', rssi: -58, packet_loss: 0.0, crc: '0x' + Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase(), payload_size: 342, tier: 'PROCESSED' });
  res.json(rec);
});
export default router;
