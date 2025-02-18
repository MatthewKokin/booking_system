import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // *** Backend registration logic goes here ***
    alert('Account created successfully!');
    setAuth(true);
    navigate('/properties');
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
