import { SimpleGrid, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';

import { IPost } from '../common/types';
import ArticleCardVertical from './ArticleCardVertical/ArticleCardVertical';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostsList() {
    const [posts, setPosts] = useState<IPost[] | []>([]);

    useEffect(() => {
        const prevPosts = posts;
        async function getPosts() {
            const response = await fetch(`${serverHost}/api/posts`);
            const currentPosts = await response.json();
            if (JSON.stringify(prevPosts) === JSON.stringify(currentPosts)) {
                return;
            }
            setPosts(currentPosts);
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
            <SimpleGrid cols={1}>{posts.map((post) => listPost(post))}</SimpleGrid>
        </Fragment>
    );
}

export default PostsList;
