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

const fetchChannels = async () => {
    const response = await fetch(`${serverHost}/api/channels`);
    return response.ok ? await response.json() : [];
};

function PublishersList({ setDisabledNext }) {
    const [publishers, setPublishers] = useState<IPublishers[] | []>([]);
    const [bots, setBots] = useState<IBots[]>([]);
    const [channels, setChannels] = useState<IChannels[]>([]);

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
        getPublishers();
        getBots();
        getChannels();
    }, [publishers, bots.length, channels.length]);

    return (
        <Fragment>
            <Title order={1}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl">
                <CreatePublisherForm
                    publishers={publishers}
                    setPublishers={setPublishers}
                    bots={bots}
                    setBots={setBots}
                    channels={channels}
                    setChannels={setChannels}
                />
                <Divider my="md" />
                <ListPublishers publishers={publishers} setPublishers={setPublishers} />
            </Paper>
        </Fragment>
    );
}
export default PublishersList;
