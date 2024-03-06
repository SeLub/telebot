import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Posts from './components/PostsPage'
import Post from './components/PostPage'
import NotFoundPage from './components/NotFoundPage'
import Picture from './components/Picture'
import { Dashboard } from './components/Dashboard'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
//const webAppHost = import.meta.env.VITE_REACT_APP_WEBAPP_HOST;
var base = document.createElement('base');
base.href = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
document.getElementsByTagName('head')[0].appendChild(base);

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
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MantineProvider theme={theme}>
        <Dashboard>
          <RouterProvider router={router} />
        </Dashboard>
    </MantineProvider>
  </React.StrictMode>,
)
