const API = 'http://localhost:3001/api';
export const api = {
  getToken: () => localStorage.getItem('coolant_token'),
  setToken: (t) => localStorage.setItem('coolant_token', t),
  clearToken: () => localStorage.removeItem('coolant_token'),
  async request(method, path, body) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Request failed'); }
    return res.json();
  },
  login: (u, p) => api.request('POST', '/auth/login', { username: u, password: p }),
  getMe: () => api.request('GET', '/auth/me'),
  getMachines: () => api.request('GET', '/telemetry/machines'),
  getCurrent: (id) => api.request('GET', `/telemetry/current/${id}`),
  getHistory: (id, limit = 50) => api.request('GET', `/telemetry/history/${id}?limit=${limit}`),
  simulate: (id) => api.request('POST', '/telemetry/simulate', { machine_id: id }),
  getAlerts: (s) => api.request('GET', `/alerts${s ? `?status=${s}` : ''}`),
  ackAlert: (id) => api.request('POST', `/alerts/${id}/acknowledge`),
  getMaintenance: (id) => api.request('GET', `/maintenance${id ? `?machine_id=${id}` : ''}`),
  addMaintenance: (d) => api.request('POST', '/maintenance', d),
  getThresholds: (id) => api.request('GET', `/thresholds/${id}`),
  updateThresholds: (id, d) => api.request('POST', `/thresholds/${id}`, d),
  getAuditLog: () => api.request('GET', '/audit')
};
