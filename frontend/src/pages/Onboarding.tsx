import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding">
      <h1>Welcome to this Airbnb Clone</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default Onboarding;
