import { useState } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const projectId = 1001;
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:2003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      document.cookie = `authToken=${data.token}; path=/; max-age=${60*60*24*7}; secure; SameSite=Strict`;

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(`/projects/${projectId}/tasks`);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    }
  }

  return(
    <>
      <div className="login-form">
        <h2>Sign In</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
 
