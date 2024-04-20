import { Divider, Title } from '@mantine/core';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { IBots } from '../../common/types';
import BotsForm from './BotsForm';
import BotsList from './BotsList';

const Bots = () => {
    const originBots = useLoaderData() as IBots[];
    const [bots, setBots] = useState(originBots);

    return (
        <Fragment>
            <Title order={2}>Bots</Title>
            <Divider my="md" />
            <BotsForm bots={bots} setBots={setBots} />
            <BotsList bots={bots} setBots={setBots} />
        </Fragment>
    );
};
export default Bots;
