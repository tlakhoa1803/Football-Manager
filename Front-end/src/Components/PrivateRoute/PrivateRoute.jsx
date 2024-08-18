import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user || (role && user.role !== role)) {
    navigate('/');
    return null;
  }

  return children;
};

export default PrivateRoute;