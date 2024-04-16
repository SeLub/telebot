import { Divider, Grid, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '../../common/types';
import CreatePostForm from './CreatePostForm/CreatePostForm';
import ImportFileForm from './ImportFileForm';
import PostItem from './PostItem/PostItem';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostsList() {
    const { database_name } = useParams<{ database_name: string }>();
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
    }, [database_name, posts]);

    return (
        <Fragment>
            <Title order={1}>Posts</Title>
            <Divider my="md" />
            <Grid>
                <Grid.Col span={6}>
                    <CreatePostForm database_name={database_name} posts={posts} setPosts={setPosts} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <ImportFileForm database_name={database_name} />
                </Grid.Col>
            </Grid>
            <Divider my="md" />
            {posts.map((post) => (
                <PostItem
                    key={post.post_id}
                    dbname={database_name}
                    post_id={post.post_id}
                    to={`/database/name/${database_name}/post/${post.post_id}`}
                    text={post.post_text}
                    posts={posts}
                    setPosts={setPosts}
                    showEditButton={true}
                />
            ))}
        </Fragment>
    );
}

export default PostsList;
