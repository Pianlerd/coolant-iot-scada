import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('');
  const load = () => api.getAlerts(filter || undefined).then(setAlerts).catch(() => {});
  useEffect(() => { load(); }, [filter]);
  const ack = async (id) => { await api.ackAlert(id); load(); };

  const stats = { total: alerts.length, pending: alerts.filter(a => a.status === 'PENDING').length, progress: alerts.filter(a => a.status === 'IN_PROGRESS').length, resolved: alerts.filter(a => a.status === 'RESOLVED').length };

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">crisis_alert</span>ศูนย์จัดการแจ้งเตือนความผิดปกติ — LIVE TELEMETRY STREAM</div>
        <div className="grid4">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>TOTAL RECORDS / MTD</p><p style={{fontSize:28,fontWeight:700,color:'#fff'}}>{stats.total}</p><p style={{color:'#10b981',fontSize:11}}>+12% เทียบกับรอบบิลที่ผ่านมา</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>RECENT INSPECTIONS</p><p style={{fontSize:28,fontWeight:700,color:'#00d4ff'}}>{stats.progress}</p><p style={{color:'#94a3b8',fontSize:11}}>ครั้ง (สัปดาห์นี้)</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>RESOLVED</p><p style={{fontSize:28,fontWeight:700,color:'#10b981'}}>{stats.resolved}</p><p style={{color:'#94a3b8',fontSize:11}}>เคสเรียบร้อย SOP 100%</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>PENDING</p><p style={{fontSize:28,fontWeight:700,color:'#ef4444'}}>{stats.pending}</p><p style={{color:'#94a3b8',fontSize:11}}>รายการค้างตรวจ</p></div>
        </div>
      </div>

      <div className="card" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
        <div className="card-title" style={{margin:0}}><span className="material-symbols-outlined">tune</span>รายการแจ้งเตือนที่ต้องดำเนินการ (Incident Queue)</div>
        <div style={{flex:1}} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{width:'auto'}}><option value="">ทั้งหมด</option><option value="PENDING">รอดำเนินการ</option><option value="IN_PROGRESS">กำลังดำเนินการ</option><option value="RESOLVED">แก้ไขแล้ว</option></select>
      </div>

      {alerts.map(a => (
        <div key={a.id} className="card" style={{borderLeft:`4px solid ${a.type === 'CRITICAL' ? '#ef4444' : a.type === 'WARNING' ? '#f59e0b' : '#3b82f6'}`}}>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:6,flexWrap:'wrap'}}>
                <span className={`badge ${a.type === 'CRITICAL' ? 'badge-crit' : a.type === 'WARNING' ? 'badge-warn' : 'badge-info'}`}>{a.type}</span>
                <span className="mono" style={{fontSize:11,color:'#64748b'}}>{a.id}</span>
                <span className={`badge ${a.status === 'PENDING' ? 'badge-crit' : a.status === 'IN_PROGRESS' ? 'badge-warn' : 'badge-ok'}`}>{a.status}</span>
                {a.priority === 1 && <span className="badge" style={{background:'#ef4444',color:'#fff'}}>PRIORITY-1</span>}
              </div>
              <b style={{fontSize:15,color:'#fff'}}>{a.title}</b>
              <p style={{fontSize:13,color:'#94a3b8',margin:'4px 0'}}>{a.description}</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',fontSize:12,color:'#64748b',marginTop:6}}>
                <span>🏭 {a.machine_id}</span><span>💧 {a.level_before}% → {a.level_after}%</span><span>🧪 pH {a.ph}</span><span>🕐 {new Date(a.timestamp).toLocaleString('th-TH')}</span>
                {a.leak_rate && <span style={{color:'#ef4444'}}>Leak Rate: {a.leak_rate}%/h</span>}
                {a.responsible && <span>👷 {a.responsible}</span>}
              </div>
            </div>
            {a.status === 'PENDING' && <button onClick={() => ack(a.id)} className="btn btn-cyan"><span className="material-symbols-outlined" style={{fontSize:16}}>check</span>Acknowledge</button>}
          </div>
        </div>
      ))}
      {alerts.length === 0 && <div className="card" style={{textAlign:'center',padding:40,color:'#64748b'}}><span className="material-symbols-outlined" style={{fontSize:40,color:'#10b981'}}>check_circle</span><p>ไม่มีการแจ้งเตือน</p></div>}

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">menu_book</span>แนวทางปฏิบัติเมื่อเกิดแจ้งเตือน (SOP Guide)</div>
        <div className="grid2">
          <div><div style={{display:'flex',gap:10,marginBottom:10}}><span className="badge badge-cyan" style={{minWidth:24,height:24,display:'flex',alignItems:'center',justifyContent:'center'}}>01</span><div><b style={{color:'#fff'}}>กดปุ่ม รับทราบ (Acknowledge)</b><br /><span style={{color:'#94a3b8',fontSize:12}}>บนหน้าจอเพื่อหยุดเสียงเตือน Siren</span></div></div><div style={{display:'flex',gap:10,marginBottom:10}}><span className="badge badge-cyan" style={{minWidth:24,height:24,display:'flex',alignItems:'center',justifyContent:'center'}}>02</span><div><b style={{color:'#fff'}}>ตรวจสอบระดับของเหลวจริง</b><br /><span style={{color:'#94a3b8',fontSize:12}}>ที่แท่นเครื่อง L05 และตรวจการรั่วของโอริง</span></div></div></div>
          <div><div style={{display:'flex',gap:10,marginBottom:10}}><span className="badge badge-cyan" style={{minWidth:24,height:24,display:'flex',alignItems:'center',justifyContent:'center'}}>03</span><div><b style={{color:'#fff'}}>กรณีค่า pH &lt; 7.20</b><br /><span style={{color:'#94a3b8',fontSize:12}}>ให้ประสานงานฝ่ายเคมีเพื่อเติมสารปรับค่าความเข้มข้น</span></div></div><div style={{display:'flex',gap:10}}><span className="badge badge-cyan" style={{minWidth:24,height:24,display:'flex',alignItems:'center',justifyContent:'center'}}>04</span><div><b style={{color:'#fff'}}>บันทึกผลการบำรุงรักษา</b><br /><span style={{color:'#94a3b8',fontSize:12}}>ลงในระบบเพื่อใช้เป็นฐานข้อมูลการวิจัย</span></div></div></div>
        </div>
      </div>
    </div>
  );
}
