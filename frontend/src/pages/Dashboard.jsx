import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Dashboard() {
  const [machines, setMachines] = useState([]);
  const [tele, setTele] = useState({});
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try { const list = await api.getMachines(); setMachines(list); const d = {}; for (const m of list) { try { d[m.id] = await api.getCurrent(m.id); } catch {} } setTele(d); } catch {}
    };
    load(); api.getAlerts().then(setAlerts).catch(() => {});
    const i = setInterval(load, 5000); return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="grid4">
        <div className="card"><span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:28}}>factory</span><p style={{fontSize:12,color:'#94a3b8',margin:'4px 0'}}>เครื่องจักรออนไลน์</p><p style={{fontSize:26,fontWeight:700,color:'#fff'}}>{machines.filter(m => m.status === 'ONLINE').length}/{machines.length}</p></div>
        <div className="card"><span className="material-symbols-outlined" style={{color:'#ef4444',fontSize:28}}>notifications</span><p style={{fontSize:12,color:'#94a3b8',margin:'4px 0'}}>Alerts รอดำเนินการ</p><p style={{fontSize:26,fontWeight:700,color:'#ef4444'}}>{alerts.filter(a => a.status === 'PENDING').length}</p></div>
        <div className="card"><span className="material-symbols-outlined" style={{color:'#10b981',fontSize:28}}>memory</span><p style={{fontSize:12,color:'#94a3b8',margin:'4px 0'}}>ESP32 Nodes</p><p style={{fontSize:26,fontWeight:700,color:'#10b981'}}>● Online</p></div>
        <div className="card"><span className="material-symbols-outlined" style={{color:'#10b981',fontSize:28}}>wifi</span><p style={{fontSize:12,color:'#94a3b8',margin:'4px 0'}}>Packet Loss</p><p style={{fontSize:26,fontWeight:700,color:'#10b981'}}>0.0%</p></div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">monitoring</span>Live Telemetry — L05 (CNC 5-Axis Milling)</div>
        {tele['L05'] && (
          <div className="grid3">
            <div style={{textAlign:'center',padding:10,background:'#0a0e1a',borderRadius:8}}><p style={{fontSize:13,color:'#94a3b8'}}>💧 Coolant Level</p><p style={{fontSize:40,fontWeight:700,color:'#00d4ff'}}>{tele['L05'].level_percent}%</p><div style={{background:'#1e2d3b',borderRadius:20,height:10,margin:'8px 0'}}><div style={{width:`${tele['L05'].level_percent}%`,background:'linear-gradient(90deg,#00d4ff,#0066cc)',height:10,borderRadius:20}} /></div><small style={{color:'#64748b'}}>~{tele['L05'].level_liters}/120 L · Rate -0.42%/ชม.</small></div>
            <div style={{textAlign:'center',padding:10,background:'#0a0e1a',borderRadius:8}}><p style={{fontSize:13,color:'#94a3b8'}}>🧪 pH Value</p><p style={{fontSize:40,fontWeight:700,color:'#10b981'}}>{tele['L05'].ph}</p><small style={{color:'#64748b'}}>Target 7.20–8.30 · Stable ±0.04</small></div>
            <div style={{textAlign:'center',padding:10,background:'#0a0e1a',borderRadius:8}}><p style={{fontSize:13,color:'#94a3b8'}}>🌡️ Temperature</p><p style={{fontSize:40,fontWeight:700,color:'#f59e0b'}}>{tele['L05'].temperature}°C</p><small style={{color:'#64748b'}}>Optimal 20–30°C</small></div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">engineering</span>ตรวจพบระดับน้ำหล่อเย็นลดลง 4% ในรอบ 1 ชม. ที่ผ่านมา (82% เหลือ 78%)</div>
        <div className="grid2">
          <div>
            <p style={{color:'#94a3b8',fontSize:13,marginBottom:8}}><b style={{color:'#fff'}}>PREVENTIVE ADVICE</b></p>
            <p style={{color:'#e5e7eb',fontSize:13,lineHeight:1.6}}>ระบบแนะนำให้ผู้ควบคุมเครื่องจักรตรวจสอบระดับน้ำจริงที่แทงก์น้ำหล่อเย็น (Sump Tank) และตรวจดูจุดเชื่อมต่อท่อส่งน้ำเพื่อป้องกันการรั่วซึมก่อนเริ่มรอบงานถัดไป ตามแนวทางบำรุงรักษาเชิงป้องกัน</p>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn btn-cyan"><span className="material-symbols-outlined" style={{fontSize:16}}>done_all</span>รับทราบ (Acknowledge)</button>
              <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>assignment_add</span>เปิดใบงาน</button>
            </div>
          </div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}>
            <p style={{color:'#94a3b8',fontSize:12,marginBottom:8}}>Recent 24-Hour Telemetry Trend</p>
            <div style={{display:'flex',alignItems:'flex-end',gap:4,height:120}}>
              {[92, 89, 87, 85, 82, 78].map((v, i) => (<div key={i} style={{flex:1,textAlign:'center'}}><div style={{width:'100%',height:`${v}px`,background:'linear-gradient(180deg,#00d4ff,#0066cc)',borderRadius:'4px 4px 0 0'}} /><small style={{color:'#64748b',fontSize:10}}>{v}%</small></div>))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:10,color:'#64748b'}}><span>24 ชม. ก่อน</span><span>ปัจจุบัน</span></div>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">precision_manufacturing</span>เครื่องจักรที่ตรวจสอบ</div>
          {machines.map(m => (<div key={m.id} className="kv" style={{cursor:'pointer'}} onClick={() => navigate(`/monitoring?machine=${m.id}`)}><span><b style={{color:'#fff'}}>{m.id}</b> {m.name}<br /><small style={{color:'#64748b'}}>{m.esp32_id} • {m.ip}</small></span><span className={`badge ${m.status === 'ONLINE' ? 'badge-ok' : 'badge-warn'}`}>{m.status}</span></div>))}
        </div>
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">notifications</span>Incident Queue (แจ้งเตือนล่าสุด)</div>
          {alerts.slice(0, 5).map(a => (<div key={a.id} className="kv"><span><span className={`badge ${a.type === 'CRITICAL' ? 'badge-crit' : a.type === 'WARNING' ? 'badge-warn' : 'badge-info'}`}>{a.type}</span><b style={{color:'#fff',marginLeft:6}}>{a.title}</b><br /><small style={{color:'#64748b'}}>{a.machine_id} • {new Date(a.timestamp).toLocaleString('th-TH')}</small></span><span className={`badge ${a.status === 'PENDING' ? 'badge-crit' : a.status === 'IN_PROGRESS' ? 'badge-warn' : 'badge-ok'}`}>{a.status}</span></div>))}
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">terminal</span>Machine Specs & Node CONNECTED</div>
        <div className="grid2">
          <div><div className="kv"><span>Machine Unit</span><b>L05 (5-Axis Milling)</b></div><div className="kv"><span>ถังหล่อเย็น (Sump Tank)</span><b>120 Liters Capacity</b></div><div className="kv"><span>ชนิดน้ำมันหล่อเย็น</span><b>Castrol Hysol X (8% Con.)</b></div></div>
          <div><div className="kv"><span>ESP32 Firmware</span><b>v3.4.1 (MQTT / TLS 1.3)</b></div><div className="kv"><span>ผู้รับผิดชอบกะปัจจุบัน</span><b>สมชาย เก่งกล้า (Shift A)</b></div><div className="kv"><span>สถานะ</span><span className="badge badge-ok">IN-CYCLE (ปกติ)</span></div></div>
        </div>
      </div>
    </div>
  );
}
