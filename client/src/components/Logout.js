import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token and any other stored user data
    localStorage.removeItem('token');

    // Optional: call logout endpoint if your backend supports it
    // await axios.post('/logout'); 

    // Redirect to sign-in page
    navigate('/signin');
  }, [navigate]);

  return null; // or return a spinner/loading state
};

export default Logout;
