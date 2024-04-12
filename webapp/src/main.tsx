import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Dashboard } from './components/Dashboard/Dashboard';
import Databases from './components/Databases/Databases';
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import EditPost from './components/Posts/EditPost';
import PostsList from './components/Posts/PostsList';
import PublishersList from './components/Publishers/PublishersList';
import Settings from './components/Settings/Settings';

Sentry.init({
    dsn: 'https://e5ce66e62f8e6c01a356bf45ee2685db@o4504631757832192.ingest.us.sentry.io/4507072471891968',
    integrations: [],
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/database',
        element: <Databases />,
        errorElement: <NotFoundPage />,
    },
    {
        path: 'database/name/:database_name',
        element: <PostsList />,
    },
    {
        path: 'database/name/:database_name/post/:post_id',
        element: <EditPost />,
    },
    {
        path: '/publishers',
        element: <PublishersList />,
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
