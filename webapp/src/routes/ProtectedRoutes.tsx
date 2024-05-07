// import { readLocalStorageValue } from '@mantine/hooks';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// const ProtectedRoutes = () => {
//     const location = useLocation();
//     const token = readLocalStorageValue({ key: 'token' });
//     const { authLogin } = { authLogin: false };
//     if (authLogin === undefined) {
//         return null; // or loading indicator/spinner/etc
//     }
//     return authLogin ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
// };
// export default ProtectedRoutes;
import { Navigate, Outlet } from 'react-router-dom';

import Demo from '../components/Demo';
import { useAuth } from '../provider/AuthProvider';

export const ProtectedRoute = () => {
    const { token } = useAuth();

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child routes
    return (
        <>
            <Demo />
            <Outlet />
        </>
    );
};
