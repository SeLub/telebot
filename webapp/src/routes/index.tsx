import { readLocalStorageValue } from '@mantine/hooks';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Bots from '../components/Bots';
import Channels from '../components/Channels';
import Login from '../components/Login';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import Plans from '../components/Plans';
import Postlines from '../components/Postlines';
import EditPost from '../components/Posts/EditPost';
import PostsList from '../components/Posts/PostsList';
import Publishers from '../components/Publishers';
import Settings from '../components/Settings/Settings';
import Logout from '../pages/Logout';
import { useAuth } from '../provider/AuthProvider';
import { ProtectedRoute } from './ProtectedRoutes';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const token = readLocalStorageValue({ key: 'token' });
console.log('token from localStorage ', token);

const getBots = async () => {
    const response = await fetch(serverHost + '/api/bots', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    const data = await response.json();
    return data;
};

const getChannels = async () => {
    const response = await fetch(serverHost + '/api/channels');
    const data = await response.json();
    return data;
};

const fetchPublishers = async () => {
    const response = await fetch(serverHost + '/api/publishers/getInitData');
    const data = await response.json();
    return data;
};
const fetchPostlines = async () => {
    const response = await fetch(serverHost + '/api/posts/databases');
    const data = await response.json();
    return data;
};

const Routes = () => {
    const { token } = useAuth();
    //Public routs
    const routesForPublic = [
        {
            path: '/service',
            element: <div>Service Page</div>,
        },
        {
            path: '/about-us',
            element: <div>About Us</div>,
        },
    ];
    // Routes for authenticated only
    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <div>Home Page Authorized</div>,
                },
                {
                    element: <Bots />,
                    path: '/bots',
                    loader: getBots,
                },
                {
                    element: <Channels />,
                    path: '/channels',
                    loader: getChannels,
                },
                {
                    element: <Postlines />,
                    path: '/postlines',
                    loader: fetchPostlines,
                },
                {
                    path: 'databases/name/:database_name',
                    element: <PostsList />,
                },
                {
                    path: 'database/name/:database_name/post/:post_id',
                    element: <EditPost />,
                },
                {
                    element: <Plans />,
                    path: '/plans',
                },
                {
                    element: <Publishers />,
                    path: '/publishers',
                    loader: fetchPublishers,
                },
                {
                    path: '/settings',
                    element: <Settings />,
                },
                {
                    path: '/profile',
                    element: <div>User Profile</div>,
                },
                {
                    path: '/logout',
                    element: <Logout />,
                },
            ],
        },
    ];
    // Routes for not authenticated
    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <div>Home Page Not Auth-ted</div>,
        },
        {
            path: '/login',
            element: <Login />,
        },
    ];

    const notFound = [
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
        // ...notFound,
    ]);

    return <RouterProvider router={router} />;
};
export default Routes;
