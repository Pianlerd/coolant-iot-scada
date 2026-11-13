import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Analysis() {
  const [hist, setHist] = useState([]);
  useEffect(() => { api.getHistory('L05', 20).then(h => setHist(h.reverse())).catch(() => {}); }, []);
  const lv = hist.map(h => h.level_percent), ph = hist.map(h => h.ph), tp = hist.map(h => h.temperature);
  const stat = (arr) => arr.length ? { min: Math.min(...arr).toFixed(2), max: Math.max(...arr).toFixed(2), avg: (arr.reduce((a,b) => a+b, 0) / arr.length).toFixed(2) } : { min: '-', max: '-', avg: '-' };
  const S = { level: stat(lv), ph: stat(ph), temp: stat(tp) };

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">analytics</span>Coolant Analysis: L05 · CNC 5-AXIS — วิเคราะห์แนวโน้มการเปลี่ยนแปลงคุณภาพและปริมาตรน้ำหล่อเย็นเชิงลึก (Deep Telemetry Diagnostic)</div>
        <div className="grid2">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><div><span className="material-symbols-outlined" style={{color:'#f59e0b'}}>water_drop</span><b style={{color:'#fff',marginLeft:6}}>SENSOR_LVL_01A</b></div><span className="badge badge-warn">ATTENTION REQUIRED</span></div>
            <p style={{color:'#94a3b8',fontSize:12}}>การวิเคราะห์แนวโน้มปริมาตรน้ำหล่อเย็น (Level Trend)</p>
            <p style={{fontSize:36,fontWeight:700,color:'#00d4ff',margin:'8px 0'}}>78%</p>
            <p style={{color:'#f59e0b',fontSize:13}}>trending_down -0.42%/ชม. (สูงผิดปกติ)</p>
            <div style={{display:'flex',alignItems:'flex-end',gap:4,height:100,marginTop:12}}>
              {[92, 89, 87, 85, 82, 78].map((v, i) => (<div key={i} style={{flex:1,textAlign:'center'}}><div style={{width:'100%',height:`${v}px`,background:'linear-gradient(180deg,#00d4ff,#0066cc)',borderRadius:'4px 4px 0 0'}} /><small style={{color:'#64748b',fontSize:10}}>{v}%</small></div>))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,color:'#64748b'}}><span>ค่าสูงสุด 24H: 88.0%</span><span>ค่าต่ำสุด 24H: 78.0%</span></div>
            <div style={{marginTop:8,fontSize:12,color:'#f59e0b'}}>⚠️ Estimated Dry-Out ~114 ชม.</div>
          </div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><div><span className="material-symbols-outlined" style={{color:'#10b981'}}>science</span><b style={{color:'#fff',marginLeft:6}}>SENSOR_PH_01B</b></div><span className="badge badge-ok">STABLE & OPTIMAL</span></div>
            <p style={{color:'#94a3b8',fontSize:12}}>การวิเคราะห์ความเสถียรทางเคมี (pH Stability)</p>
            <p style={{fontSize:36,fontWeight:700,color:'#10b981',margin:'8px 0'}}>7.28 pH</p>
            <p style={{color:'#10b981',fontSize:13}}>check_circle σ = 0.04 (ความเสถียรสูง)</p>
            <div style={{display:'flex',alignItems:'flex-end',gap:4,height:100,marginTop:12}}>
              {[7.24, 7.26, 7.28, 7.30, 7.32, 7.28].map((v, i) => (<div key={i} style={{flex:1,textAlign:'center'}}><div style={{width:'100%',height:`${(v - 7) * 200}px`,background:'linear-gradient(180deg,#10b981,#059669)',borderRadius:'4px 4px 0 0'}} /><small style={{color:'#64748b',fontSize:10}}>{v}</small></div>))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,color:'#64748b'}}><span>ค่าสูงสุด (24H): 7.36 pH</span><span>ค่าต่ำสุด (24H): 7.24 pH</span></div>
            <div style={{marginTop:8,fontSize:12,color:'#10b981'}}>✓ สภาวะกรด-ด่าง: ไม่มี Acidic Drift</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">table_chart</span>ตารางสรุปค่าทางสถิติและตัวแปรวิเคราะห์ (Statistical Summary Table)</div>
        <table className="mtx">
          <thead><tr><th>พารามิเตอร์ตรวจวัด</th><th>ค่าปัจจุบัน</th><th>ต่ำสุด (Min)</th><th>สูงสุด (Max)</th><th>ค่าเฉลี่ย (Mean)</th><th>อัตราเปลี่ยนแปลง</th><th>ดัชนีความเสถียร</th><th>สถานะ</th></tr></thead>
          <tbody>
            <tr><td><span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:16}}>water_bottle</span> ระดับน้ำหล่อเย็น (Coolant Level)</td><td><b>{S.level.avg}%</b></td><td>{S.level.min}%</td><td>{S.level.max}%</td><td>{S.level.avg}%</td><td>-0.42% / ชม.</td><td>ลดลงต่อเนื่อง</td><td><span className="badge badge-warn">ต้องเฝ้าระวัง</span></td></tr>
            <tr><td><span className="material-symbols-outlined" style={{color:'#10b981',fontSize:16}}>science</span> ความเป็นกรด-ด่าง (pH Level)</td><td><b>{S.ph.avg}</b></td><td>{S.ph.min}</td><td>{S.ph.max}</td><td>{S.ph.avg}</td><td>±0.00 / ชม.</td><td>เสถียรสูง (σ 0.04)</td><td><span className="badge badge-ok">สมบูรณ์ปกติ</span></td></tr>
            <tr><td><span className="material-symbols-outlined" style={{color:'#f59e0b',fontSize:16}}>thermostat</span> อุณหภูมิน้ำหล่อเย็น (Coolant Temp)</td><td><b>{S.temp.avg}°C</b></td><td>{S.temp.min}°C</td><td>{S.temp.max}°C</td><td>{S.temp.avg}°C</td><td>+0.05°C / ชม.</td><td>อยู่ในเกณฑ์ปกติ</td><td><span className="badge badge-ok">สมบูรณ์ปกติ</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">assignment_turned_in</span>กรอบการวินิจฉัยและข้อแนะนำเชิงวิศวกรรม (Engineering Diagnostic Protocol)</div>
        <div style={{background:'#f59e0b20',border:'1px solid #f59e0b',borderRadius:8,padding:12,marginBottom:12}}><b style={{color:'#f59e0b'}}>SEVERITY LEVEL: WARNING (เฝ้าระวังระดับ 2)</b></div>
        <div className="grid3">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>info</span><b style={{color:'#fff'}}>STEP 01 — WHAT HAPPENED</b></div><p style={{color:'#94a3b8',fontSize:12}}>ระดับน้ำหล่อเย็นลดลงกะทันหัน 4% ภายในรอบ 1 ชั่วโมงที่ผ่านมา<br /><span className="mono" style={{color:'#00d4ff'}}>ΔV = -4.2 ลิตร</span></p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>data_exploration</span><b style={{color:'#fff'}}>STEP 02 — EVIDENCE</b></div><p style={{color:'#94a3b8',fontSize:12}}>Sensor SEN-LVL-01 ลดลงจาก 82% เหลือ 78% เวลา 10:30 น. ขณะที่ pH คงที่ 7.28<br /><span className="badge badge-ok">Sensor Health: 100% Operational</span></p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>report_problem</span><b style={{color:'#fff'}}>STEP 03 — WHY IT MATTERS</b></div><p style={{color:'#94a3b8',fontSize:12}}>อัตราการลดลงเร็วกว่าการระเหยปกติ 5 เท่า อาจกระทบระบบหล่อเย็นหัวกัด CNC<br /><span className="badge badge-warn">Risk: Tool Wear Acceleration</span></p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>troubleshoot</span><b style={{color:'#fff'}}>STEP 04 — WHAT TO CHECK</b></div><p style={{color:'#94a3b8',fontSize:12}}>1. ตรวจสอบรอยรั่วข้อต่อสายยาง<br />2. ตรวจสอบระดับสายตาในถังพัก<br />3. ตรวจสอบบริเวณรางระบายเศษกลึง</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>task_alt</span><b style={{color:'#fff'}}>STEP 05 — RECOMMENDED ACTION</b></div><p style={{color:'#94a3b8',fontSize:12}}>ดำเนินการ Visual Inspection หน้างานเครื่อง L05 และเปิด Maintenance Ticket หากพบรอยรั่ว<br /><span className="badge badge-info">Action Window: ภายใน 2 ชั่วโมง</span></p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,display:'flex',flexDirection:'column',justifyContent:'center',gap:8}}><button className="btn btn-cyan" style={{width:'100%',justifyContent:'center'}}><span className="material-symbols-outlined" style={{fontSize:16}}>check</span>รับทราบผลวิเคราะห์</button><button className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}><span className="material-symbols-outlined" style={{fontSize:16}}>build</span>สร้างบันทึกบำรุงรักษา</button></div>
        </div>
      </div>
    </div>
  );
}
