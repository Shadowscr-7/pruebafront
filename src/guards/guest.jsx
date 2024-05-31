'use client';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'src/hooks/useRouter';
// redux
import { useSelector } from 'src/redux';
import Loading from 'src/components/loading';
// PropTypes;
import PropTypes from 'prop-types';

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
export default function Guest({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(({ user }) => user);
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);

      const isAdmin = user.role.includes('admin');
      const isVendor = user.role.includes('vendor');
      router.push(isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return <Loading />;
  }
  return children;
}
