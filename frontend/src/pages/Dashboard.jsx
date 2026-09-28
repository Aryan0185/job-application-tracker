import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchApplications();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/applications',
        { company, role, status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompany('');
      setRole('');
      setStatus('Applied');
      setNotes('');
      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredApps = filter === 'All' ? applications : applications.filter((app) => app.status === filter);

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    interview: applications.filter((a) => a.status === 'Interview').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
    offer: applications.filter((a) => a.status === 'Offer').length
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Job Application Tracker</h2>
        <div>
          <span style={{ marginRight: '15px', color: '#666' }}>Hi, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><div className="num">{stats.total}</div><div className="label">Total</div></div>
        <div className="stat-card"><div className="num">{stats.applied}</div><div className="label">Applied</div></div>
        <div className="stat-card"><div className="num">{stats.interview}</div><div className="label">Interview</div></div>
        <div className="stat-card"><div className="num">{stats.rejected}</div><div className="label">Rejected</div></div>
        <div className="stat-card"><div className="num">{stats.offer}</div><div className="label">Offer</div></div>
      </div>

      <div className="form-card">
        <h3>Add Application</h3>
        <form onSubmit={handleAdd}>
          <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="OA">OA</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
          <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button type="submit">Add Application</button>
        </form>
      </div>

      <div className="filter-row">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      {filteredApps.map((app) => (
        <div key={app._id} className="app-card">
          <strong>{app.company}</strong> — {app.role}
          <br />
          <span className={`status-badge status-${app.status}`}>{app.status}</span>
          {app.notes && <p>{app.notes}</p>}
          <br />
          <button onClick={() => handleDelete(app._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
