import { Divider, Paper, Title } from '@mantine/core';
import { Fragment, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { IBots, IChannels, IFullPublishers, IPostlines, IPublishers } from '../../common/types';
import ListPublishers from './ListPublishers';
import PublishersForm from './PublishersForm/index';

function Publishers() {
    const {
        publishers: orPubs,
        bots: orBots,
        channels: orChs,
        databases: orPls,
        strategies: orStrat,
    } = useLoaderData() as IFullPublishers;
    const [channels] = useState<IChannels[] | []>(orChs);
    const [publishers, setPublishers] = useState<IPublishers[] | []>(orPubs);
    const [bots] = useState<IBots[] | []>(orBots);
    const [databases] = useState<IPostlines[] | []>(orPls);
    const [strategies] = useState<string[] | []>(orStrat);

    return (
        <Fragment>
            <Title order={2}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl" bg="var(--mantine-color-orange-1)">
                <PublishersForm
                    publishers={publishers}
                    setPublishers={setPublishers}
                    bots={bots}
                    channels={channels}
                    databases={databases}
                    strategies={strategies}
                />
                <Divider my="md" />
                <ListPublishers publishers={publishers} setPublishers={setPublishers} />
            </Paper>
        </Fragment>
    );
}
export default Publishers;
