import { Group, TextInput } from '@mantine/core';
import { IconBrandTelegram, IconCirclePlus, IconId, IconLink } from '@tabler/icons-react';
import { useRef } from 'react';

import * as message from '../../common/notification';
import { IChannels } from '../../common/types';
import MyButton from '../ui/MyButton';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ChannelsForm = ({ channels, setChannels }) => {
    const refName = useRef<HTMLInputElement>(null);
    const refChatId = useRef<HTMLInputElement>(null);
    const refUrl = useRef<HTMLInputElement>(null);

    const addChannel = async () => {
        const saveChannelToDatabase = (channel: IChannels) => {
            fetch(serverHost + '/api/channels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(channel),
            });
        };
        const channel_name = refName.current?.value;
        const channel_chat_id = refChatId.current?.value;
        const channel_url = refUrl.current?.value;
        if (channel_name && channel_chat_id && channel_url) {
            const newChannel = { channel_name, channel_chat_id, channel_url };
            saveChannelToDatabase(newChannel);
            setChannels([...channels, newChannel]);
            message.success({ message: 'Channel added', id: undefined });
        }
    };
    return (
        <Group justify="flex-start" mt="md" mb="xs">
            <TextInput
                required
                ref={refName}
                leftSectionPointerEvents="none"
                leftSection={<IconBrandTelegram size={24} />}
                placeholder="Channel name"
            />
            <TextInput
                required
                ref={refChatId}
                leftSectionPointerEvents="none"
                leftSection={<IconId size={24} />}
                placeholder="Channel chat id"
            />
            <TextInput
                required
                ref={refUrl}
                leftSectionPointerEvents="none"
                leftSection={<IconLink size={24} />}
                placeholder="Channel url"
            />
            <MyButton
                disabled={false}
                buttonText="Add"
                leftSection={<IconCirclePlus size={24} />}
                onClick={() => addChannel()}
            />
        </Group>
    );
};
export default ChannelsForm;
