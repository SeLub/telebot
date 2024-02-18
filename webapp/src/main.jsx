import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Posts from './components/PostsPage'
import Post from './components/PostPage'
import NotFoundPage from './components/NotFoundPage'
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
