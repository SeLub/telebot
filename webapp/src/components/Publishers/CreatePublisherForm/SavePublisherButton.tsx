import { ActionIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const SavePublisherButton = (props) => {
    const { pubname, bot, channel, publishers, setPublishers, saved, setSaved } = props;

    const savePublisher = async () => {
        const response = await fetch(`${serverHost}/api/publisher/publishers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publisher_name: pubname, publisher_bots: bot, publisher_channels: channel }),
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
