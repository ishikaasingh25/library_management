import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { registerUser } from '../services/authService'; 
import { Link } from 'react-router-dom'; 
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, password, role };
      const response = await registerUser(userData); 
      setSuccess(response.data.message); 
      setError('')
      setError(''); // Clear any previous errors
      setUsername(''); // Clear username field
      setPassword(''); // Clear password field
      setRole('admin'); // Reset role to 'admin'
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess(''); 
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && (
        <div>
          <p className="success">{success}</p>
          <p>
            Already registered? <Link to="/login">Go to login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
