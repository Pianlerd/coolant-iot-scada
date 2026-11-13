import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function History() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { api.getHistory('L05', 50).then(setRows).catch(() => {}); }, []);
  const filtered = rows.filter(r => !q || r.id.toLowerCase().includes(q.toLowerCase()));

  const exportCsv = () => {
    const head = ['Packet ID', 'Timestamp', 'Level %', 'pH', 'Temp', 'Status', 'Tier'];
    const body = rows.map(r => [r.id, r.timestamp, r.level_percent, r.ph, r.temperature, r.status, r.tier]);
    const csv = [head, ...body].map(r => r.join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'telemetry_archive.csv'; a.click();
  };

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">history</span>ARCHIVE TELEMETRY LOGS — ประวัติการตรวจวัดย้อนหลัง (Monitoring History)</div>
        <div className="grid4" style={{marginBottom:12}}>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>TOTAL PACKETS (24H)</p><p style={{fontSize:24,fontWeight:700,color:'#fff'}}>172,800</p><p style={{color:'#10b981',fontSize:11}}>ความสมบูรณ์ 99.8%</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>AVG COOLANT LEVEL</p><p style={{fontSize:24,fontWeight:700,color:'#00d4ff'}}>81.4%</p><p style={{color:'#94a3b8',fontSize:11}}>407.0 L</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>AVG pH (24H)</p><p style={{fontSize:24,fontWeight:700,color:'#10b981'}}>7.29</p><p style={{color:'#94a3b8',fontSize:11}}>σ 0.04 (เสถียรภาพสูง)</p></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12,textAlign:'center'}}><p style={{color:'#94a3b8',fontSize:11}}>ANOMALY / PACKET LOSS</p><p style={{fontSize:24,fontWeight:700,color:'#f59e0b'}}>0.02%</p><p style={{color:'#94a3b8',fontSize:11}}>3 เหตุการณ์</p></div>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
          <input placeholder="ค้นหา Packet ID, Timestamp..." value={q} onChange={e => setQ(e.target.value)} style={{flex:1,minWidth:200}} />
          <button className="btn btn-cyan" onClick={exportCsv}><span className="material-symbols-outlined" style={{fontSize:16}}>file_download</span>Export CSV</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">show_chart</span>กราฟอนุกรมเวลาความสัมพันธ์ (Dual-Parameter Correlation Timeline)</div>
        <div style={{display:'flex',alignItems:'flex-end',gap:4,height:200,background:'#0a0e1a',borderRadius:8,padding:12}}>
          {filtered.slice(0, 20).map((h, i) => (<div key={i} style={{flex:1,textAlign:'center',position:'relative'}}>
            <div style={{width:'100%',height:`${h.level_percent * 1.8}px`,background:'linear-gradient(180deg,#00d4ff,#0066cc)',borderRadius:'4px 4px 0 0',position:'relative'}}>
              <div style={{position:'absolute',bottom:`${((h.ph - 6) / 3) * 100}%`,left:0,right:0,height:2,background:'#10b981'}} />
            </div>
            <small style={{color:'#64748b',fontSize:9}}>{h.ph}</small>
          </div>))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,color:'#64748b'}}><span>Level: 0% - 100% (Normal Band: 30%-100%)</span><span>pH Scale: 6.5 - 8.5</span></div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">list_alt</span>รายการบันทึกการตรวจวัด (Telemetry Packets)</div>
        <div style={{overflowX:'auto',maxHeight:400}}>
          <table className="mtx">
            <thead><tr><th>วันที่และเวลา</th><th>Packet ID</th><th>เซนเซอร์ / โหนด</th><th>Tier</th><th>ค่าตรวจวัดดิบ</th><th>ค่าประมวลผล</th><th>อัตราเปลี่ยนแปลง</th><th>คุณภาพ</th><th>ตรวจวิเคราะห์</th></tr></thead>
            <tbody>
              {filtered.map(r => (<tr key={r.id} style={{cursor:'pointer'}} onClick={() => setSelected(r)}><td className="mono" style={{fontSize:11}}>{new Date(r.timestamp).toLocaleString('th-TH')}</td><td className="mono" style={{fontSize:11}}>{r.id}</td><td>{r.machine_id} / Dual-Probe</td><td><span className={`badge ${r.tier === 'PROCESSED' ? 'badge-ok' : r.tier === 'RAW' ? 'badge-info' : r.tier === 'ALERT' ? 'badge-crit' : 'badge-warn'}`}>{r.tier}</span></td><td className="mono">0x{Number(r.raw_adc_level).toString(16).toUpperCase()} / {r.raw_mv_ph} mV</td><td><b>{r.level_percent}%</b> | {r.ph} pH</td><td>-0.42%/ชม.</td><td><span className={`badge ${r.status === 'WARNING' ? 'badge-warn' : r.status === 'STALE' ? 'badge-crit' : 'badge-ok'}`}>{r.status === 'NORMAL' ? 'VALID_CRC' : r.status}</span></td><td><span className="material-symbols-outlined" style={{fontSize:16,color:'#00d4ff'}}>visibility</span></td></tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="card" style={{position:'fixed',top:60,right:20,width:400,maxHeight:'80vh',overflow:'auto',zIndex:100,background:'#111827',border:'2px solid #00d4ff',borderRadius:10,padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><b style={{color:'#fff'}}>Telemetry Packet Inspector</b><span className="material-symbols-outlined" style={{cursor:'pointer',color:'#94a3b8'}} onClick={() => setSelected(null)}>close</span></div>
          <div className="kv"><span>Packet ID</span><b className="mono" style={{fontSize:11}}>{selected.id}</b></div>
          <div className="kv"><span>CRC</span><b className="mono">{selected.crc}</b></div>
          <div className="kv"><span>Timestamp</span><b>{new Date(selected.timestamp).toLocaleString('th-TH')}</b></div>
          <div className="kv"><span>Controller</span><b>ESP32-WROOM-32U</b></div>
          <div className="kv"><span>Tier</span><span className={`badge ${selected.tier === 'PROCESSED' ? 'badge-ok' : 'badge-warn'}`}>{selected.tier}</span></div>
          <div className="kv"><span>Level</span><b>{selected.level_percent}%</b></div>
          <div className="kv"><span>pH</span><b>{selected.ph}</b></div>
          <div className="kv"><span>Raw ADC</span><b className="mono">{selected.raw_adc_level}</b></div>
          <div className="kv"><span>Raw mV</span><b className="mono">{selected.raw_mv_ph}</b></div>
          <div className="kv"><span>RSSI</span><b>{selected.rssi} dBm</b></div>
          <div className="kv"><span>Status</span><span className={`badge ${selected.status === 'NORMAL' ? 'badge-ok' : 'badge-warn'}`}>{selected.status}</span></div>
          <div style={{marginTop:12,background:'#0a0e1a',borderRadius:6,padding:10}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><b style={{color:'#fff',fontSize:12}}>ESP32 RAW INGESTION PAYLOAD (JSON)</b><span className="material-symbols-outlined" style={{fontSize:14,color:'#00d4ff',cursor:'pointer'}}>content_copy</span></div>
            <pre className="mono" style={{fontSize:10,color:'#10b981',margin:0,whiteSpace:'pre-wrap'}}>{JSON.stringify({ device_id: 'ESP32-L05', machine_id: selected.machine_id, packet_id: selected.id, timestamp: selected.timestamp, rssi_dbm: selected.rssi, sensors: { coolant_level: { raw_adc: selected.raw_adc_level, voltage_mv: 2608.2, value: selected.level_percent, unit: '%', status: selected.status }, ph_electrode: { raw_mv: selected.raw_mv_ph, calibrated_ph: selected.ph, status: selected.status } }, crc16: selected.crc }, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
