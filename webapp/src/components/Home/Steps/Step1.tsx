import { Divider, Switch, Text, Title } from '@mantine/core';
import { Fragment, useState } from 'react';

import { isArrayEmpty } from '../../../utils';
import InputBots from '../../Bots/InputBots';
import InputChannels from '../../Channels/InputChannels';
import Auth from './Auth';

const Step1 = ({ setDisabledNext }) => {
    const [ihavebots, setIhavebots] = useState(false);
    const [bots, setBots] = useState([]);
    const [channels, setChannels] = useState([]);
    if (!isArrayEmpty(bots) && !isArrayEmpty(channels)) {
        setDisabledNext(false);
    } else {
        setDisabledNext(true);
    }
    return (
        <Fragment>
            <Title order={3}>Step 1: Create channels and bots</Title>
            <Text size="md">Define channeles and bots.</Text>
            <Switch
                checked={ihavebots}
                size="lg"
                onChange={(event) => setIhavebots(event.currentTarget.checked)}
                label="I want to create channels and bots."
            />
            <Divider my="md" />
            {ihavebots && <Auth />}
            {!ihavebots && (
                <>
                    <InputBots bots={bots} setBots={setBots} />{' '}
                    <InputChannels channels={channels} setChannels={setChannels} />
                </>
            )}
        </Fragment>
    );
};
export default Step1;
