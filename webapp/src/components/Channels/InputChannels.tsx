import { Divider, Group, TextInput, Title } from '@mantine/core';
import { IconBrandTelegram, IconCirclePlus, IconId, IconLink } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';

import * as message from '../../common/notification';
import { IChannel } from '../../common/types';
import MyButton from '../ui/MyButton';
import ChannelsList from './ChannelsList';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const InputChannels = ({ channels, setChannels }) => {
    useEffect(() => {
        async function getChannels() {
            const response = await fetch(serverHost + '/api/channels');
            const data = await response.json();
            setChannels(data);
        }
        getChannels();
    }, [channels.length, setChannels]);

    const refName = useRef<HTMLInputElement>(null);
    const refChatId = useRef<HTMLInputElement>(null);
    const refUrl = useRef<HTMLInputElement>(null);

    const saveChannelToDatabase = (channel: IChannel) => {
        fetch(serverHost + '/api/channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(channel),
        });
    };

    const addChannel = async () => {
        const channel_name = refName.current?.value;
        const channel_chat_id = refChatId.current?.value;
        const channel_url = refUrl.current?.value;
        if (channel_name && channel_chat_id && channel_url) {
            const newChannel = { channel_name, channel_chat_id, channel_url };
            saveChannelToDatabase(newChannel);
            setChannels([...channels, newChannel]);
            message.success('Channel added', undefined);
        }
    };

    return (
        <Fragment>
            <Title order={2}>Channels</Title>
            <Divider my="md" />
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
            <ChannelsList channels={channels} setChannels={setChannels} />
        </Fragment>
    );
};
export default InputChannels;
