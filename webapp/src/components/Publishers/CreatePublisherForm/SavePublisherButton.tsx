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
    setPublishers: any;
    saved: boolean;
    setSaved: any;
};

const SavePublisherButton = (props: Props) => {
    const { pubname, bot, channel, database, publishers, setPublishers, saved, setSaved } = props;

    const savePublisher = async () => {
        console.log(bot, channel);
        const response = await fetch(`${serverHost}/api/publisher/publishers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publisher_name: pubname,
                publisher_database: database,
                publisher_bots: bot,
                publisher_channels: channel,
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
