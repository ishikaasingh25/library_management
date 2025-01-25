import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after successful login
import { loginUser } from '../services/authService'; // Import your login service

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // To navigate to the dashboard after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = { username, password };
      const response = await loginUser(credentials);
  
      // Log the response to see the role
      console.log(response);
  
      const token = response.data.token;
  
      // Save the JWT token in localStorage
      localStorage.setItem('token', token);
      console.log("Token Retrieved: ", token); 
      setSuccess('Login successful!');
      setError('');
  
      // Redirect based on the role
      if (response.data.role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/user'); // Redirect to user dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Login;
