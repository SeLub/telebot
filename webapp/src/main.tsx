import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import EditPost from './components/EditPost';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PostsList from './components/PostsList';
import PublishersList from './components/PublishersList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/posts',
        element: <PostsList />,
    },
    {
        path: 'posts/:post_id',
        element: <EditPost />,
    },
    {
        path: '/publishers',
        element: <PublishersList />,
        errorElement: <NotFoundPage />,
    },
]);
const theme = createTheme({
    colorScheme: 'dark',
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
        <Notifications />
        <Dashboard>
            <RouterProvider router={router} />
        </Dashboard>
    </MantineProvider>,
);
