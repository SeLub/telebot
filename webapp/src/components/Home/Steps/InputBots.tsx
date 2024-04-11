import { Group, TextInput } from '@mantine/core';
import { IconCirclePlus, IconRobotFace, IconSquareKey } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import MyButton from '../../ui/MyButton';
import ListBots from './ListBots';

const InputBots = () => {
    const [bots, setBots] = useState([]);
    console.log('bots ', bots);
    const refName = useRef<HTMLInputElement>(null);
    const refToken = useRef<HTMLInputElement>(null);
    return (
        <Fragment>
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
                    onClick={() => {
                        const bot_name = refName.current?.value;
                        const bot_token = refToken.current?.value;
                        const newBot = { bot_name, bot_token };
                        setBots([...bots, newBot]);
                    }}
                />
            </Group>
            <ListBots bots={bots} setBots={setBots} />
        </Fragment>
    );
};
export default InputBots;
