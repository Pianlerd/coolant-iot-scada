import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, 'data', 'database.json');
export const db = {
  read: () => JSON.parse(readFileSync(DB_PATH, 'utf-8')),
  write: (d) => writeFileSync(DB_PATH, JSON.stringify(d, null, 2)),
  findUser: (u) => db.read().users.find(x => x.username === u),
  getMachines: () => db.read().machines,
  getMachine: (id) => db.read().machines.find(m => m.id === id),
  getTelemetry: (mid, limit = 50) => db.read().telemetry.filter(t => !mid || t.machine_id === mid).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit),
  getCurrent: (mid) => db.read().telemetry.filter(t => t.machine_id === mid).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))[0],
  addTelemetry: (r) => { const d = db.read(); r.id = `PKT-${r.machine_id}-${Date.now()}`; d.telemetry.push(r); if (d.telemetry.length > 500) d.telemetry = d.telemetry.slice(-500); db.write(d); return r; },
  getAlerts: (s) => { let a = db.read().alerts.sort((x,y) => new Date(y.timestamp) - new Date(x.timestamp)); return s ? a.filter(x => x.status === s) : a; },
  ackAlert: (id) => { const d = db.read(); const a = d.alerts.find(x => x.id === id); if (a) { a.acknowledged = true; a.status = 'IN_PROGRESS'; db.write(d); } return a; },
  getMaintenance: (mid) => { let r = db.read().maintenance.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)); return mid ? r.filter(x => x.machine_id === mid) : r; },
  addMaintenance: (r) => { const d = db.read(); r.id = `REC-${new Date().getFullYear()}-${String(d.maintenance.length + 1).padStart(3, '0')}`; r.timestamp = new Date().toISOString(); d.maintenance.push(r); db.write(d); return r; },
  getThresholds: (mid) => db.read().thresholds[mid] || db.read().thresholds.L05,
  updateThresholds: (mid, t) => { const d = db.read(); d.thresholds[mid] = t; db.write(d); return t; },
  getAuditLog: () => db.read().audit_log.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)),
  addAuditLog: (e) => { const d = db.read(); d.audit_log.push({...e, timestamp: new Date().toISOString()}); db.write(d); return e; }
};
