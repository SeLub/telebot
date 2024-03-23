import { Divider, Title } from '@mantine/core';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Attachments from './Attachments';
import PostTextEditor from './PostTextEditor';
import SubmitForm from './SubmitForm';

const Post = () => {
    const { post_id } = useParams<{ post_id: string }>();

    return (
        <Fragment>
            <Title order={1}>Post {post_id}</Title>
            <Attachments post_id={post_id} />
            <PostTextEditor post_id={post_id} />
            <Divider my="xs" label="Publish post" labelPosition="center" />
            <SubmitForm post_id={post_id} />
        </Fragment>
    );
};
export default Post;
