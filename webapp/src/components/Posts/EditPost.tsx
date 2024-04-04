import { Card, Group, Title } from '@mantine/core';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import PostTextEditor from './PostTextEditor';

const Post = () => {
    const { post_id } = useParams<{ post_id: string }>();

    return (
        <Fragment>
            <Card withBorder radius="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Group wrap="nowrap" gap="xs" justify="flex-end">
                            <Title order={2}>Post {post_id}</Title>
                        </Group>
                    </Group>
                </Card.Section>
                <Card.Section inheritPadding py="xs">
                    <PostTextEditor post_id={post_id} />
                </Card.Section>
            </Card>
        </Fragment>
    );
};
export default Post;
