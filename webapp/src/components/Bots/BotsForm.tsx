import { Group, TextInput } from '@mantine/core';
import { IconCirclePlus, IconRobotFace, IconSquareKey } from '@tabler/icons-react';
import { useRef } from 'react';

import * as message from '../../common/notification';
import { IBots } from '../../common/types';
import MyButton from '../ui/MyButton';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const BotsForm = ({ bots, setBots }) => {
    const refName = useRef<HTMLInputElement>(null);
    const refToken = useRef<HTMLInputElement>(null);

    const addBot = async () => {
        const saveBotToDatabase = (bot: IBots) => {
            fetch(serverHost + '/api/bots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bot),
            });
        };
        const bot_name = refName.current?.value;
        const bot_token = refToken.current?.value;
        if (bot_name && bot_token) {
            const newBot = { bot_name, bot_token };
            saveBotToDatabase(newBot);
            setBots([...bots, newBot]);
            message.success({ message: 'Bot added', id: undefined });
        }
    };
    return (
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
    );
};
export default BotsForm;
