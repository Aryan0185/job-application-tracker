import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchJobs();
  }, [token]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('https://job-application-tracker-qp4s.onrender.com//api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://job-application-tracker-qp4s.onrender.com/api/applications',
        { company, role: position, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs([...jobs, res.data]);
      setCompany('');
      setPosition('');
      setStatus('Applied');
    } catch (err) {
      setError('Failed to add job');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Job Application Tracker</h2>
        <div>
          <span>Welcome, {user.name || 'User'}! </span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <form onSubmit={handleAddJob} className="job-form">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position/Role"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">Add Job</button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <div className="jobs-list">
        <h3>Your Applications</h3>
        {jobs.length === 0 ? (
          <p>No job applications added yet.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id || job.id} className="job-card">
                <div>
                  <strong>{job.company}</strong> - {job.position}
                </div>
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
