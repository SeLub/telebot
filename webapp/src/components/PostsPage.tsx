import { Link } from 'react-router-dom';
import { Flex, Title } from '@mantine/core';
import { useState, useEffect, Fragment } from "react";
import React from 'react';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;
import ArticleCard from './ArticleCard';
import ArticleCardVertical from './ArticleCardVertical/ArticleCardVertical'

const Posts = () => {
      const [posts, setPosts] = useState([]);
      
      useEffect(() => {
            async function getPosts(){
                  const response = await fetch(`${serverHost}/api/posts`);
                  const data = await response.json();
                  setPosts(data)
            }
            getPosts();
      },[posts])

      //const listPost = (post) => (<Link key={post.post_id} to={`/posts/${post.post_id}`} >{post.post_text}</Link>)
      const listPost = (post) => <ArticleCardVertical key={post.post_id} postId={post.post_id} to={`/posts/${post.post_id}`} text={post.post_text} />
      
      return(
            <Fragment>
                  <Title order={1}>Posts Page</Title>
                        { posts.map(post => listPost(post)) }

                  <Link to="/posts/new">New Post</Link>
                        <Link to="/posts/edit">Edit Post</Link>
                        <Link to="/posts/delete">Delete Post</Link>
                        <Link to="/posts/search">Search Post</Link>
                        <Link to="/posts/search">Search Post</Link>
            </Fragment>
            
      )
}

export default Posts