import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Posts from './components/PostsPage'
import Post from './components/PostPage'
import NotFoundPage from './components/NotFoundPage'
import Picture from './components/Picture'
import { Dashboard } from './components/Dashboard'
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
    element: <Posts />
  },
  {
    path:'posts/:postId',
    element: <Post />
  },
  {
    path:'/image',
    element: <Picture imageName='villa-15fa9e55-ebf2-4b7a-9c25-b7591d3f36b3.jpg'/>
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
