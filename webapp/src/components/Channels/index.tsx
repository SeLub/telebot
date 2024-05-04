import { Divider, Paper, Title } from '@mantine/core';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { IChannels } from '../../common/types';
import ChannelsForm from './ChannelsForm';
import ChannelsList from './ChannelsList';

const Channels = () => {
    const originChannels = useLoaderData() as IChannels[];
    const [channels, setChannels] = useState(originChannels);

    return (
        <Fragment>
            <Title order={2}>Channels</Title>
            <Paper shadow="lg" withBorder p="xl" bg="var(--mantine-color-teal-1)">
                <ChannelsForm channels={channels} setChannels={setChannels} />
                <Divider my="md" />
                <ChannelsList channels={channels} setChannels={setChannels} />
            </Paper>
        </Fragment>
    );
};
export default Channels;
