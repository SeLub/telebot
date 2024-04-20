import { Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import * as message from '../../common/notification';
import { IChannels } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ListChannels = ({ channels, setChannels }) => {
    const deleteChannelFromDatabase = (channelId: string) => {
        fetch(`${serverHost}/api/channels/${channelId}`, { method: 'DELETE' });
    };

    const handleDelete = (channelId: string) => {
        const id = message.start('Start delete channel.');
        try {
            deleteChannelFromDatabase(channelId);
            setChannels(channels.filter((channel: IChannels) => channel.channel_id !== channelId));
            message.success({ message: 'Channel deleted.', id });
        } catch (error) {
            message.error({ message: 'Channel not deleted.', id });
            console.log(error);
        }
    };

    return (
        <Fragment>
            {channels.map((channel: IChannels, index: number) => (
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
