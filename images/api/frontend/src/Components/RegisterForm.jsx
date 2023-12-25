import '../Styles/loginRegister.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        username,
        email,
        password,
      });

      console.log('response', response);

      if (response.status === 201) {
        console.log('Registered in successfully:', response.data);
        navigate('/'); 
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
      } else {
        console.log('Register failed:', response.data);
      }
    } catch (error) {
      console.error('Error during register:', error);
    }
  };

  return (
    <div className="form-container">
        <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Register</button>
    </div>
  );
};

export default RegisterForm;
