import { Flex } from '@mantine/core';
import { useState } from 'react';

import InputPublisherName from './InputPublisherName';
import SavePublisherButton from './SavePublisherButton';
import SelectBot from './SelectBot';
import SelectChannel from './SelectChannel';

const bots = ['@BisonTeamBot', '@OneMoreBot'];
const channels = ['BisonTeamChannel', 'OneMoreChannel'];

const CreatePublisherForm = (props) => {
    const { publishers, setPublishers } = props;
    const [pubname, setPubname] = useState('');
    const [saved, setSaved] = useState(true);
    const [bot, setBot] = useState(bots[0]);
    const [channel, setChannel] = useState(channels[0]);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <SavePublisherButton
                pubname={pubname}
                bot={bot}
                channel={channel}
                publishers={publishers}
                setPublishers={setPublishers}
                saved={saved}
                setSaved={setSaved}
            />
            <InputPublisherName pubname={pubname} saved={saved} setSaved={setSaved} setPubname={setPubname} />
            <SelectBot saved={saved} bots={bots} setBot={setBot} />
            <SelectChannel saved={saved} channels={channels} setChannel={setChannel} />
        </Flex>
    );
};
export default CreatePublisherForm;
