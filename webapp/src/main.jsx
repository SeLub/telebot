import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import PostsList from './components/PostsList'
import EditPost from './components/EditPost'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Picture from './components/ui/Picture'
import { Dashboard } from './components/Dashboard';
import PublishersList from './components/PublishersList';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { Notifications } from '@mantine/notifications';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path:'/posts',
    element: <PostsList />
  },
  {
    path:'posts/:post_id',
    element: <EditPost />
  },
  {
    path:'/publishers',
    element: <PublishersList />,
    errorElement: <NotFoundPage />
  }
])
const theme = createTheme({
  colorScheme: 'dark',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  
     <MantineProvider theme={theme}>
        <Notifications />
        <Dashboard>
          <RouterProvider router={router} />
        </Dashboard>
    </MantineProvider>
  
)
