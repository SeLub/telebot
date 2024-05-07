import { readLocalStorageValue } from '@mantine/hooks';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Bots from '../components/Bots';
import Channels from '../components/Channels';
import HeaderTabs from '../components/Dashboard/HeaderTabs';
import Demo from '../components/Demo';
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
import PostTextEditor from '../components/Posts/PostTextEditor';

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

const fetchPostline = async (database_id) => {
    const response = await fetch(serverHost + '/api/posts/' + database_id);
    const data = await response.json();
    return data;
};

const fetchPost = async (database_id, post_id) => {
    const response = await fetch(serverHost + '/api/posts/database/' + database_id + '/post/' + post_id);
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
                    path: '/postlines/:database_id',
                    element: <PostsList />,
                    loader: ({ params }) => fetchPostline(params.database_id),
                },
                {
                    path: 'database/:database_id/post/:post_id',
                    element: <PostTextEditor />,
                    loader: ({ params }) => fetchPost(params.database_id, params.post_id),
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
                    element: <div>Statistic</div>,
                    path: '/statistic',
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
            element: <div>Home for Not Auth</div>,
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
        ...notFound,
    ]);

    return <RouterProvider router={router} />;
};
export default Routes;
