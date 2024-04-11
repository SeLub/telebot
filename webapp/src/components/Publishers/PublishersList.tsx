import { Divider, Paper, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';

import { IPublishers } from '../../common/types';
import CreatePublisherForm from './CreatePublisherForm/CreatePublisherForm';
import ListPublishers from './ListPublishers';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const fetchPublishers = async () => {
    const response = await fetch(`${serverHost}/api/publisher/publishers`);
    return response.ok ? await response.json() : [];
};

function PublishersList() {
    const [publishers, setPublishers] = useState<IPublishers[] | []>([]);

    useEffect(() => {
        const prevPublisher = publishers;
        async function getPublishers() {
            const currentPublishers = await fetchPublishers();
            if (JSON.stringify(prevPublisher) !== JSON.stringify(currentPublishers)) {
                setPublishers(currentPublishers);
            }
        }
        getPublishers();
    }, [publishers]);

    return (
        <Fragment>
            <Title order={1}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl">
                <CreatePublisherForm publishers={publishers} setPublishers={setPublishers} />
                <Divider my="md" />
                <ListPublishers publishers={publishers} setPublishers={setPublishers} />
            </Paper>
        </Fragment>
    );
}
export default PublishersList;
