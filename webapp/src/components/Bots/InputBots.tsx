import { Divider, Group, TextInput, Title } from '@mantine/core';
import { IconCirclePlus, IconRobotFace, IconSquareKey } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { IBot } from '../../common/types';

import * as message from '../../common/notification';
import MyButton from '../ui/MyButton';
import BotsList from './BotsList';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const InputBots = ({ bots, setBots }) => {
    useEffect(() => {
        async function getBots() {
            const response = await fetch(serverHost + '/api/bots');
            const data = await response.json();
            setBots(data);
        }
        getBots();
    }, [bots.length, setBots]);

    const refName = useRef<HTMLInputElement>(null);
    const refToken = useRef<HTMLInputElement>(null);

    const saveBotToDatabase = (bot: IBot) => {
        fetch(serverHost + '/api/bots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bot),
        });
    };

    const addBot = async () => {
        const bot_name = refName.current?.value;
        const bot_token = refToken.current?.value;
        if (bot_name && bot_token) {
            const newBot = { bot_name, bot_token };
            saveBotToDatabase(newBot);
            setBots([...bots, newBot]);
            message.success('Bot added', undefined);
        }
    };

    return (
        <Fragment>
            <Title order={2}>Bots</Title>
            <Divider my="md" />
            <Group justify="flex-start" mt="md" mb="xs">
                <TextInput
                    required
                    ref={refName}
                    leftSectionPointerEvents="none"
                    leftSection={<IconRobotFace size={24} />}
                    placeholder="Bot name"
                />
                <TextInput
                    required
                    ref={refToken}
                    leftSectionPointerEvents="none"
                    leftSection={<IconSquareKey size={24} />}
                    placeholder="Bot token"
                />
                <MyButton
                    disabled={false}
                    buttonText="Add"
                    leftSection={<IconCirclePlus size={24} />}
                    onClick={() => addBot()}
                />
            </Group>
            <BotsList bots={bots} setBots={setBots} />
        </Fragment>
    );
};
export default InputBots;
