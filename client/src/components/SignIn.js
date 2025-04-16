import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '',
      form: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.data.user._id);

        
        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        setErrors({
          ...errors,
          form: error.message
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-8">
          <div className="card flex-row shadow-lg rounded p-4">
            
            {/* Left: Form Section */}
            <div className="col-md-6 px-3">
              <h2>Log in to Word Wave</h2>
              <p className="form-intro">
            Welcome back! Sign in to continue exploring and sharing your creativity.
              </p>
              {errors.form && <div className="error-message">{errors.form}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="form-control"
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="form-control"
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-4 w-100">
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="auth-footer mt-3">
                Don’t have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </div>

            {/* Right: Image Section */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img 
                src="/image/39879138_8767132.jpg" 
                alt="Illustration" 
                className="img-fluid rounded"
                style={{ maxHeight: '300px' }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;