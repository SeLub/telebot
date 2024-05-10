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
import PostTextEditor from '../components/Posts/PostTextEditor';
import PostsList from '../components/Posts/PostsList';
import Publishers from '../components/Publishers';
import Settings from '../components/Settings/Settings';
import Logout from '../pages/Logout';
import { useAuth } from '../provider/AuthProvider';
import { ProtectedRoute } from './ProtectedRoutes';
import * as loaders from './loaders';

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
                    loader: loaders.getBots,
                },
                {
                    element: <Channels />,
                    path: '/channels',
                    loader: loaders.getChannels,
                },
                {
                    element: <Postlines />,
                    path: '/postlines',
                    loader: loaders.fetchPostlines,
                },
                {
                    path: '/postlines/:database_id',
                    element: <PostsList />,
                    loader: ({ params }) => loaders.fetchPostline(params.database_id),
                },
                {
                    path: 'database/:database_id/post/:post_id',
                    element: <PostTextEditor />,
                    loader: ({ params }) => loaders.fetchPost(params.database_id, params.post_id),
                },
                {
                    element: <Plans />,
                    path: '/plans',
                },
                {
                    element: <Publishers />,
                    path: '/publishers',
                    loader: loaders.fetchPublishers,
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
