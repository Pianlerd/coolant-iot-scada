import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const MENU = [['/', 'space_dashboard', 'Dashboard (สรุปภาพรวม)'], ['/monitoring', 'sensors', 'Live Monitoring (เรียลไทม์)'], ['/analysis', 'monitoring', 'Coolant Analysis (คุณภาพ)'], ['/alerts', 'notifications_active', 'Alert Center (แจ้งเตือน)'], ['/maintenance', 'build_circle', 'Maintenance (บำรุงรักษา)'], ['/history', 'history', 'History (ประวัติย้อนหลัง)']];
const SYS = [['/device', 'hub', 'Device & Sensor Status'], ['/thresholds', 'tune', 'Threshold Settings (ตั้งค่า)'], ['/system', 'person', 'System & Users (ผู้ใช้งาน)']];

export default function Layout() {
  const [user, setUser] = useState(null);
  const [tele, setTele] = useState(null);
  const [machines, setMachines] = useState([]);
  const [pending, setPending] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.getToken()) { navigate('/login'); return; }
    api.getMe().then(d => setUser(d.user)).catch(() => navigate('/login'));
    api.getAlerts('PENDING').then(a => setPending(a.length)).catch(() => {});
    api.getMachines().then(setMachines).catch(() => {});
    const load = async () => { try { setTele(await api.getCurrent('L05')); } catch {} };
    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, []);

  const role = user?.role === 'ADMIN' ? 'ADMIN' : 'EDIT';

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo"><span className="material-symbols-outlined" style={{fontSize:22}}>vital_signs</span></div>
          <div className="brand-text"><b>COOLANT IOT</b><small>INTELLIGENT TELEMETRY</small></div>
          <span className="badge-active" style={{marginLeft:'auto'}}>L05 ACTIVE</span>
        </div>
        <p className="menu-title">MAIN MENU</p>
        {MENU.map(([to, icon, label]) => (<NavLink key={to} to={to} end={to === '/'} className={({isActive}) => 'menu-item' + (isActive ? ' active' : '')}><span className="material-symbols-outlined">{icon}</span><span>{label}</span></NavLink>))}
        <p className="menu-title">SYSTEM & DEVICES</p>
        {SYS.map(([to, icon, label]) => (<NavLink key={to} to={to} className={({isActive}) => 'menu-item' + (isActive ? ' active' : '')}><span className="material-symbols-outlined">{icon}</span><span>{label}</span></NavLink>))}
        <div className="user-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><div className="role">ROLE: {role}</div><div className="name">{user?.name || '...'}</div></div>
            <span className="material-symbols-outlined" style={{color:'#64748b'}}>verified_user</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11}}>
            <span className="status">● ESP32: Online</span><span style={{color:'#94a3b8'}}>Pkts: 100%</span>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <select className="machine-select"><option>🔧 เครื่องจักร L05 (CNC 5-Axis Milling)</option>{machines.filter(m => m.id !== 'L05').map(m => <option key={m.id}>🔧 เครื่องจักร {m.id} ({m.name})</option>)}</select>
          <div className="chip"><span className="material-symbols-outlined" style={{fontSize:16}}>schedule</span><span>{tele ? new Date(tele.timestamp).toLocaleString('th-TH') : '...'}</span><span style={{color:'#64748b'}}>(Sync 5s)</span></div>
          <div className="chip"><span style={{color:'#94a3b8'}}>Level</span><span className="val">{tele?.level_percent ?? '--'}%</span></div>
          <div className="chip"><span style={{color:'#94a3b8'}}>pH</span><span className="val">{tele?.ph ?? '--'}</span></div>
          <span className="badge-normal">● Normal</span>
          <div style={{flex:1}} />
          <div className="bell" onClick={() => navigate('/alerts')}><span className="material-symbols-outlined">notifications</span>{pending > 0 && <b>{pending}</b>}</div>
          <div className="who"><span className="material-symbols-outlined" style={{color:'#94a3b8'}}>person</span><div><b>{user?.name || 'Loading...'}</b><small>ROLE: <span className="role">{role}</span></small></div></div>
        </header>
        <div className="subbar"><span className="dot" /><span className="mono">SCADA GATEWAY : ONLINE (192.168.10.45:8883)</span><span style={{color:'#1e2d3d'}}>/</span><span className="mono">🛡 TLS 1.3 SHA-256 CIPHER</span><span style={{color:'#1e2d3d'}}>/</span><span className="mono">POLL SYNC: 5000 ms</span></div>
        <div className="sysbar"><span className="tag">SYSTEM BUILD: v3.4.1-rc2</span><span className="tag" style={{color:'#10b981',borderColor:'#10b981'}}>SCADA INDUSTRIAL ED.</span></div>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
