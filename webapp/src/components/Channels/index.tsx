import { Divider, Title } from '@mantine/core';
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
            <Divider my="md" />
            <ChannelsForm channels={channels} setChannels={setChannels} />
            <ChannelsList channels={channels} setChannels={setChannels} />
        </Fragment>
    );
};
export default Channels;
