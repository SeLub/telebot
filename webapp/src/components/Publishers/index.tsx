import { Divider, Paper, Title } from '@mantine/core';
import { Fragment, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { IBots, IChannels, IDatabases, IPublishers } from '../../common/types';
import ListPublishers from './ListPublishers';
import PublishersForm from './PublishersForm/index';

function Publishers() {
    const { publishers: orPubs, bots: orBots, channels: orChs, databases: orPls } = useLoaderData();
    const [channels] = useState<IChannels[] | []>(orChs);
    const [publishers, setPublishers] = useState<IPublishers[] | []>(orPubs);
    const [bots] = useState<IBots[] | []>(orBots);
    const [databases] = useState<IDatabases[] | []>(orPls);

    return (
        <Fragment>
            <Title order={2}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl">
                <PublishersForm
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
export default Publishers;
