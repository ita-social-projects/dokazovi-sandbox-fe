import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Oath2Redirect: React.FC = () => {
  const query = useQuery();
  const { setAuthorization } = useContext(AuthContext);

  const token = query.get('token');

  useEffect(() => {
    if (token) {
      setAuthorization(token);
    } else {
      console.error('NO TOKEN');
    }
  }, [token]);

  return <></>;
};

export default Oath2Redirect;