// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import './SignInForm.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="form-container">
      <div className="form-wrapper">
        <h1>Sign In</h1>
        {message && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={formData.email}
              name='email'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">Sign In</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;

