import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import Analysis from './pages/Analysis';
import Alerts from './pages/Alerts';
import Maintenance from './pages/Maintenance';
import History from './pages/History';
import DeviceStatus from './pages/DeviceStatus';
import Thresholds from './pages/Thresholds';
import SystemUsers from './pages/SystemUsers';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/history" element={<History />} />
        <Route path="/device" element={<DeviceStatus />} />
        <Route path="/thresholds" element={<Thresholds />} />
        <Route path="/system" element={<SystemUsers />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
