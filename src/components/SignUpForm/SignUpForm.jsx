import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import areas from '../../data/bh.json';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we're not using here).
  // - The setUser function to update the user state (which we are using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    phone: '',
    area: '',
  });


  const { name, email, password, passwordConf, phone, area } = formData;
  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

 const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      // Call the setUser function to update the user state, just like normal.

      setUser(newUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/sign-in');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf && phone && area);
  };

  return (
    <main className="form-container">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        {message && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              name='name'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
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
              value={password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='confirm'>Confirm Password</label>
            <input
              type='password'
              id='confirm'
              value={passwordConf}
              name='passwordConf'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='phone'>Phone</label>
            <input
              type='tel'
              id='phone'
              value={phone}
              name='phone'
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='area'>Area</label>
            <select
              id='area'
              value={area}
              name='area'
              onChange={handleChange}
              required
            >
              <option value=''>Select an area</option>
              {areas.map((areaObj) => (
                <option key={areaObj.city} value={areaObj.city}>
                  {areaObj.city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary" disabled={isFormInvalid()}>Sign Up</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
