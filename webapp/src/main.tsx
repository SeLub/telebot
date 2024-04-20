import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Bots from './components/Bots';
import Channels from './components/Channels';
import { Dashboard } from './components/Dashboard/Dashboard';
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Postlines from './components/Postlines';
import EditPost from './components/Posts/EditPost';
import PostsList from './components/Posts/PostsList';
import Publishers from './components/Publishers';
import Settings from './components/Settings/Settings';

const dsn = import.meta.env.SENTRY_DSN;
const environment = import.meta.env.SENTRY_ENV;
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

Sentry.init({
    dsn,
    environment,
    integrations: [],
});

const getBots = async () => {
    const response = await fetch(serverHost + '/api/bots');
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        element: <Bots />,
        path: '/bots',
        loader: getBots,
        errorElement: <NotFoundPage />,
    },
    {
        element: <Channels />,
        path: '/channels',
        loader: getChannels,
        errorElement: <NotFoundPage />,
    },
    {
        element: <Postlines />,
        path: '/postlines',
        loader: fetchPostlines,
        errorElement: <NotFoundPage />,
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
        element: <Publishers />,
        path: '/publishers',
        loader: fetchPublishers,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/setting',
        element: <Settings />,
        errorElement: <NotFoundPage />,
    },
]);
const theme = createTheme({
    colorScheme: 'dark',
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <Dashboard>
            <RouterProvider router={router} />
        </Dashboard>
    </MantineProvider>,
);
