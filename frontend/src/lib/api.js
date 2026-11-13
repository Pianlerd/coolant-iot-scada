const MOCK_DB = {
  users: [
    { id: "EN-2024-0492", username: "somchai.k", password: "admin123", name: "สมชาย เก่งกล้า", role: "ADMIN", station: "L05" },
    { id: "OP-2024-0156", username: "operator", password: "operator123", name: "โอปอล วงศ์สุวรรณ", role: "OPERATOR", station: "L05" }
  ],
  machines: [
    { id: "L05", name: "CNC 5-Axis Milling", tank_capacity: 120, coolant_type: "Castrol Hysol X (8% Con.)", esp32_id: "ESP32-L05", ip: "192.168.10.105", status: "ONLINE" },
    { id: "L02", name: "CNC Milling Centre", tank_capacity: 100, coolant_type: "Semi-synthetic MQL", esp32_id: "ESP32-L02", ip: "192.168.10.102", status: "ONLINE" },
    { id: "L06", name: "CNC High-Speed Lathe", tank_capacity: 80, coolant_type: "Castrol Hysol X", esp32_id: "ESP32-L06", ip: "192.168.10.106", status: "STANDBY" }
  ],
  telemetry: {
    L05: { id: "PKT-L05-88492", machine_id: "L05", timestamp: new Date().toISOString(), level_percent: 78.0, level_liters: 93.6, ph: 7.28, temperature: 24.6, raw_adc_level: 3236, raw_mv_ph: 174.2, status: "NORMAL", rssi: -58, packet_loss: 0.0, crc: "0x8FE4A1", payload_size: 342, tier: "PROCESSED" },
    L02: { id: "PKT-L02-77201", machine_id: "L02", timestamp: new Date().toISOString(), level_percent: 82.0, level_liters: 82.0, ph: 7.40, temperature: 25.1, raw_adc_level: 3350, raw_mv_ph: 178.5, status: "NORMAL", rssi: -55, packet_loss: 0.0, crc: "0x3A2B1C", payload_size: 342, tier: "PROCESSED" },
    L06: { id: "PKT-L06-55100", machine_id: "L06", timestamp: new Date().toISOString(), level_percent: 75.0, level_liters: 60.0, ph: 7.35, temperature: 24.8, raw_adc_level: 3100, raw_mv_ph: 175.0, status: "NORMAL", rssi: -60, packet_loss: 0.0, crc: "0x7D4E2F", payload_size: 342, tier: "PROCESSED" }
  },
  alerts: [
    { id: "ALT-2026-089", machine_id: "L05", type: "CRITICAL", title: "ระดับน้ำหล่อเย็นลดลงเร็วกว่าปกติ (Rapid Coolant Level Drop)", description: "เซนเซอร์อัลตราโซนิกตรวจพบการลดระดับผิดปกติที่อัตรา -4.2% ต่อชั่วโมง", level_before: 82.0, level_after: 78.0, ph: 7.28, timestamp: "2026-11-12T09:30:00.000Z", status: "PENDING", acknowledged: false, leak_rate: -4.2, priority: 1 },
    { id: "ALT-2026-085", machine_id: "L02", type: "WARNING", title: "ค่า pH ลดลงใกล้ขอบเขตล่าง (pH Degradation)", description: "สารหล่อเย็นเริ่มเกิดแบคทีเรียสะสม ส่งผลให้ค่า pH ตกเหลือ 7.05", level_before: 88.5, level_after: 88.5, ph: 7.05, timestamp: "2026-11-12T08:15:00.000Z", status: "IN_PROGRESS", acknowledged: true, responsible: "สมชาย เก่งกล้า" },
    { id: "ALT-2026-079", machine_id: "L05", type: "INFO", title: "อุณหภูมิน้ำหล่อเย็นสูงเกิน 32°C", description: "แก้ไขโดย: กฤษดา อานามนต์", level_before: 75.0, level_after: 75.0, ph: 7.30, timestamp: "2026-11-11T08:45:00.000Z", status: "RESOLVED", acknowledged: true, resolved_by: "กฤษดา อานามนต์" }
  ],
  maintenance: [
    { id: "REC-2026-104", machine_id: "L05", type: "Coolant Refill", description: "ขันยึดข้อต่อสายส่งน้ำ + เติม Castrol Hysol X (+16.8L)", technician: "สมชาย เก่งกล้า", timestamp: "2026-11-12T10:45:00.000Z", level_before: 78.0, level_after: 92.0, ph_before: 7.28, ph_after: 7.35, volume_added: 16.8, status: "COMPLETED" },
    { id: "REC-2026-103", machine_id: "L02", type: "pH Inspection", description: "ตรวจสอบค่า pH และเติมสารไบโอไซด์", technician: "วีระชัย บุญส่ง", timestamp: "2026-11-11T16:30:00.000Z", level_before: 88.5, level_after: 88.5, ph_before: 7.15, ph_after: 7.30, volume_added: 0, status: "COMPLETED" },
    { id: "REC-2026-102", machine_id: "L05", type: "Joint Clamp Check", description: "ตรวจสอบรอยซึมข้อต่อสายยางฝั่งขวา", technician: "สมชาย เก่งกล้า", timestamp: "2026-11-11T09:15:00.000Z", level_before: 79.5, level_after: 78.0, ph_before: 7.28, ph_after: 7.28, volume_added: 0, status: "MONITORING" },
    { id: "REC-2026-101", machine_id: "L01", type: "Sensor Calibration", description: "คาริเบรตเซนเซอร์ระดับและ pH", technician: "อนันต์ ศรีสุข", timestamp: "2026-11-10T14:00:00.000Z", level_before: 85.0, level_after: 85.0, ph_before: 7.02, ph_after: 7.20, volume_added: 0, status: "COMPLETED" },
    { id: "REC-2026-100", machine_id: "L06", type: "Coolant Refill", description: "เติมน้ำหล่อเย็น +20.0L", technician: "วีระชัย บุญส่ง", timestamp: "2026-11-09T11:20:00.000Z", level_before: 72.0, level_after: 90.0, ph_before: 7.30, ph_after: 7.32, volume_added: 20.0, status: "COMPLETED" },
    { id: "REC-2026-099", machine_id: "L02", type: "Coolant Replacement", description: "เปลี่ยนน้ำหล่อเย็นทั้งระบบ Flush 100L", technician: "สมชาย เก่งกล้า", timestamp: "2026-11-08T08:30:00.000Z", level_before: 42.0, level_after: 95.0, ph_before: 6.85, ph_after: 7.40, volume_added: 100, status: "COMPLETED" }
  ],
  thresholds: { L05: { level_critical: 15.0, level_warning: 30.0, level_normal_min: 30.0, level_normal_max: 85.0, level_high: 85.0, ph_min: 7.00, ph_max: 8.50, ph_target_min: 7.20, ph_target_max: 8.30, leak_rate_threshold: 3.0, stale_timeout: 15.0, offline_timeout: 30.0, ma_window: 6, siren_enabled: true, web_notification: true, repeat_alert_minutes: 10 } }
};
export const api = {
  getToken: () => localStorage.getItem('coolant_token'),
  setToken: (t) => localStorage.setItem('coolant_token', t),
  clearToken: () => localStorage.removeItem('coolant_token'),
  login: (username, password) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_DB.users.find(u => u.username === username && u.password === password);
      if (user) resolve({ token: 'mock-' + Date.now(), user: { ...user, password: undefined } });
      else reject(new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'));
    }, 500);
  }),
  getMe: () => Promise.resolve({ user: { id: "EN-2024-0492", username: "somchai.k", name: "สมชาย เก่งกล้า", role: "ADMIN", station: "L05" } }),
  getMachines: () => Promise.resolve(MOCK_DB.machines),
  getCurrent: (id) => Promise.resolve({ ...MOCK_DB.telemetry[id], machine: MOCK_DB.machines.find(m => m.id === id), thresholds: MOCK_DB.thresholds[id] || MOCK_DB.thresholds.L05 }),
  getHistory: (id, limit = 20) => { const h = []; for (let i = 0; i < limit; i++) h.push({ id: `PKT-${id}-${88492 - i}`, machine_id: id, timestamp: new Date(Date.now() - i * 5000).toISOString(), level_percent: +(78 + Math.random() * 2).toFixed(2), ph: +(7.28 + (Math.random() - 0.5) * 0.1).toFixed(2), temperature: +(24.6 + Math.random()).toFixed(1), raw_adc_level: 3236, raw_mv_ph: 174.2, status: "NORMAL", tier: "PROCESSED", crc: '0x' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0'), payload_size: 342 }); return Promise.resolve(h); },
  simulate: (id) => { const t = MOCK_DB.telemetry[id]; t.level_percent = +Math.max(0, Math.min(100, t.level_percent + (Math.random() - 0.5) * 2)).toFixed(2); t.ph = +Math.max(6, Math.min(9, t.ph + (Math.random() - 0.5) * 0.1)).toFixed(2); return Promise.resolve(t); },
  getAlerts: (s) => Promise.resolve(s ? MOCK_DB.alerts.filter(a => a.status === s) : MOCK_DB.alerts),
  ackAlert: (id) => { const a = MOCK_DB.alerts.find(x => x.id === id); if (a) a.status = 'IN_PROGRESS'; return Promise.resolve(a); },
  getMaintenance: () => Promise.resolve(MOCK_DB.maintenance),
  addMaintenance: (d) => Promise.resolve({ ...d, id: `REC-2026-${Date.now()}`, timestamp: new Date().toISOString(), status: 'COMPLETED' }),
  getThresholds: (id) => Promise.resolve(MOCK_DB.thresholds[id] || MOCK_DB.thresholds.L05),
  updateThresholds: (id, d) => Promise.resolve({ ...MOCK_DB.thresholds[id], ...d })
};
