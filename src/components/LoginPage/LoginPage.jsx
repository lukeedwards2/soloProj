import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch({
      type: 'LOGIN',
      payload: { username, password },
    });
    history.push('/active-bets'); 
  };

  return (
    <div>
      <LoginForm />

    </div>
  );
};

export default LoginPage;
