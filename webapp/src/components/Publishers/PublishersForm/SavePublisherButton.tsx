import { ActionIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import { IBots, IChannels, IDatabases, IPublishers } from '../../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

type Props = {
    pubname: string;
    bot: IBots;
    channel: IChannels;
    database: IDatabases;
    publishers: IPublishers[];
    strategy: string;
    setPublishers: any;
    saved: boolean;
    setSaved: any;
};

const SavePublisherButton = (props: Props) => {
    const { pubname, bot, channel, database, publishers, strategy, setPublishers, saved, setSaved } = props;

    const savePublisher = async () => {
        console.log(bot, channel);
        const response = await fetch(`${serverHost}/api/publishers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publisher_name: pubname,
                postline_id: database,
                bot_id: bot,
                channel_id: channel,
                strategy_id: strategy,
            }),
        });
        const publisher = await response.json();
        setPublishers([...publishers, publisher]);
        setSaved(true);
    };
    return (
        <ActionIcon component="button" disabled={saved} color={saved ? 'green' : 'red'} onClick={savePublisher}>
            <IconCheck size={18} />
        </ActionIcon>
    );
};
export default SavePublisherButton;
