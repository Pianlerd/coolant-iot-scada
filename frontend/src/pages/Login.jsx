

 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const ROLES = [
  { id: 'EDIT', title: 'วิศวกรซ่อมบำรุง', desc: 'บันทึกค่า / แก้ไขเกณฑ์แจ้งเตือน' },
  { id: 'VIEW', title: 'ผู้สังเกตการณ์ / หัวหน้างาน', desc: 'ดูเรียลไทม์ และสถิติอย่างเดียว' },
  { id: 'ADMIN', title: 'ผู้ดูแลระบบวิจัย', desc: 'ตั้งค่าฮาร์ดแวร์ & อุปกรณ์' }
];

export default function Login() {
  const [username, setUsername] = useState('somchai.k');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('EDIT');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const data = await api.login(username, password);
      api.setToken(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#0a0e1a'}}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo"><span className="material-symbols-outlined" style={{fontSize:22}}>vital_signs</span></div>
          <div className="brand-text"><b>COOLANT IOT</b><small>INTELLIGENT TELEMETRY</small></div>
          <span className="badge-active" style={{marginLeft:'auto'}}>L05 ACTIVE</span>
        </div>
        <p className="menu-title">MAIN MENU</p>
        {[['/','space_dashboard','Dashboard'],['/monitoring','sensors','Live Monitoring'],['/analysis','monitoring','Coolant Analysis'],['/alerts','notifications_active','Alert Center'],['/maintenance','build_circle','Maintenance'],['/history','history','History']].map(([to,icon,label]) => (
          <div key={to} className="menu-item"><span className="material-symbols-outlined">{icon}</span><span>{label}</span></div>
        ))}
        <p className="menu-title">SYSTEM & DEVICES</p>
        {[['/device','hub','Device & Sensor Status'],['/thresholds','tune','Threshold Settings']].map(([to,icon,label]) => (
          <div key={to} className="menu-item"><span className="material-symbols-outlined">{icon}</span><span>{label}</span></div>
        ))}
        <div className="user-card">
          <div><div className="role">ROLE: EDIT</div><div className="name">สมชาย เก่งกล้า</div></div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11}}>
            <span className="status">● ESP32: Online</span><span style={{color:'#94a3b8'}}>Pkts: 100%</span>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <select className="machine-select"><option>🔧 เครื่องจักร L05 (CNC 5-Axis Milling)</option></select>
          <div className="chip"><span className="material-symbols-outlined" style={{fontSize:16}}>schedule</span><span>2026-11-12 10:30:15</span><span style={{color:'#64748b'}}>(Sync 5s)</span></div>
          <div className="chip"><span style={{color:'#94a3b8'}}>Level</span><span className="val">78%</span></div>
          <div className="chip"><span style={{color:'#94a3b8'}}>pH</span><span className="val">7.28</span></div>
          <span className="badge-normal">● Normal</span>
          <div style={{flex:1}} />
          <div className="bell"><span className="material-symbols-outlined">notifications</span><b>3</b></div>
          <div className="who"><span className="material-symbols-outlined" style={{color:'#94a3b8'}}>person</span><div><b>สมชาย เก่งกล้า</b><small>ROLE: <span className="role">EDIT</span></small></div></div>
        </header>
        <div className="subbar"><span className="dot" /><span className="mono">SCADA GATEWAY : ONLINE (192.168.10.45:8883)</span><span style={{color:'#1e2d3d'}}>/</span><span className="mono">🛡 TLS 1.3 SHA-256 CIPHER</span></div>
        <div className="sysbar"><span className="tag">SYSTEM BUILD: v3.4.1-rc2</span><span className="tag" style={{color:'#10b981',borderColor:'#10b981'}}>SCADA INDUSTRIAL ED.</span></div>

        <main className="content" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,alignItems:'start'}}>
          <div>
            <div className="card">
              <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                <span className="badge" style={{background:'#1e293b',color:'#00d4ff',display:'flex',alignItems:'center',gap:4}}>
                  <span className="material-symbols-outlined" style={{fontSize:14}}>school</span>สถาบันเทคโนโลยีจิตรลดา (CDTI)
                </span>
                <span className="badge" style={{background:'#1e293b',color:'#10b981',display:'flex',alignItems:'center',gap:4}}>
                  <span className="material-symbols-outlined" style={{fontSize:14}}>science</span>สนับสนุนโดย วช. (NRCT)
                </span>
              </div>
              <h1 style={{color:'#fff',fontSize:22,fontWeight:700,marginBottom:8,lineHeight:1.3}}>ระบบติดตามและควบคุมคุณภาพน้ำหล่อเย็นอัจฉริยะ</h1>
              <p style={{color:'#94a3b8',fontSize:13,lineHeight:1.6}}>(Intelligent Coolant Level & pH Monitoring System for CNC Machinery) — งานวิจัยประยุกต์พัฒนาระบบเซนเซอร์อัจฉริยะ ตรวจวัดและประมวลผลข้อมูลปริมาณและค่า pH แบบเรียลไทม์ เพื่อการบำรุงรักษาเชิงคาดการณ์ (Predictive Maintenance)</p>
              <div className="grid2" style={{marginTop:16}}>
                <div style={{background:'#0a0e1a',border:'1px solid #1e2d3d',borderRadius:8,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <b style={{color:'#fff',fontSize:13}}>STATION L05</b><span style={{width:8,height:8,borderRadius:'50%',background:'#10b981'}} />
                  </div>
                  <div style={{color:'#e5e7eb',fontSize:14,fontWeight:600}}>5-Axis Milling</div>
                  <div style={{color:'#94a3b8',fontSize:12,marginTop:4}}>Level: <span style={{color:'#00d4ff'}}>78%</span> • pH <span style={{color:'#10b981'}}>7.28</span></div>
                </div>
                <div style={{background:'#0a0e1a',border:'1px solid #1e2d3d',borderRadius:8,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <b style={{color:'#fff',fontSize:13}}>STATION L06</b><span style={{width:8,height:8,borderRadius:'50%',background:'#10b981'}} />
                  </div>
                  <div style={{color:'#e5e7eb',fontSize:14,fontWeight:600}}>High-Speed Lathe</div>
                  <div style={{color:'#94a3b8',fontSize:12,marginTop:4}}>Level: <span style={{color:'#00d4ff'}}>82%</span> • pH <span style={{color:'#10b981'}}>7.40</span></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-title" style={{justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span className="material-symbols-outlined">precision_manufacturing</span><span>HARDWARE TARGET : CNC MACHINE L05</span></div>
                <span className="badge badge-ok">ONLINE TELEMETRY</span>
              </div>
              <div style={{background:'#0a0e1a',border:'1px solid #1e2d3d',borderRadius:8,overflow:'hidden',marginBottom:12}}>
                <div style={{height:180,background:'linear-gradient(135deg,#1e293b,#0f1724)',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <span className="material-symbols-outlined" style={{fontSize:80,color:'#1e3a5f'}}>precision_manufacturing</span>
                  <div style={{position:'absolute',top:10,left:10,background:'#10b981',color:'#0a0e1a',padding:'3px 8px',borderRadius:4,fontSize:11,fontWeight:700}}>● LIVE</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:10,background:'#0a0e1a',borderTop:'1px solid #1e2d3d'}}>
                  <span style={{color:'#10b981',fontSize:12,display:'flex',alignItems:'center',gap:4}}><span style={{width:6,height:6,borderRadius:'50%',background:'#10b981'}} /><b>ESP32 IoT Node v2.1</b></span>
                  <span className="mono" style={{color:'#00d4ff',fontSize:12}}>IP: 192.168.10.105</span>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:18}}>router</span>
                  <div style={{flex:1}}><div style={{color:'#94a3b8',fontSize:11}}>โพรโทคอลสื่อสารข้อมูล:</div><div style={{color:'#fff',fontSize:13,fontWeight:500}}>MQTT over WebSocket (WSS)</div></div>
                </div>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:18}}>sensors</span>
                  <div style={{flex:1}}><div style={{color:'#94a3b8',fontSize:11}}>เซนเซอร์ตรวจสอบ:</div><div style={{color:'#fff',fontSize:13,fontWeight:500}}>Ultrasonic Level + Analog pH v2</div></div>
                </div>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:18}}>security</span>
                  <div style={{flex:1}}><div style={{color:'#94a3b8',fontSize:11}}>มาตรฐานความปลอดภัย:</div><div style={{color:'#fff',fontSize:13,fontWeight:500}}>ISO 9001 / IATF 16949 Comply</div></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-title"><span className="material-symbols-outlined">groups</span>คณะผู้ประดิษฐ์และวิจัย</div>
              <p style={{color:'#94a3b8',fontSize:12,lineHeight:1.6}}>โรงเรียนจิตรลดาวิชาชีพ สถาบันเทคโนโลยีจิตรลดา | สาขาช่างกลโรงงาน และ สาขาเทคโนโลยีสารสนเทศ ภายใต้ทุนสนับสนุนสำนักงานการวิจัยแห่งชาติ (วช.)</p>
            </div>
          </div>

          <div>
            <div className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:40,height:40,background:'#1e293b',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:24}}>badge</span>
                  </div>
                  <div><div style={{color:'#fff',fontSize:16,fontWeight:700}}>เข้าสู่ระบบควบคุมและตรวจวัด</div><div style={{color:'#64748b',fontSize:11,letterSpacing:1}}>OPERATOR SCADA AUTHENTICATION GATEWAY</div></div>
                </div>
                <span className="badge badge-ok" style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:6,height:6,borderRadius:'50%',background:'#fff'}} />PORTAL ACTIVE</span>
              </div>
              <div style={{color:'#94a3b8',fontSize:11,letterSpacing:1,marginBottom:10}}>เลือกรูปแบบสิทธิ์ผู้ใช้งาน (SELECT SECURITY PROFILE)</div>
              <div className="grid3" style={{marginBottom:16}}>
                {ROLES.map(r => (
                  <div key={r.id} onClick={() => setRole(r.id)} style={{background: role === r.id ? '#00d4ff15' : '#0a0e1a', border: `1px solid ${role === r.id ? '#00d4ff' : '#1e2d3b'}`, borderRadius: 8, padding: 12, cursor: 'pointer', position: 'relative'}}>
                    {role === r.id && <span className="material-symbols-outlined" style={{position:'absolute',top:8,right:8,color:'#00d4ff',fontSize:18}}>check_circle</span>}
                    <div style={{background:'#1e293b',color:'#00d4ff',padding:'2px 8px',borderRadius:4,fontSize:10,fontWeight:700,display:'inline-block',marginBottom:6}}>ROLE: {r.id}</div>
                    <div style={{color:'#fff',fontSize:13,fontWeight:600,marginBottom:4}}>{r.title}</div>
                    <div style={{color:'#64748b',fontSize:11}}>{r.desc}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:12}}>
                <div>
                  <label style={{margin:0,display:'flex',alignItems:'center',gap:6,marginBottom:4}}><span className="material-symbols-outlined" style={{fontSize:14}}>person</span>รหัสพนักงาน / บัญชีผู้ใช้งาน (OPERATOR ID / USERNAME)</label>
                  <div style={{position:'relative'}}>
                    <span className="material-symbols-outlined" style={{position:'absolute',left:10,top:10,color:'#64748b',fontSize:18}}>badge</span>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="somchai.k" style={{paddingLeft:36}} required />
                  </div>
                </div>
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                    <label style={{margin:0,display:'flex',alignItems:'center',gap:6}}><span className="material-symbols-outlined" style={{fontSize:14}}>lock</span>รหัสผ่านความปลอดภัย (SECURITY CREDENTIAL)</label>
                    <a href="#" style={{color:'#00d4ff',fontSize:11,textDecoration:'none'}}>ขอรีเซ็ตรหัสผ่าน</a>
                  </div>
                  <div style={{position:'relative'}}>
                    <span className="material-symbols-outlined" style={{position:'absolute',left:10,top:10,color:'#64748b',fontSize:18}}>key</span>
                    <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{paddingLeft:36,paddingRight:36}} required />
                    <span className="material-symbols-outlined" onClick={() => setShowPwd(!showPwd)} style={{position:'absolute',right:10,top:10,color:'#64748b',fontSize:18,cursor:'pointer'}}>{showPwd ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
                <div className="grid2">
                  <div>
                    <label style={{marginBottom:4}}>สถานีเครื่องจักรเป้าหมาย (TARGET CNC STATION)</label>
                    <select><option>CNC L05 (5-Axis Milling - Line 1)</option><option>CNC L06 (Lathe Precision - Line 1)</option><option>ALL CNC PODS (Supervisory Overview)</option></select>
                  </div>
                  <div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                      <label style={{margin:0}}>2FA TOKEN / FIDO2</label>
                      <span style={{color:'#10b981',fontSize:11,display:'flex',alignItems:'center',gap:4}}><span style={{width:6,height:6,borderRadius:'50%',background:'#10b981'}} />READY</span>
                    </div>
                    <div style={{position:'relative'}}>
                      <span className="material-symbols-outlined" style={{position:'absolute',left:10,top:10,color:'#64748b',fontSize:18}}>token</span>
                      <input type="text" placeholder="492-801" style={{paddingLeft:36}} />
                    </div>
                  </div>
                </div>
                <div style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                  <label style={{display:'flex',alignItems:'center',gap:6,margin:0,cursor:'pointer',fontSize:12,color:'#94a3b8'}}>
                    <input type="checkbox" defaultChecked style={{width:'auto'}} />จดจำเทอร์มินัลนี้สำหรับสถานีควบคุมหน้าเครื่อง (8 ชั่วโมง)
                  </label>
                  <span style={{color:'#64748b',fontSize:12,display:'flex',alignItems:'center',gap:4}}><span className="material-symbols-outlined" style={{fontSize:14}}>timer</span>SCADA Auto-lock: 15m</span>
                </div>
                {error && <div style={{background:'#ef444420',border:'1px solid #ef4444',color:'#ef4444',padding:10,borderRadius:6,fontSize:13}}>⚠️ {error}</div>}
                <button type="submit" disabled={loading} className="btn btn-cyan" style={{width:'100%',justifyContent:'center',padding:12,fontSize:14,fontWeight:600}}>
                  <span className="material-symbols-outlined">login</span>{loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบควบคุม (Access SCADA Dashboard)'}
                </button>
                <button type="button" onClick={() => { api.setToken('quick-view'); navigate('/'); }} className="btn btn-dark" style={{width:'100%',justifyContent:'center'}}>
                  <span className="material-symbols-outlined">visibility</span>เข้าใช้งานโหมดสังเกตการณ์ทันที (Quick View Mode - Read Only)
                </button>
              </form>
            </div>
            <div className="card" style={{display:'flex',gap:12,alignItems:'center',padding:14}}>
              <span className="material-symbols-outlined" style={{color:'#00d4ff',fontSize:24}}>verified_user</span>
              <div style={{flex:1,fontSize:12,color:'#94a3b8'}}><b style={{color:'#fff'}}>ระบบจำกัดการเข้าถึงเฉพาะบุคลากรที่ผ่านการอบรมตามมาตรฐานความปลอดภัย</b><br />ศูนย์ซ่อมบำรุงและเทคโนโลยีสารสนเทศ</div>
              <div style={{fontSize:12,color:'#00d4ff',textAlign:'right'}}><b>โทร 081-456-7890</b><br /><span style={{color:'#64748b'}}>(Line 1 Ext. 105)</span></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

