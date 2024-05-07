import { Card, Group, Title } from '@mantine/core';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import PostTextEditor from './PostTextEditor';

const EditPost = () => {
    const { post_id, database_id } = useParams<{ database_id: string; post_id: string }>();

    return (
        <Fragment>
            <Card withBorder radius="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <Group wrap="nowrap" gap="xs" justify="flex-end">
                            <Title order={2}>Edit Post {post_id}</Title>
                        </Group>
                    </Group>
                </Card.Section>
                <Card.Section inheritPadding py="xs">
                    <PostTextEditor database_name={database_id} post_id={post_id} />
                </Card.Section>
            </Card>
        </Fragment>
    );
};
export default EditPost;
