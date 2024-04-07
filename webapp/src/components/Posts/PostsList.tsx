import { Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '../../common/types';
import PostItem from './PostItem/PostItem';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostsList() {
    const { database_id, database_name } = useParams<{ database_id: string; database_name: string }>();
    const [posts, setPosts] = useState<IPost[] | []>([]);

    useEffect(() => {
        const prevPosts = posts;
        async function getPosts() {
            const response = await fetch(`${serverHost}/api/posts/all/?database_name=${database_name}`);
            const currentPosts = response.ok ? await response.json() : [];
            if (JSON.stringify(prevPosts) === JSON.stringify(currentPosts)) {
                return;
            }
            setPosts(currentPosts);
        }
        getPosts();
    }, [database_id, database_name, posts]);

    return (
        <Fragment>
            <Title order={1}>Posts</Title>
            {posts.map((post) => (
                <PostItem
                    key={post.post_id}
                    dbname={database_name}
                    post_id={post.post_id}
                    to={`/posts/${post.post_id}`}
                    text={post.post_text}
                    showEditButton={true}
                />
            ))}
        </Fragment>
    );
}

export default PostsList;
