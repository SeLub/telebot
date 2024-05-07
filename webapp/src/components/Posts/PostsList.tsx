import { Divider, Grid, Title } from '@mantine/core';
import { Fragment, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import { IPost } from '../../common/types';
import CreatePostForm from './CreatePostForm/CreatePostForm';
import ImportFileForm from './ImportFileForm';
import PostItem from './PostItem/PostItem';

function PostsList() {
    const { database_id } = useParams();
    const originPosts = useLoaderData() as IPost[];
    const [posts, setPosts] = useState<IPost[] | []>(originPosts);

    return (
        <Fragment>
            <Title order={1}>Posts</Title>
            <Divider my="md" />
            <Grid>
                <Grid.Col span={6}>
                    <CreatePostForm database_id={database_id} posts={posts} setPosts={setPosts} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <ImportFileForm database_id={database_id} />
                </Grid.Col>
            </Grid>
            <Divider my="md" />
            {posts.map((post) => (
                <PostItem
                    key={post.post_id}
                    database_id={database_id}
                    post_id={post.post_id}
                    to={`/database/${database_id}/post/${post.post_id}`}
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
