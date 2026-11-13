import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Maintenance() {
  const [recs, setRecs] = useState([]);
  const [machines, setMachines] = useState([]);
  const [show, setShow] = useState(false);
  const [f, setF] = useState({ machine_id: 'L05', type: 'Coolant Refill', description: '', level_before: 0, level_after: 0, ph_before: 0, ph_after: 0, volume_added: 0, status: 'COMPLETED' });
  const load = () => api.getMaintenance().then(setRecs).catch(() => {});
  useEffect(() => { load(); api.getMachines().then(setMachines).catch(() => {}); }, []);
  const save = async (e) => { e.preventDefault(); await api.addMaintenance({ ...f, technician: 'สมชาย เก่งกล้า' }); setShow(false); load(); };

  const stats = { total: recs.length, recent: recs.filter(r => (Date.now() - new Date(r.timestamp)) < 7*24*3600*1000).length, refills: recs.filter(r => r.type.includes('Refill')).length, pending: recs.filter(r => r.status !== 'COMPLETED').length };

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">build_circle</span>บันทึกประวัติการบำรุงรักษา (Maintenance Records) — PREVENTIVE & CORRECTIVE ACTIONS</div>
        <div className="grid4">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>TOTAL RECORDS / MTD</p><p style={{fontSize:28,fontWeight:700,color:'#fff'}}>{stats.total}</p><p style={{color:'#10b981',fontSize:11}}>+12% เทียบกับรอบบิลที่ผ่านมา</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>RECENT INSPECTIONS</p><p style={{fontSize:28,fontWeight:700,color:'#00d4ff'}}>{stats.recent}</p><p style={{color:'#94a3b8',fontSize:11}}>ครั้ง (สัปดาห์นี้)</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>COOLANT REFILLS</p><p style={{fontSize:28,fontWeight:700,color:'#10b981'}}>{stats.refills}</p><p style={{color:'#94a3b8',fontSize:11}}>ครั้ง (รวม {recs.filter(r => r.type.includes('Refill')).reduce((s,r) => s + (r.volume_added || 0), 0)} ลิตร)</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>PENDING / IN-PROGRESS</p><p style={{fontSize:28,fontWeight:700,color:'#f59e0b'}}>{stats.pending}</p><p style={{color:'#94a3b8',fontSize:11}}>รายการค้างตรวจ</p></div>
        </div>
      </div>

      <div className="card" style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
        <div className="card-title" style={{margin:0}}><span className="material-symbols-outlined">fact_check</span>รายละเอียดและผลการเปลี่ยนแปลงการบำรุงรักษาล่าสุด</div>
        <div style={{flex:1}} />
        <button className="btn btn-cyan" onClick={() => setShow(!show)}><span className="material-symbols-outlined" style={{fontSize:16}}>{show ? 'close' : 'add_circle'}</span>{show ? 'ปิดฟอร์ม' : '+ บันทึกใหม่'}</button>
      </div>

      {show && (
        <div className="card" style={{border:'2px solid #00d4ff'}}>
          <div className="card-title"><span className="material-symbols-outlined">edit_note</span>MAINTENANCE ENTRY FORM • TELEMETRY LINKED</div>
          <form onSubmit={save} className="grid2">
            <div><label>เครื่องจักรเป้าหมาย (Machine)</label><select value={f.machine_id} onChange={e => setF({ ...f, machine_id: e.target.value })}>{machines.map(m => <option key={m.id} value={m.id}>{m.id} ({m.name})</option>)}</select></div>
            <div><label>ประเภทการบำรุงรักษา (Type)</label><select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}><option>Coolant Refill</option><option>Coolant Replacement</option><option>pH Inspection</option><option>Sensor Calibration</option><option>Joint Clamp Check</option></select></div>
            <div style={{gridColumn:'1/-1'}}><label>รายละเอียดการปฏิบัติงาน (Work Description & Notes)</label><textarea rows="2" value={f.description} onChange={e => setF({ ...f, description: e.target.value })} required /></div>
            <div><label>Level Before (%)</label><input type="number" step="0.1" value={f.level_before} onChange={e => setF({ ...f, level_before: parseFloat(e.target.value) })} /></div>
            <div><label>Level After (%)</label><input type="number" step="0.1" value={f.level_after} onChange={e => setF({ ...f, level_after: parseFloat(e.target.value) })} /></div>
            <div><label>pH Before</label><input type="number" step="0.01" value={f.ph_before} onChange={e => setF({ ...f, ph_before: parseFloat(e.target.value) })} /></div>
            <div><label>pH After</label><input type="number" step="0.01" value={f.ph_after} onChange={e => setF({ ...f, ph_after: parseFloat(e.target.value) })} /></div>
            <div><label>Volume Added (L)</label><input type="number" step="0.1" value={f.volume_added} onChange={e => setF({ ...f, volume_added: parseFloat(e.target.value) })} /></div>
            <div><label>Status</label><select value={f.status} onChange={e => setF({ ...f, status: e.target.value })}><option>COMPLETED</option><option>MONITORING</option><option>FOLLOW_UP</option></select></div>
            <div style={{gridColumn:'1/-1',display:'flex',gap:8}}><button type="submit" className="btn btn-green" style={{flex:1,justifyContent:'center'}}><span className="material-symbols-outlined" style={{fontSize:16}}>verified</span>บันทึกและตรวจสอบค่าเซนเซอร์</button><button type="button" onClick={() => setShow(false)} className="btn btn-dark">ยกเลิก</button></div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">table_rows</span>COMPREHENSIVE TELEMETRY MAINTENANCE LOG</div>
        <div style={{overflowX:'auto'}}>
          <table className="mtx">
            <thead><tr><th>RECORD ID</th><th>เครื่องจักร</th><th>ประเภทงาน</th><th>วันและเวลา</th><th>ผู้รับผิดชอบ</th><th>Level (ก่อน → หลัง)</th><th>pH (ก่อน → หลัง)</th><th>Volume</th><th>สถานะ</th></tr></thead>
            <tbody>
              {recs.map(r => (<tr key={r.id}><td className="mono" style={{fontSize:11}}>{r.id}</td><td><b>{r.machine_id}</b></td><td><span className="badge badge-info">{r.type}</span><br /><small style={{color:'#64748b'}}>{r.description}</small></td><td style={{fontSize:12}}>{new Date(r.timestamp).toLocaleString('th-TH')}</td><td>{r.technician}</td><td>{r.level_before}% → <b>{r.level_after}%</b></td><td>{r.ph_before} → <b>{r.ph_after}</b></td><td>{r.volume_added}L</td><td><span className={`badge ${r.status === 'COMPLETED' ? 'badge-ok' : r.status === 'MONITORING' ? 'badge-warn' : 'badge-info'}`}>{r.status}</span></td></tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
