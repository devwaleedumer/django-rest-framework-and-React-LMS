import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LayoutLoader from './Loader/LayoutLoader';
import { userApi } from '../redux/features/user/userApi';
import { getRefreshToken } from '../utils/Services/LocalStorageTokenService';
const Protected = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const refresh = getRefreshToken()
  const loading = isLoading || isFetching;


  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
    
  });

  if (loading) {
    return <LayoutLoader />;
  }

  


  return (refresh !== null || user) &&
    allowedRoles.includes(user?.role as string) 
    ? (

    <Outlet />
  ) : refresh !== null  && user ? (
      <Navigate to={'/unauthorized'} state={{from: location}}/> 
  ) : (
    <Navigate to='/teacher-login' state={{ from: location }} replace />
  );
};


export default Protected;