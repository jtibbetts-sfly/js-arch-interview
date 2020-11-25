import React, { useCallback, useState } from 'react';
import { useAuth } from './AuthService';

import './AuthDetails.css';

export default function AuthDetails() {
  const {clearAuth, setAuth, authenticate, authenticated, user} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useCallback((e) => {
    e.preventDefault();
    setError('');
    authenticate(username, password)
      .then(res => {
        setAuth(res)
        setUsername('');
        setPassword('');
      })
      .catch(error => setError(error.message));
  }, [authenticate, username, password, setAuth]);

  if (authenticated) {
    return (
      <>
        <h3>Hello, {user.firstName} {user.lastName}!</h3>
        <button style={{width: 100}} onClick={clearAuth}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <h3>Please sign in to continue</h3>
        <form className="login-form">
          <label>Username <input type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}/></label>
          <label>Password <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/></label>
          <button onClick={auth}>Sign in</button>
          {error && <div className="error">Error: {error}</div>}
        </form>
      </>
    )
  }
}