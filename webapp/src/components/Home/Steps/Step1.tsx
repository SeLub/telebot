import { Divider, Switch, Text, Title } from '@mantine/core';
import { Fragment, useState } from 'react';

import InputBots from '../../Bots/InputBots';
import Auth from './Auth';

const Step1 = () => {
    const [ihavebots, setIhavebots] = useState(false);
    return (
        <Fragment>
            <Title order={3}>Step 1: Create channels and bots</Title>
            <Text size="md">
                Here you can create channeles and bots. You can do this manually in your Telegram App or right here in
                our application. If your channels and bots has already created just add them below.
            </Text>
            <Switch
                checked={ihavebots}
                size="lg"
                onChange={(event) => setIhavebots(event.currentTarget.checked)}
                label="I want to create channels and bots."
            />
            <Divider my="md" />
            {ihavebots && <Auth />}
            {!ihavebots && <InputBots />}
        </Fragment>
    );
};
export default Step1;
