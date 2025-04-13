const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('token');
      // Redirect to login page
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Add logout to value provider
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );