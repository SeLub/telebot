import { Divider, Paper, Title } from '@mantine/core';
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
            <Paper shadow="lg" withBorder p="xl" bg="var(--mantine-color-grape-1)">
                <BotsForm bots={bots} setBots={setBots} />
                <Divider my="md" />
                <BotsList bots={bots} setBots={setBots} />
            </Paper>
        </Fragment>
    );
};
export default Bots;
