import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';

import InputPublisherName from './InputPublisherName';
import SavePublisherButton from './SavePublisherButton';
import SelectBot from './SelectBot';
import SelectChannel from './SelectChannel';
import SelectDatabase from './SelectDatabase';

const PublishersForm = (props) => {
    const { publishers, setPublishers, bots, channels, databases } = props;
    const [pubname, setPubname] = useState('');
    const [saved, setSaved] = useState(true);

    const [bot, setBot] = useState();
    const [channel, setChannel] = useState();
    const [database, setDatabase] = useState();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (bots.length === 0 || channels.length === 0 || databases.length === 0) {
            setDisabled;
        } else {
            setDisabled(false);
        }
        if (bots.length > 0) {
            setBot(bots[0]['bot_name']);
        }
        if (channels.length > 0) {
            setChannel(channels[0]['channel_name']);
        }
        if (databases.length > 0) {
            setDatabase(databases[0]['database_name']);
        }
    }, [bots, channels, databases]);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <InputPublisherName
                pubname={pubname}
                saved={saved}
                setSaved={setSaved}
                setPubname={setPubname}
                disabled={disabled}
            />
            <SelectDatabase saved={saved} databases={databases} setDatabase={setDatabase} />
            <SelectBot saved={saved} bots={bots} setBot={setBot} />
            <SelectChannel saved={saved} channels={channels} setChannel={setChannel} />
            <SavePublisherButton
                pubname={pubname}
                bot={bot}
                channel={channel}
                database={database}
                publishers={publishers}
                setPublishers={setPublishers}
                saved={saved}
                setSaved={setSaved}
            />
        </Flex>
    );
};
export default PublishersForm;
