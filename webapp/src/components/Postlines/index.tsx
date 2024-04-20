import { Divider, Paper, Title } from '@mantine/core';
import { Fragment, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { IPostlines } from '../../common/types';
import PostlinesForm from './PostlinesForm';
import PostlinesList from './PostlinesList';

function Postlines() {
    const originPostlines = useLoaderData() as IPostlines[];
    const [postlines, setPostlines] = useState<IPostlines[] | []>(originPostlines);

    return (
        <Fragment>
            <Title order={2}>PostLines</Title>
            <Paper shadow="lg" withBorder p="xl">
                <PostlinesForm postlines={postlines} setPostlines={setPostlines} />
                <Divider my="md" />
                <PostlinesList postlines={postlines} setPostlines={setPostlines} />
            </Paper>
        </Fragment>
    );
}
export default Postlines;
