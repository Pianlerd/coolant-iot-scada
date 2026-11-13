import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';

export default function Monitoring() {
  const [machines, setMachines] = useState([]);
  const [sel, setSel] = useState('L05');
  const [cur, setCur] = useState(null);
  const [hist, setHist] = useState([]);
  const [auto, setAuto] = useState(false);
  const [sp] = useSearchParams();

  useEffect(() => { api.getMachines().then(setMachines).catch(() => {}); if (sp.get('machine')) setSel(sp.get('machine')); }, []);
  const load = async () => { try { const [c, h] = await Promise.all([api.getCurrent(sel), api.getHistory(sel, 20)]); setCur(c); setHist(h.reverse()); } catch {} };
  useEffect(() => { load(); const i = setInterval(load, 3000); return () => clearInterval(i); }, [sel]);
  useEffect(() => { if (!auto) return; const i = setInterval(async () => { await api.simulate(sel); load(); }, 2000); return () => clearInterval(i); }, [auto, sel]);

  return (
    <div>
      <div className="card" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
        <div className="card-title" style={{margin:0}}><span className="material-symbols-outlined">sensors</span>Stream Status</div>
        <div style={{flex:1}} />
        <select value={sel} onChange={e => setSel(e.target.value)} style={{width:'auto'}}>{machines.map(m => <option key={m.id} value={m.id}>{m.id} - {m.name}</option>)}</select>
        <button className="btn btn-cyan" onClick={load}><span className="material-symbols-outlined" style={{fontSize:16}}>sync</span>Sync</button>
        <button className={`btn ${auto ? 'btn-red' : 'btn-green'}`} onClick={() => setAuto(!auto)}><span className="material-symbols-outlined" style={{fontSize:16}}>{auto ? 'pause' : 'play_arrow'}</span>{auto ? 'Stop' : 'Simulate'}</button>
      </div>

      {cur && (
        <>
          <div className="grid2">
            <div className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>water_ec</span><b style={{color:'#fff',marginLeft:6}}>SEN-LVL-01 (Hydrostatic/Ultrasonic)</b></div><span className="badge badge-cyan">CALIBRATED</span></div>
              <p style={{color:'#94a3b8',fontSize:13}}>ระดับน้ำหล่อเย็น (Coolant Level)</p>
              <p style={{fontSize:44,fontWeight:700,color:'#00d4ff',margin:'8px 0'}}>{cur.level_percent}%</p>
              <div style={{background:'#1e2d3b',borderRadius:20,height:12,margin:'10px 0'}}><div style={{width:`${cur.level_percent}%`,background:'linear-gradient(90deg,#00d4ff,#0066cc)',height:12,borderRadius:20}} /></div>
              <div className="kv"><span>ความจุถัง (Capacity)</span><b>{cur.level_liters} / {cur.machine?.tank_capacity} L</b></div>
              <div className="kv"><span>Target Operating Fill</span><b>75% - 85%</b></div>
              <div className="kv"><span>Flow Rate Inflow</span><b>18.4 L/min</b></div>
              <div className="kv"><span>Coolant Temp</span><b>{cur.temperature} °C</b></div>
            </div>
            <div className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div><span className="material-symbols-outlined" style={{color:'#10b981'}}>science</span><b style={{color:'#fff',marginLeft:6}}>SEN-PH-02 (Industrial Glass Electrode)</b></div><span className="badge badge-cyan">ANALOG BNC</span></div>
              <p style={{color:'#94a3b8',fontSize:13}}>คุณภาพน้ำหล่อเย็น (pH Precision Meter)</p>
              <p style={{fontSize:44,fontWeight:700,color:'#10b981',margin:'8px 0'}}>{cur.ph} pH</p>
              <div style={{background:'#1e2d3b',borderRadius:20,height:12,margin:'10px 0',position:'relative'}}>
                <div style={{position:'absolute',left:'30%',right:'30%',top:0,bottom:0,background:'#10b98140',borderRadius:20}} />
                <div style={{position:'absolute',left:`${((cur.ph - 6) / 3) * 100}%`,top:-4,width:8,height:20,background:'#fff',borderRadius:4}} />
              </div>
              <div className="kv"><span>Target Benchmark</span><b>7.20 - 7.50 pH</b></div>
              <div className="kv"><span>Electro-Potential</span><b>{cur.raw_mv_ph} mV</b></div>
              <div className="kv"><span>Standard Acceptance</span><b>Min 7.00 - Max 8.50</b></div>
              <div className="kv"><span>Corrosion Risk</span><span className="badge badge-ok">VERY LOW</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="material-symbols-outlined">memory</span>สถานะฮาร์ดแวร์และการเชื่อมต่อระบบ (Hardware & Sensor Diagnostics)</div>
            <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}>โปรโตคอล: MQTT / Modbus RTU / WebSocket Over SSL</p>
            <div className="grid3">
              <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#10b981'}}>straighten</span><b style={{color:'#fff'}}>SEN-LVL-01</b><span className="badge badge-ok" style={{marginLeft:'auto'}}>ONLINE</span></div><div style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>Hardware Model: Ultrasonic Industrial Transducer<br />Interface Mode: ADC 4-20mA to I2C<br />Signal-to-Noise (SNR): 28 dB (High Quality)</div></div>
              <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#10b981'}}>biotech</span><b style={{color:'#fff'}}>SEN-PH-02</b><span className="badge badge-ok" style={{marginLeft:'auto'}}>NORMAL</span></div><div style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>Electrode Type: Glass Bulb Combined Probe<br />Voltage Potential: {cur.raw_mv_ph} mV (Gain: 1.0)<br />Calibrated Offset: +0.02 (Standard ISO 4.01/7.00)</div></div>
              <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}><span className="material-symbols-outlined" style={{color:'#10b981'}}>developer_board</span><b style={{color:'#fff'}}>ESP32-WROOM-32U</b><span className="badge badge-ok" style={{marginLeft:'auto'}}>RUNNING</span></div><div style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>System Uptime: 48h 12m 30s<br />Free Heap Memory: 182.4 KB / 320 KB<br />Wi-Fi RSSI Strength: {cur.rssi} dBm (Strong)</div></div>
            </div>
          </div>

          <div className="card">
            <div className="card-title" style={{justifyContent:'space-between'}}><span><span className="material-symbols-outlined">terminal</span>ตารางสตรีมข้อมูลดิบจากเซนเซอร์ (Raw Telemetry Packet Feed)</span><div style={{display:'flex',gap:6}}><span className="badge badge-navy">Auto-Scroll ON</span><span className="badge badge-navy">Stream Filter: All</span></div></div>
            <div style={{overflowX:'auto',maxHeight:300}}>
              <table className="mtx">
                <thead><tr><th>TIMESTAMP</th><th>CONTROLLER ID</th><th>SENSOR PROBE</th><th>PARAMETER</th><th>RAW VALUE</th><th>PROCESSED</th><th>VALIDATION</th><th>ACTION</th></tr></thead>
                <tbody>
                  {hist.map(h => (<tr key={h.id}><td className="mono" style={{fontSize:11}}>{new Date(h.timestamp).toLocaleTimeString('th-TH')}</td><td>{h.machine_id}</td><td>SEN-LVL-01</td><td>Coolant Level</td><td className="mono">0x{Number(h.raw_adc_level).toString(16).toUpperCase()} ({h.raw_adc_level} mV)</td><td><b>{h.level_percent}%</b></td><td><span className={`badge ${h.status === 'WARNING' ? 'badge-warn' : h.status === 'STALE' ? 'badge-crit' : 'badge-ok'}`}>{h.status === 'NORMAL' ? 'VALID_CRC' : h.status}</span></td><td><span className="material-symbols-outlined" style={{fontSize:16,color:'#00d4ff',cursor:'pointer'}}>visibility</span></td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
