import { Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import * as message from '../../common/notification';
import { IChannel } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ListChannels = ({ channels, setChannels }) => {
    const deleteChannelFromDatabase = (channelId: string) => {
        fetch(`${serverHost}/api/channels/${channelId}`, { method: 'DELETE' });
    };

    const handleDelete = (channelId: string) => {
        const id = message.start('Start delete channel.');
        try {
            deleteChannelFromDatabase(channelId);
            setChannels(channels.filter((channel: IChannel) => channel.channel_id !== channelId));
            message.success('Channel deleted.', id);
        } catch (error) {
            message.error('Channel not deleted.', id);
            console.log(error);
        }
    };

    return (
        <Fragment>
            {channels.map((channel: IChannel, index: number) => (
                <Fragment key={index}>
                    <Divider my="md" />
                    <div key={channel.channel_id}>
                        {channel.channel_name + '   ' + channel.channel_chat_id + '   ' + channel.channel_url}
                        <IconTrash size={18} onDoubleClick={() => handleDelete(channel.channel_id)} />
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
};
export default ListChannels;
