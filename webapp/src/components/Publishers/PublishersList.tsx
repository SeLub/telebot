import { Divider, Paper, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';

import { IBots, IChannels, IPublishers } from '../../common/types';
import CreatePublisherForm from './CreatePublisherForm/CreatePublisherForm';
import ListPublishers from './ListPublishers';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const fetchPublishers = async () => {
    const response = await fetch(`${serverHost}/api/publisher/publishers`);
    return response.ok ? await response.json() : [];
};

const fetchBots = async () => {
    const response = await fetch(`${serverHost}/api/bots`);
    return response.ok ? await response.json() : [];
};

const fetchDatabases = async () => {
    const response = await fetch(`${serverHost}/api/posts/databases`);
    return response.ok ? await response.json() : [];
};

const fetchChannels = async () => {
    const response = await fetch(`${serverHost}/api/channels`);
    return response.ok ? await response.json() : [];
};

function PublishersList({ setDisabledNext }) {
    const [publishers, setPublishers] = useState<IPublishers[] | []>([]);
    const [bots, setBots] = useState<IBots[]>([]);
    const [channels, setChannels] = useState<IChannels[]>([]);
    const [databases, setDatabases] = useState<string[]>([]);

    if (publishers.length === 0) {
        () => setDisabledNext(true);
    } else {
        () => setDisabledNext(false);
    }

    useEffect(() => {
        const prevPublisher = publishers;
        async function getPublishers() {
            const currentPublishers = await fetchPublishers();
            if (JSON.stringify(prevPublisher) !== JSON.stringify(currentPublishers)) {
                setPublishers(currentPublishers);
            }
        }
        async function getBots() {
            const currentBots = await fetchBots();
            setBots(currentBots);
        }
        async function getChannels() {
            const currentChannels = await fetchChannels();
            setChannels(currentChannels);
        }
        async function getDatabases() {
            const currentDatabases = await fetchDatabases();
            setDatabases(currentDatabases);
        }
        getPublishers();
        getBots();
        getChannels();
        getDatabases();
    }, [publishers, bots.length, channels.length, databases.length]);

    return (
        <Fragment>
            <Title order={1}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl">
                <CreatePublisherForm
                    publishers={publishers}
                    setPublishers={setPublishers}
                    bots={bots}
                    channels={channels}
                    databases={databases}
                />
                <Divider my="md" />
                <ListPublishers publishers={publishers} setPublishers={setPublishers} />
            </Paper>
        </Fragment>
    );
}
export default PublishersList;
