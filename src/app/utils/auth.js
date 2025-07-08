export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const username = localStorage.getItem('username');

  return {
    token: token ? `Bearer ${token}` : null,
    username: username ? username : null,
    isLoggedIn
  };
};
