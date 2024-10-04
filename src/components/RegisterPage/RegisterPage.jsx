import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await axios.post('/api/user/register', { username, password });
      history.push('/login');
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <div>
      <RegisterForm />
    </div>

  );
};

export default RegisterPage;
