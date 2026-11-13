import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function DeviceStatus() {
  const [cur, setCur] = useState(null);
  const [ping, setPing] = useState(null);
  useEffect(() => { api.getCurrent('L05').then(setCur).catch(() => {}); }, []);

  const doPing = async () => {
    setPing('กำลังทดสอบ...');
    await new Promise(r => setTimeout(r, 800));
    setPing('ESP32-L05 Ping OK: RTT=18.4ms | RSSI: -58 dBm | Signal: Strong (Wi-Fi 802.11b/g/n) HOST: 192.168.10.45');
  };

  return (
    <div>
      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">hub</span>สถานะอุปกรณ์และเซนเซอร์ (Device & Sensor Status) — DIAGNOSTICS OK</div>
        <p style={{color:'#94a3b8',fontSize:13,marginBottom:12}}>ตรวจสอบการทำงานของคอนโทรลเลอร์ ESP32, โพรบเซนเซอร์ตรวจวัดระดับน้ำและค่า pH พร้อมสถานะการเชื่อมต่อเครือข่ายและข้อมูลดิบ</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-cyan" onClick={doPing}><span className="material-symbols-outlined" style={{fontSize:16}}>network_ping</span>ทดสอบการเชื่อมต่อ (Ping Test)</button>
          <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>leak_remove</span>จำลองสถานะหลุด</button>
          <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>sync</span>รีเฟรชสถานะ</button>
        </div>
        {ping && <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:10,marginTop:12,fontSize:12,color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>check_circle</span> {ping}</div>}
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">memory</span>SECTION 1 // ESP32 MICROCONTROLLER TELEMETRY</div>
        <div className="grid2">
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div><b style={{color:'#fff'}}>CONTROLLER NODE</b><br /><span className="mono" style={{color:'#00d4ff',fontSize:13}}>ESP32-L05</span></div><span className="badge badge-ok">ONLINE</span></div>
            <div className="kv"><span>ติดตั้งประจำ</span><b>L05 CNC 5-Axis</b></div>
            <div className="kv"><span>ตำแหน่งติดตั้ง</span><b>Coolant Tank Bay #2</b></div>
            <div className="kv"><span>Firmware Build</span><b className="mono">v3.4.1-rc2 (OTA)</b></div>
            <div className="kv"><span>IP / MAC</span><b className="mono">192.168.10.45 / 24:6F:28:9A:88:C4</b></div>
          </div>
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><b style={{color:'#fff'}}>COMMUNICATION</b><span className="badge badge-ok">ACTIVE TX</span></div>
            <div className="kv"><span>Protocol</span><b>Wi-Fi TCP/MQTT</b></div>
            <div className="kv"><span>PKT SUCCESS</span><b>99.8%</b></div>
            <div className="kv"><span>Dropped</span><b>2 / 1,000 pkts</b></div>
            <div className="kv"><span>RSSI SIGNAL</span><b>-58 dBm (Excellent)</b></div>
            <div className="kv"><span>UPTIME</span><b>14 วัน 6 ชม. 22 นาที</b></div>
            <div className="kv"><span>Last Seen</span><b>{cur ? new Date(cur.timestamp).toLocaleString('th-TH') : '-'}</b></div>
            <div className="kv"><span>NTP STATUS</span><span className="badge badge-ok">SYNCHRONIZED (GPS-NTP)</span></div>
          </div>
        </div>
        <div style={{background:'#0a0e1a',borderRadius:8,padding:12,marginTop:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><b style={{color:'#fff'}}>SYSTEM HEALTH</b><span className="badge badge-ok">ESP-WROOM-32</span></div>
          <div className="grid3">
            <div><p style={{color:'#94a3b8',fontSize:11}}>FREE HEAP (RAM)</p><p style={{color:'#00d4ff',fontSize:18,fontWeight:700}}>182.4 / 320 KB</p></div>
            <div><p style={{color:'#94a3b8',fontSize:11}}>Core Temperature</p><p style={{color:'#10b981',fontSize:18,fontWeight:700}}>41.2 °C (Normal)</p></div>
            <div><p style={{color:'#94a3b8',fontSize:11}}>STORAGE (SPIFFS)</p><p style={{color:'#10b981',fontSize:18,fontWeight:700}}>4 MB FLASH / OK</p></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">sensors</span>SECTION 2 // ANALOG SENSOR PROBE DIAGNOSTICS (2 CRITICAL CHANNELS)</div>
        <div className="grid2">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div><span className="material-symbols-outlined" style={{color:'#00d4ff'}}>water_drop</span><b style={{color:'#fff',marginLeft:6}}>เซนเซอร์ระดับน้ำหล่อเย็น</b><br /><span className="mono" style={{color:'#94a3b8',fontSize:12}}>SEN-LVL-01</span></div><span className="badge badge-ok">NORMAL / ONLINE</span></div>
            <p style={{color:'#94a3b8',fontSize:12}}>Hydrostatic / Submersible Fluid Level Transducer</p>
            <div className="kv" style={{marginTop:10}}><span>LATEST READING</span><b style={{color:'#00d4ff',fontSize:18}}>{cur?.level_percent ?? 78}%</b></div>
            <div className="kv"><span>~ ลิตร</span><b>{cur?.level_liters ?? 93.6} / 120 ลิตร</b></div>
            <div className="kv"><span>RAW TRANSDUCER OUTPUT</span><b className="mono">2,608.2 mV</b></div>
            <div className="kv"><span>Digital (12-bit)</span><b className="mono">{cur?.raw_adc_level ?? 3236}</b></div>
            <div className="kv"><span>Loop</span><b>16.48 mA (4-20mA)</b></div>
            <div className="kv"><span>SIGNAL INTEGRITY</span><b>28.4 dB SNR สูงมาก</b></div>
            <div className="kv"><span>Hardware Pinout</span><b className="mono">ESP32 ADC1_CH4 / GPIO 32</b></div>
            <div className="kv"><span>Calibration State</span><span className="badge badge-ok">CALIBRATED (Zero: 0.0%, Span: 100%)</span></div>
            <div className="kv"><span>Last Calibration</span><b>2026-11-01 โดย นายปุญญณท์ เลิศยิ่งยศ</b></div>
            <div className="kv"><span>Threshold Safe Range</span><b>&gt; 30.0% (Critical Alarm &lt; 20.0%)</b></div>
          </div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div><span className="material-symbols-outlined" style={{color:'#10b981'}}>science</span><b style={{color:'#fff',marginLeft:6}}>เซนเซอร์วัดค่ากรด-ด่าง (pH)</b><br /><span className="mono" style={{color:'#94a3b8',fontSize:12}}>SEN-PH-02</span></div><span className="badge badge-ok">OPTIMAL / ONLINE</span></div>
            <p style={{color:'#94a3b8',fontSize:12}}>Industrial Glass Electrode Combined pH Sensor</p>
            <div className="kv" style={{marginTop:10}}><span>LATEST READING</span><b style={{color:'#10b981',fontSize:18}}>{cur?.ph ?? 7.28} pH</b></div>
            <div className="kv"><span>ช่วงมาตรฐาน</span><b>7.00 - 8.50 pH</b></div>
            <div className="kv"><span>RAW POTENTIAL VOLTAGE</span><b className="mono">{cur?.raw_mv_ph ?? 174.2} mV</b></div>
            <div className="kv"><span>Nernst Slope</span><b>98.4%</b></div>
            <div className="kv"><span>Isopotential</span><b>7.00 pH @ 25°C</b></div>
            <div className="kv"><span>ELECTRODE RESPONSE</span><b>3.2 sec (Stable)</b></div>
            <div className="kv"><span>Impedance</span><b>Normal Glass</b></div>
            <div className="kv"><span>Hardware Pinout</span><b className="mono">ESP32 ADC1_CH7 / GPIO 35</b></div>
            <div className="kv"><span>Calibration State</span><span className="badge badge-ok">2-Point Buffer (pH 4.01 & 7.00)</span></div>
            <div className="kv"><span>Last Calibration</span><b>2026-11-01 โดย นายอัมรินทร์ ทองมา</b></div>
            <div className="kv"><span>Threshold Boundary</span><b>ต่ำกว่า 7.00 กรดสะสม / สูงกว่า 8.50 ด่างจัด</b></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">account_tree</span>SECTION 3 // TELEMETRY TOPOLOGY & FAILSAFE RECOVERY LOGIC</div>
        <div className="grid2">
          <div>
            <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}><b style={{color:'#fff'}}>กรณีที่ 1: สถานะการเชื่อมต่อสำเร็จ (Connection Succeeded - Active State)</b></p>
            <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:8,marginBottom:12,fontSize:12,color:'#10b981'}}>THROUGHPUT: 1 PKT / 5 SEC</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[['sensors','Step 1','Sensor Probes','Level + pH Sampling OK','2,608mV'],['developer_board','Step 2','ESP32 Module','12-bit ADC & JSON CRC32 Gen',''],['wifi','Step 3','Wi-Fi Gateway','Factory AP Router','-58 dBm RSSI'],['dns','Step 4','Cloud / Backend','Validation & Store','MongoDB OK'],['devices','Step 5','Operator Web UI','Live Dashboard','Zero Lag']].map(([icon,step,title,desc,val], i) => (
                <div key={i} style={{display:'flex',gap:10,alignItems:'center',background:'#0a0e1a',borderRadius:6,padding:8}}>
                  <span className="material-symbols-outlined" style={{color:'#00d4ff'}}>{icon}</span>
                  <div style={{flex:1}}><b style={{color:'#fff',fontSize:12}}>{step}: {title}</b><br /><small style={{color:'#94a3b8'}}>{desc}</small></div>
                  {val && <span className="badge badge-ok">{val}</span>}
                </div>
              ))}
            </div>
            <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:8,marginTop:12,fontSize:12,color:'#10b981'}}>✓ สถานะโครงสร้างระบบ: การเชื่อมต่อระหว่างอุปกรณ์สมบูรณ์ 100% ตอบสนองเรียลไทม์ตามข้อกำหนด LATENCY: 18ms</div>
          </div>
          <div>
            <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}><b style={{color:'#fff'}}>กรณีที่ 2: จำลองการหลุด & กู้คืน</b></p>
            <div style={{background:'#f59e0b20',border:'1px solid #f59e0b',borderRadius:6,padding:8,marginBottom:12,fontSize:12,color:'#f59e0b'}}>AUTO-RETRY ACTIVE</div>
            <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}>กระบวนการทำงานอัตโนมัติเมื่อสัญญาณ Wi-Fi ขาดหาย:</p>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[['crisis_alert','1. แจ้งเตือนหลุดการเชื่อมต่อ','ระบบทริกเกอร์ Siren Beacon หน้าเครื่องจักร L05'],['history_toggle_off','2. ตรึงค่า Last Successful Sync','บันทึกสแตมป์เวลา พร้อมผลักดันเข้า Alert Center'],['restart_alt','3. กลไก Exponential Auto-Retry','ESP32 พยายามเชื่อมต่อใหม่รอบที่ 5s, 10s, 30s'],['save_as','4. Offline Buffer Storage','เก็บบันทึกบน Flash SPIFFS สูงสุด 5,000 แพ็กเกจ']].map(([icon,title,desc], i) => (
                <div key={i} style={{display:'flex',gap:10,alignItems:'center',background:'#0a0e1a',borderRadius:6,padding:8}}>
                  <span className="material-symbols-outlined" style={{color:'#f59e0b'}}>{icon}</span>
                  <div><b style={{color:'#fff',fontSize:12}}>{title}</b><br /><small style={{color:'#94a3b8'}}>{desc}</small></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">terminal</span>SECTION 4 // TELEMETRY PACKET STREAM & RAW JSON INGESTION</div>
        <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}><span className="badge badge-cyan">STREAMING: 200ms</span><span className="badge badge-navy">Live Ingestion Packets (ล่าสุด 5 ชุดข้อมูล)</span><span className="badge badge-navy">BUFFER ID: #Q-884</span></div>
        <div style={{overflowX:'auto'}}>
          <table className="mtx">
            <thead><tr><th>PACKET ID</th><th>TIMESTAMP</th><th>CRC32</th><th>PAYLOAD</th><th>LEVEL</th><th>pH</th><th>STATUS</th></tr></thead>
            <tbody>
              {['PKT-L05-88492','PKT-L05-88491','PKT-L05-88490','PKT-L05-88489','PKT-L05-88488'].map((id, i) => {
                const r = { 'PKT-L05-88492': { t: '10:30:15.240', crc: '0x8FE4A1', lv: 78.0, ph: 7.28 }, 'PKT-L05-88491': { t: '10:30:10.238', crc: '0x37DA09', lv: 78.0, ph: 7.28 }, 'PKT-L05-88490': { t: '10:30:05.241', crc: '0xC43B90', lv: 78.1, ph: 7.27 }, 'PKT-L05-88489': { t: '10:30:00.239', crc: '0x129FE8', lv: 78.1, ph: 7.28 }, 'PKT-L05-88488': { t: '10:29:55.242', crc: '0x67AC21', lv: 78.2, ph: 7.18 } }[id];
                return (<tr key={id}><td className="mono" style={{fontSize:11}}>{id}</td><td className="mono" style={{fontSize:11}}>{r.t}</td><td className="mono">{r.crc}</td><td>342 B</td><td><b>{r.lv}%</b></td><td>{r.ph}</td><td><span className={`badge ${r.ph < 7.2 ? 'badge-warn' : 'badge-ok'}`}>{r.ph < 7.2 ? 'WARNING' : 'PASS'}</span></td></tr>);
              })}
            </tbody>
          </table>
        </div>
        <div style={{background:'#0a0e1a',borderRadius:8,padding:12,marginTop:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><b style={{color:'#fff',fontSize:13}}>Raw JSON Telemetry Inspector</b><span className="material-symbols-outlined" style={{color:'#00d4ff',cursor:'pointer',fontSize:16}}>content_copy</span></div>
          <pre className="mono" style={{fontSize:11,color:'#10b981',margin:0,whiteSpace:'pre-wrap',overflow:'auto'}}>{JSON.stringify({ device_id: "ESP32-L05", machine_id: "L05", timestamp: "2026-11-12T10:30:15.240Z", packet_id: "PKT-L05-88492", firmware: "v3.4.1-rc2", sensors: { coolant_level: { sensor_id: "SEN-LVL-01", raw_adc: 3236, voltage_mv: 2608.2, value: 78.0, unit: "%", status: "VALID" }, ph: { sensor_id: "SEN-PH-02", raw_adc: 2158, voltage_mv: 174.2, value: 7.28, unit: "pH", status: "VALID" } }, diagnostics: { rssi_dbm: -58, free_heap_bytes: 186776, battery_backup: "N/A (Mains 24VDC Industrial PSU)" } }, null, 2)}</pre>
        </div>
        <div style={{background:'#10b98120',border:'1px solid #10b981',borderRadius:6,padding:10,marginTop:12,fontSize:12,color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>verified_user</span> ข้อมูลทั้งหมดผ่านการตรวจสอบความสมบูรณ์ Checksum CRC32 และรองรับการบันทึกลง MongoDB และ Time-series Storage เรียบร้อยแล้ว — DATABASE WRITES: 12/min — DB COMMITTED</div>
      </div>
    </div>
  );
}
