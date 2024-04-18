import { Badge, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconKey, IconPassword, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import MyButton from '../../ui/MyButton';

const Auth = () => {
    const [logged, setLogged] = useLocalStorage({
        key: 'logged',
        defaultValue: false,
    });
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [codeRequested, setCodeRequested] = useState(false);
    const buttonDisabled = phone.length === 0 || password.length === 0;
    return (
        <Fragment>
            <Group justify="flex-start" mt="md" mb="xs">
                <Text fw={500}>Status :</Text>
                {logged ? <Badge color="green">Logged In</Badge> : <Badge color="pink">Logged Out</Badge>}
            </Group>

            <Stack w={300}>
                <TextInput
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.currentTarget.value)}
                    leftSectionPointerEvents="none"
                    leftSection={<IconPhone size={24} />}
                    label="Your phone"
                    placeholder="Your phone"
                />
                <PasswordInput
                    required
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    placeholder="Your password"
                    leftSection={<IconPassword size={24} />}
                />
                <MyButton
                    disabled={phone.length === 0 || password.length === 0}
                    buttonText="Get Phone Code"
                    leftSection={<IconKey size={24} />}
                    onClick={() => {
                        setCodeRequested(true);
                        console.log('getCode');
                    }}
                />
                {!buttonDisabled && codeRequested && (
                    <TextInput
                        required
                        value={code}
                        onChange={(event) => setCode(event.currentTarget.value)}
                        leftSectionPointerEvents="none"
                        leftSection={<IconKey size={24} />}
                        label="Code from phone"
                        placeholder="Code from phone"
                    />
                )}
            </Stack>
        </Fragment>
    );
};
export default Auth;
