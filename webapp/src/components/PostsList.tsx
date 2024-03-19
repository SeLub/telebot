import { Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IPost } from '../common/types';
import ArticleCardVertical from './ArticleCardVertical/ArticleCardVertical';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostsList() {
    const [posts, setPosts] = useState<IPost[] | []>([]);

    useEffect(() => {
        async function getPosts() {
            const response = await fetch(`${serverHost}/api/posts`);
            const data = await response.json();
            setPosts(data);
        }
        getPosts();
    }, [posts]);

    const listPost = (post) => (
        <ArticleCardVertical
            key={post.post_id}
            post_id={post.post_id}
            to={`/posts/${post.post_id}`}
            text={post.post_text}
        />
    );

    return (
        <Fragment>
            <Title order={1}>Posts Page</Title>
            {posts.map((post) => listPost(post))}

            <Link to="/posts/new">New Post</Link>
            <Link to="/posts/edit">Edit Post</Link>
            <Link to="/posts/delete">Delete Post</Link>
            <Link to="/posts/search">Search Post</Link>
            <Link to="/posts/search">Search Post</Link>
        </Fragment>
    );
}

export default PostsList;
