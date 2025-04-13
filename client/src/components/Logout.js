import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });
    
    // Remove token from localStorage if you're using it
    localStorage.removeItem('token');
    
    // Redirect to home page
    navigate('/signin');
  }, [dispatch, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;