import { useState } from 'react';

const MATRIX = [['monitoring','ดูแดชบอร์ดภาพรวมและสถานะเรียลไทม์ (Live Telemetry: Level & pH)',true,true,'Sync telemetry refresh ทุก 5 วินาที'],['insights','ดูกราฟแนวโน้มคุณภาพน้ำและประวัติย้อนหลัง (History & Analytics)',true,true,'ดูย้อนหลังได้สูงสุด 90 วัน'],['notifications_active','กดรับทราบการแจ้งเตือน (Acknowledge) และปิดเสียงหวูดเตือน (Mute Siren)',false,true,'บันทึกชื่อผู้กด Ack ลงใน Log ทันที'],['build_circle','สร้าง/แก้ไข บันทึกการบำรุงรักษา (Add Maintenance Log / Refill / Replace)',false,true,'แนบรหัสช่างและผลประเมินสภาพน้ำ'],['tune','ปรับตั้งค่าเกณฑ์แจ้งเตือน (Threshold Cutoff/Warning: Level & pH)',false,true,'ต้องยืนยันรหัสผ่านช่างซ่อมบำรุง'],['memory','ทดสอบการเชื่อมต่อ ESP32, ส่งคำสั่ง Ping, และ Calibrate เซนเซอร์',false,true,'บันทึกค่า Offset เดิมและใหม่ใน Audit']];
const ADVISORS = [['นางสาวทิพย์ทียา อินทร์ทรัพย์','ครูสาขาช่างกลโรงงาน','ที่ปรึกษาหลัก'],['นายเอกชัย สบายจิตร','ครูสาขาช่างกลโรงงาน','ที่ปรึกษาร่วม'],['นายกฤษดา อนามนต์','ครูสาขาช่างกลโรงงาน','ที่ปรึกษาร่วม']];
const STUDENTS = [['1. นายปุญญณท์ เลิศยิ่งยศ','ปวส.1 สาขาเทคนิคการผลิต','Hardware & Sensor Integration Lead','Role: Edit','Active'],['2. นายอัมรินทร์ ทองมา','ปวส.1 สาขาเทคนิคการผลิต','CNC Mechanical & Coolant Analysis','Role: Edit','Active'],['3. นายเพียรเลิศ พรั่งเพราะ','ปวส.1 สาขาเทคโนโลยีสารสนเทศ','ESP32 Firmware & Cloud Telemetry Ingestion','Admin/Edit','Active'],['4. นางสาวโอปอล วงศ์สุวรรณ','ปวส.1 สาขาเทคโนโลยีสารสนเทศ','Web Frontend & SCADA UI/UX Design','Role: Edit','Active'],['5. นายเดชาธร บุตตะชาพัทธ์','ปวส.1 สาขาเทคโนโลยีสารสนเทศ','Database Architecture & Telemetry Streaming','Role: Edit','Active']];
const AUDIT = [['2026-11-12 10:28:14','login','เข้าสู่ระบบสำเร็จ (Login Success - 2FA Token Validated)','สมชาย เก่งกล้า','192.168.10.45','Authorized'],['2026-11-12 09:15:22','build_circle','บันทึกงานบำรุงรักษา (Add Maintenance REC-2026-102)','สมชาย เก่งกล้า','192.168.10.45','Recorded'],['2026-11-01 08:30:14','tune','ปรับเปลี่ยนเกณฑ์เตือน Warning Level เป็น 30.0%','สมชาย เก่งกล้า','192.168.10.45','Updated'],['2026-10-31 16:45:00','logout','ออกจากระบบตามรอบเวลา (Normal Session Logout)','สมชาย เก่งกล้า','192.168.10.45','Success']];

