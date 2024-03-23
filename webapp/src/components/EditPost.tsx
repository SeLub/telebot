import { Card, Title } from '@mantine/core';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Attachments from './Attachments';
import PostTextEditor from './PostTextEditor';
import SubmitForm from './PublishPost';

const Post = () => {
    const { post_id } = useParams<{ post_id: string }>();

    return (
        <Fragment>
            <Title order={1}>Post {post_id}</Title>
            <SubmitForm post_id={post_id} />
            <Card withBorder radius="lg" shadow="sm">
                <Card.Section inheritPadding py="xs">
                    <PostTextEditor post_id={post_id} />
                </Card.Section>
                <Card.Section inheritPadding mt="sm" pb="md">
                    <Attachments post_id={post_id} height={200} />
                </Card.Section>
            </Card>
        </Fragment>
    );
};
export default Post;
