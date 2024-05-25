import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the email and password match the admin user
    if (email === 'admin@example.com' && password === 'password') {
      // Navigate to the admin page
      history.push('/admin');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default AdminLogin;