export default function SystemUsers() {
  const [role, setRole] = useState('EDIT');
  return (
    <div>
      <div className="card">
        <div className="card-title" style={{fontSize:17}}><span className="material-symbols-outlined">person</span>SYSTEM & USERS / ข้อมูลผู้ใช้งานและสิทธิ์ระบบ</div>
        <p style={{fontSize:13,color:'#94a3b8',marginBottom:12}}>จัดการโปรไฟล์ผู้ใช้งาน ตรวจสอบสิทธิ์การเข้าถึงระดับบทบาท (Role-based Access Control: View / Edit) อุปกรณ์ยืนยันตัวตน และบันทึกกิจกรรมความปลอดภัย (Security Audit Log) ตามขอบเขตงานวิจัยสถาบันเทคโนโลยีจิตรลดา</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-outline" onClick={() => setRole(role === 'EDIT' ? 'VIEW' : 'EDIT')}><span className="material-symbols-outlined" style={{fontSize:16}}>swap_horiz</span>สลับบทบาทจำลอง ({role})</button>
          <button className="btn btn-outline"><span className="material-symbols-outlined" style={{fontSize:16}}>file_download</span>ส่งออกรายงานสิทธิ์</button>
          <button className="btn btn-cyan"><span className="material-symbols-outlined" style={{fontSize:16}}>save</span>บันทึกการแก้ไขโปรไฟล์</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">shield_person</span>OPERATOR PROFILE — กะ A (Shift 08:00 - 16:30 น.) <span className="badge badge-cyan" style={{marginLeft:'auto'}}>ROLE: {role}</span></div>
        <div className="grid2">
          <div><div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>engineering</span> ชื่อ-นามสกุล / รหัส</span><b>นายสมชาย เก่งกล้า — ENG-2024-0492</b></div><div className="kv"><span>ตำแหน่ง</span><b>หัวหน้าวิศวกรซ่อมบำรุงและควบคุมระบบ (Chief Maintenance Engineer)</b></div><div className="kv"><span>สังกัด</span><b>แผนกซ่อมบำรุงเครื่องจักรกลอัตโนมัติ</b></div><div className="kv"><span>อีเมลประจำตัว</span><b className="mono">somchai.k@chitsralada.ac.th</b></div><div className="kv"><span>เบอร์โทรสถานี</span><b>081-456-7890 (Line 1 Ext. 105)</b></div></div>
          <div><div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>token</span> อุปกรณ์ยืนยัน 2FA</span><b>FIDO2 / YubiKey — <span className="badge badge-ok">Active</span></b></div><div className="kv"><span>สถานีเครื่องจักรที่รับผิดชอบ</span><b>L05 CNC 5-Axis Milling</b></div><div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>schedule</span> เข้าใช้งานล่าสุด</span><b>2026-11-12 10:28:14 น.</b></div><div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>desktop_windows</span> เทอร์มินัล & IP</span><b className="mono">PC-L05-SCADA (192.168.10.45)</b></div><div className="kv"><span>สิทธิ์เข้าถึง</span><span className="badge badge-ok">Tier 2 Certified</span></div><div className="kv"><span>เซสชันคงเหลือ</span><b className="mono">07:18:42 ชม.</b></div></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">precision_manufacturing</span>ขอบเขตสายการผลิต (Assigned Lines) <span className="badge badge-navy" style={{marginLeft:'auto'}}>ID: PROD-LINE-01</span></div>
        <div className="grid3">
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><b style={{color:'#fff'}}>L05</b><span style={{width:8,height:8,borderRadius:'50%',background:'#10b981'}} /></div><div style={{color:'#e5e7eb',fontSize:13,fontWeight:600}}>CNC 5-Axis Milling (Main)</div><div style={{color:'#94a3b8',fontSize:11,marginTop:4}}>ESP32 Telemetry • Ultrasonic + pH Probe</div><span className="badge badge-ok" style={{marginTop:8}}>ONLINE</span></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}><b style={{color:'#fff'}}>L06</b><span style={{width:8,height:8,borderRadius:'50%',background:'#f59e0b'}} /></div><div style={{color:'#e5e7eb',fontSize:13,fontWeight:600}}>CNC High-Speed Lathe</div><div style={{color:'#94a3b8',fontSize:11,marginTop:4}}>ESP32 Telemetry • pH Sensor Node B</div><span className="badge badge-warn" style={{marginTop:8}}>STANDBY</span></div>
          <div style={{background:'#0a0e1a',borderRadius:8,padding:12}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}><span className="material-symbols-outlined" style={{color:'#f59e0b'}}>bolt</span><b style={{color:'#fff'}}>สิทธิ์ E-Stop & Sensor Calibration</b></div><div style={{color:'#94a3b8',fontSize:11}}>สามารถสั่งชัตดาวน์ระบบปั๊มน้ำหล่อเย็นฉุกเฉินได้ทันที</div><span className="badge badge-crit" style={{marginTop:8}}>GRANTED</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">rule</span>ตารางเปรียบเทียบสิทธิ์การใช้งานระบบ (Role Matrix: View vs Edit)</div>
        <p style={{color:'#94a3b8',fontSize:12,marginBottom:10}}>จำแนกตามโครงสร้างระบบติดตามและควบคุมคุณภาพน้ำหล่อเย็นอัจฉริยะ</p>
        <div style={{overflowX:'auto'}}>
          <table className="mtx">
            <thead><tr><th>ฟังก์ชันและขอบเขตการทำงาน (System Capabilities)</th><th><span className="material-symbols-outlined" style={{fontSize:14,verticalAlign:'middle'}}>visibility</span> Role: View</th><th><span className="material-symbols-outlined" style={{fontSize:14,verticalAlign:'middle'}}>edit_note</span> Role: Edit</th><th>มาตรการควบคุม / บันทึกความปลอดภัย</th></tr></thead>
            <tbody>
              {MATRIX.map(([icon, label, v, e, ctrl], i) => (<tr key={i}><td><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle',color:'#00d4ff'}}>{icon}</span> {label}</td><td>{v ? <span style={{color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>check_circle</span> อนุญาต</span> : <span style={{color:'#ef4444'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>cancel</span> ปิดกั้น (Read-only)</span>}</td><td>{e ? <span style={{color:'#10b981'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>check_circle</span> อนุญาต</span> : <span style={{color:'#ef4444'}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>cancel</span> ปิดกั้น</span>}</td><td style={{color:'#94a3b8',fontSize:12}}>{ctrl}</td></tr>))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">school</span>คณะผู้ประดิษฐ์และที่ปรึกษางานวิจัย (Research Project Team & Inventors)</div>
        <p style={{color:'#94a3b8',fontSize:13,marginBottom:12}}>โครงการวิจัย "ระบบติดตามและควบคุมคุณภาพน้ำหล่อเย็นอัจฉริยะสำหรับเครื่องจักรกล CNC" สถาบันเทคโนโลยีจิตรลดา ได้รับการสนับสนุนโดย วช. (สำนักงานการวิจัยแห่งชาติ - NRCT) <span className="badge badge-cyan" style={{marginLeft:8}}>NRCT INNOVATION 2026</span></p>
        <div className="card-title" style={{fontSize:14}}><span className="material-symbols-outlined">supervisor_account</span>ครูที่ปรึกษาโครงการ (Advisory Board • Role: Supervisor / Admin) — 3 ท่าน</div>
        <div className="grid3" style={{marginBottom:14}}>
          {ADVISORS.map(([n, r, role], i) => (<div key={i} style={{background:'#0a0e1a',borderRadius:8,padding:12}}><b style={{color:'#fff'}}>{n}</b><br /><span style={{color:'#94a3b8',fontSize:12}}>{r}</span><br /><span className="badge badge-navy" style={{marginTop:8}}>{role} • Admin</span></div>))}
        </div>
        <div className="card-title" style={{fontSize:14}}><span className="material-symbols-outlined">groups</span>คณะนักศึกษาผู้ประดิษฐ์ (Student Innovators • Role: Edit Privileges) — ปวส.1 (5 คน)</div>
        <div style={{overflowX:'auto'}}>
          <table className="mtx">
            <thead><tr><th>รายชื่อผู้ประดิษฐ์</th><th>ระดับการศึกษา / แผนกสาขา</th><th>หน้าที่รับผิดชอบในงานวิจัย</th><th>สิทธิ์ระบบ</th><th>สถานะ</th></tr></thead>
            <tbody>
              {STUDENTS.map(([n, edu, duty, role, st], i) => (<tr key={i}><td><b style={{color:'#fff'}}>{n}</b></td><td>{edu}</td><td style={{fontSize:12}}>{duty}</td><td><span className="badge badge-info">{role}</span></td><td><span className="badge badge-ok">{st}</span></td></tr>))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">security</span>การตั้งค่าความปลอดภัย (Security Rules)</div>
          <div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>lock</span> บังคับ 2FA (Two-Factor Authentication)</span><b>ต้องแตะ YubiKey หรือใส่ OTP เมื่อแก้ไขเกณฑ์</b></div>
          <div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>devices</span> บันทึก IP & MAC Address</span><b>ฝังข้อมูลลง Audit Log ทันทีที่สั่งเซฟเกณฑ์</b></div>
          <div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>notifications_active</span> แจ้งเตือนเมื่อล็อกอินจากอุปกรณ์ใหม่</span><b>ส่ง Telegram/Email ไปยังช่างซ่อมบำรุง</b></div>
        </div>
        <div className="card">
          <div className="card-title"><span className="material-symbols-outlined">devices</span>เซสชันที่เชื่อมต่ออยู่ (Active Sessions) <button className="btn btn-red" style={{marginLeft:'auto',padding:'4px 10px',fontSize:11}}>ตัดการเชื่อมต่อเซสชันอื่น</button></div>
          <div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>desktop_windows</span> <b>Chrome on Windows</b><br /><small style={{color:'#94a3b8'}}>SCADA PC อุปกรณ์นี้<br />IP: 192.168.10.45 • กรุงเทพฯ, ไทย</small></span><span className="badge badge-ok">ONLINE</span></div>
          <div className="kv"><span><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>tablet_mac</span> <b>Android Industrial Tablet L05</b><br /><small style={{color:'#94a3b8'}}>IP: 192.168.10.78 • เข้าสู่ระบบเมื่อ 1 ชม. ที่แล้ว</small></span><span className="badge badge-ok">Sync 5s</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><span className="material-symbols-outlined">history_toggle_off</span>บันทึกกิจกรรมความปลอดภัย (Security Audit Log) <span className="badge badge-navy" style={{marginLeft:'auto'}}>แสดง 4 รายการล่าสุด</span> <button className="btn btn-outline" style={{padding:'4px 10px',fontSize:11}}><span className="material-symbols-outlined" style={{fontSize:14,verticalAlign:'middle'}}>arrow_downward</span> ดาวน์โหลด Log</button></div>
        <div style={{overflowX:'auto'}}>
          <table className="mtx">
            <thead><tr><th>วัน-เวลา (Timestamp)</th><th>กิจกรรม / รายละเอียดการกระทำ (Event)</th><th>ผู้ใช้งาน</th><th>IP Address</th><th>สถานะ</th></tr></thead>
            <tbody>
              {AUDIT.map(([ts, icon, ev, who, ip, st], i) => (<tr key={i}><td className="mono" style={{fontSize:11}}>{ts}</td><td><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle',color:'#00d4ff'}}>{icon}</span> {ev}</td><td>{who}</td><td className="mono">{ip}</td><td><span className="badge badge-ok">{st}</span></td></tr>))}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:12,color:'#10b981',marginTop:10}}><span className="material-symbols-outlined" style={{fontSize:16,verticalAlign:'middle'}}>lock</span> Audit Trail Cryptographically Chained (SHA-256 Signature Verified) • CRC-32: OK</p>
      </div>
    </div>
  );
}
