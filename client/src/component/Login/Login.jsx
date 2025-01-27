import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.defaultPrevented.value)}
          required
        />
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.defaultPrevented.value)}
          required
        />
        <button
          type='button'
          className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-sm'
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
