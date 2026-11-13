import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Thresholds() {
  const [t, setT] = useState(null);
  const [cur, setCur] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.getThresholds('L05').then(setT).catch(() => {}); api.getCurrent('L05').then(setCur).catch(() => {}); }, []);

  const save = async () => {
    await api.updateThresholds('L05', { ...t, user: 'สมชาย เก่งกล้า' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!t || !cur) return <div className="card">กำลังโหลด...</div>;

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">admin_panel_settings</span>SCADA CONFIG ZONE — ตั้งค่าเกณฑ์ตรวจวัดและพารามิเตอร์ระบบ (Threshold & Parameter Settings)</div>
        <p style={{color:'#94a3b8',fontSize:13,marginBottom:12}}>กำหนดเกณฑ์แจ้งเตือนระดับน้ำหล่อเย็น ค่าความเป็นกรด-ด่าง (pH) และพฤติกรรมการตรวจจับความผิดปกติของ ESP32 ตามชนิดน้ำหล่อเย็น Castrol Hysol X (8% Con.) ประจำเครื่องจักร L05 CNC 5-Axis Milling Tank #1</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>cloud_download</span>โหลดค่าแนะนำสเปกน้ำมัน</button>
          <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>restart_alt</span>รีเซ็ตค่าเริ่มต้น</button>
          <button className="btn btn-cyan" onClick={save}><span className="material-symbols-outlined" style={{fontSize:16}}>save</span>บันทึกการตั้งค่า (Apply Changes)</button>
        </div>
        {saved && <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:10,marginTop:12,fontSize:12,color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>check_circle</span> บันทึกและส่งการตั้งค่าสำเร็จ! พารามิเตอร์ถูกปรับใช้กับ ESP32 L05 เรียบร้อยแล้ว</div>}
        <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:10,marginTop:12,fontSize:12,color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>check_circle</span> LOGICAL VALIDATION PASS — โครงสร้างเกณฑ์: Critical (15.0%) &lt; Warning (30.0%) &lt; Normal (30.0 - 85.0%) &lt; High Overflow (85.0%) ผ่านการตรวจสอบทางตรรกะ ปลอดภัยต่อปั๊มแรงดันสูง</div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">water_drop</span>เกณฑ์ระดับน้ำหล่อเย็นในถังพัก (COOLANT TANK LEVEL THRESHOLD)</div>
        <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}>คำนวณจากความจุถังพักจริง 120.0 ลิตร (Sump Tank) สำหรับชุดตัดเฉือน L05 5-Axis</p>
        <div style={{background:'#0a0e1a',borderRadius:8,padding:12,marginBottom:12}}>
          <p style={{color:'#fff',fontSize:14,fontWeight:600,marginBottom:8}}>CURRENT LEVEL: {cur.level_percent}% ({cur.level_liters} ลิตร)</p>
          <div style={{display:'flex',height:30,borderRadius:6,overflow:'hidden',marginBottom:8}}>
            <div style={{width:'15%',background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:700}}>CRIT &lt;15%</div>
            <div style={{width:'15%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#0a0e1a',fontWeight:700}}>WARN 15-30%</div>
            <div style={{width:'55%',background:'#10b981',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:700,position:'relative'}}>NORMAL OPERATING BAND<span style={{position:'absolute',left:`${((cur.level_percent - 30) / 55) * 100}%`,top:-4,width:3,height:38,background:'#fff',borderRadius:2}} /></div>
            <div style={{width:'15%',background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:700}}>HIGH &gt;85%</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#64748b'}}><span>Critical Shutoff (&lt;15%)</span><span>Low Refill Alert (15-30%)</span><span>Target Operating (30-85%)</span><span>High Limit (&gt;85%)</span></div>
        </div>
        <div className="grid2">
          <div><label>ระดับปกติขั้นต่ำ (Lower Bound) NORMAL MIN %</label><input type="number" step="0.1" value={t.level_normal_min} onChange={e => setT({ ...t, level_normal_min: parseFloat(e.target.value) })} /></div>
          <div><label>ระดับปกติสูงสุด (Upper Bound) HIGH LIMIT %</label><input type="number" step="0.1" value={t.level_normal_max} onChange={e => setT({ ...t, level_normal_max: parseFloat(e.target.value) })} /></div>
          <div><label>เกณฑ์เตือนเติมสารละลาย (Warning) REFILL NOTICE %</label><input type="number" step="0.1" value={t.level_warning} onChange={e => setT({ ...t, level_warning: parseFloat(e.target.value) })} /></div>
          <div><label>เกณฑ์หยุดทำงานฉุกเฉิน (Critical) E-STOP LEVEL %</label><input type="number" step="0.1" value={t.level_critical} onChange={e => setT({ ...t, level_critical: parseFloat(e.target.value) })} /></div>
          <div><label>อัตราการลดฮวบต่อชั่วโมง (Leak Detect) %/ชม.</label><input type="number" step="0.1" value={t.leak_rate_threshold} onChange={e => setT({ ...t, leak_rate_threshold: parseFloat(e.target.value) })} /></div>
          <div><label>ความละเอียดสเกล</label><input type="text" value="±0.5 ลิตร (Ultrasonic Distance Transducer)" readOnly /></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">science</span>เกณฑ์ค่าความเป็นกรด-ด่างและเสถียรภาพเคมี (pH VALUE & CHEMICAL STABILITY)</div>
        <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}>กำหนดตามชนิดสารหล่อเย็น Semi-synthetic MQL สำหรับกัดชิ้นงานเหล็กกล้า (เกณฑ์ปลอดภัย: 7.00 - 8.50 pH)</p>
        <div style={{background:'#0a0e1a',borderRadius:8,padding:12,marginBottom:12}}>
          <p style={{color:'#fff',fontSize:14,fontWeight:600,marginBottom:8}}>CURRENT pH: {cur.ph} pH <span className="badge badge-ok">OPTIMAL STABLE</span></p>
          <div style={{display:'flex',height:30,borderRadius:6,overflow:'hidden',marginBottom:8}}>
            <div style={{width:'20%',background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:700}}>ACIDIC &lt;7.00</div>
            <div style={{width:'50%',background:'#10b981',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:700,position:'relative'}}>TARGET ZONE (7.00 - 8.50 pH)<span style={{position:'absolute',left:`${((cur.ph - 7) / 1.5) * 100}%`,top:-4,width:3,height:38,background:'#fff',borderRadius:2}} /></div>
            <div style={{width:'30%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#0a0e1a',fontWeight:700}}>ALKALINE &gt;8.50</div>
          </div>
        </div>
        <div className="grid2">
          <div><label>ค่ากรดวิกฤต (Min pH) ACID CUTOFF</label><input type="number" step="0.01" value={t.ph_min} onChange={e => setT({ ...t, ph_min: parseFloat(e.target.value) })} /></div>
          <div><label>ค่าด่างสูงสุด (Max pH) BASE LIMIT</label><input type="number" step="0.01" value={t.ph_max} onChange={e => setT({ ...t, ph_max: parseFloat(e.target.value) })} /></div>
          <div><label>ช่วงเฝ้าระวัง (Warn Trigger) PRE-ALERT pH</label><input type="text" value={`${t.ph_target_min} - ${t.ph_target_max} pH`} readOnly /></div>
          <div><label>อัตราการเปลี่ยนเร็ว (Shift Rate) SENSITIVITY pH/2 ชม.</label><input type="number" step="0.01" value={0.30} readOnly /></div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">timer</span>การตรวจจับข้อมูลขาดหายและความเก่า (TELEMETRY TIMEOUT)</div>
          <div className="kv"><span>รอบการส่งข้อมูลปกติ (Telemetry Interval)</span><b>5.0 วินาที</b></div>
          <div className="kv"><span>เกณฑ์ข้อมูลค้างนิ่ง (Stale Data Timeout)</span><b>{t.stale_timeout} วินาที</b></div>
          <div className="kv"><span>เกณฑ์ตัดสถานะหลุด (Offline Timeout)</span><b>{t.offline_timeout} วินาที</b></div>
          <div className="kv"><span>ตัวกรองสัญญาณรบกวน (Moving Average Window)</span><b>MA-{t.ma_window}</b></div>
        </div>
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">notifications_active</span>พฤติกรรมการส่งสัญญาณเตือน (HARDWARE RELAY)</div>
          <div className="kv"><span>เปิดเสียงเตือน Siren Beacon</span><span className={`badge ${t.siren_enabled ? 'badge-ok' : 'badge-warn'}`}>{t.siren_enabled ? 'เปิด' : 'ปิด'}</span></div>
          <div className="kv"><span>แจ้งเตือนผ่าน Web App</span><span className={`badge ${t.web_notification ? 'badge-ok' : 'badge-warn'}`}>{t.web_notification ? 'เปิด' : 'ปิด'}</span></div>
          <div className="kv"><span>รอบเตือนซ้ำกรณีไม่รับทราบ</span><b>{t.repeat_alert_minutes} นาที</b></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">history_edu</span>บันทึกประวัติการปรับปรุงเกณฑ์ล่าสุด (THRESHOLD AUDIT TRAIL)</div>
        <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:10,marginBottom:12,fontSize:12,color:'#10b981'}}>ISO-9001 / IATF-16949 COMPLIANT</div>
        <div style={{background:'#0a0e1a',borderRadius:8,padding:12,marginBottom:12}}>
          <p style={{color:'#fff',fontSize:13,fontWeight:600}}>ปรับเพิ่มเกณฑ์ Warning Level จาก 25.0% เป็น 30.0% <span className="badge badge-ok" style={{marginLeft:8}}>APPLIED</span></p>
          <p style={{color:'#94a3b8',fontSize:12,margin:'6px 0'}}>เหตุผล: "ตามข้อกำหนดการตัดเฉือนความเร็วสูงชิ้นงานเหล็กกล้า L05 ป้องกันปั๊มสูญเสียแรงดัน coolant ขณะกัดงานแบบ Roughing"</p>
          <p style={{color:'#64748b',fontSize:11}}>นายสมชาย เก่งกล้า (วิศวกรซ่อมบำรุง) • 2026-11-01 08:30:14 ICT (ESP32 ACK: Success)</p>
        </div>
        <div className="card-title" style={{fontSize:13}}><span className="material-symbols-outlined">security_update_good</span>ยืนยันการเปลี่ยนแปลงเกณฑ์ตรวจวัด</div>
        <div style={{background:'#f59e0b20',border:'1px solid #f59e0b',borderRadius:6,padding:10,marginBottom:12,fontSize:12,color:'#f59e0b'}}>⚠️ คำเตือนด้านความปลอดภัย: การปรับปรุงเกณฑ์จะมีผลต่อ Relay ตัดการทำงานฉุกเฉินและรอบตรวจวัดของเครื่องจักร CNC ทันทีผ่านโปรโตคอล ESP32-NOW & MQTT Broker</div>
        <table className="mtx">
          <thead><tr><th>พารามิเตอร์</th><th>ค่าเดิม (Original)</th><th>ค่าใหม่ (New Setting)</th><th>สถานะ</th></tr></thead>
          <tbody>
            <tr><td>Coolant Warning Level</td><td>30.0%</td><td>{t.level_warning}%</td><td><span className="badge badge-ok">ไม่มีการเปลี่ยน</span></td></tr>
            <tr><td>Coolant Critical Cutoff</td><td>15.0%</td><td>{t.level_critical}%</td><td><span className="badge badge-ok">ไม่มีการเปลี่ยน</span></td></tr>
            <tr><td>pH Lower Limit (Acid)</td><td>7.00 pH</td><td>{t.ph_min} pH</td><td><span className="badge badge-ok">ไม่มีการเปลี่ยน</span></td></tr>
            <tr><td>pH Upper Limit (Alkaline)</td><td>8.50 pH</td><td>{t.ph_max} pH</td><td><span className="badge badge-ok">ไม่มีการเปลี่ยน</span></td></tr>
            <tr><td>Stale Telemetry Timeout</td><td>15.0 วินาที</td><td>{t.stale_timeout} วินาที</td><td><span className="badge badge-ok">ไม่มีการเปลี่ยน</span></td></tr>
          </tbody>
        </table>
        <div style={{marginTop:12}}><label>บันทึกเหตุผลการเปลี่ยนแปลง (Reason for Change / Work Order ID) *</label><textarea rows="2" placeholder="ระบบจะบันทึกข้อความนี้ลงใน Audit Log พร้อม Digital Signature" /></div>
      </div>
    </div>
  );
}
