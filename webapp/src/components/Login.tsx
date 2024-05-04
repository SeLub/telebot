import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../provider/AuthProvider';
import classes from './Login.module.css';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function Login() {
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const useToken = async () => {
        const email = refEmail.current?.value;
        const password = refPassword.current?.value;
        if (email && password) {
            console.log({ email, password });

            try {
                const response = await fetch(serverHost + '/api/users/login', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                });

                const responseData = await response.json();

                if (response.ok) {
                    setToken(responseData.user.token);
                    navigate('/', { replace: true });
                    return 'OK';
                } else {
                    return responseData.message;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" required ref={refEmail} />
                <PasswordInput label="Password" placeholder="Your password" required ref={refPassword} mt="md" />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" onClick={useToken}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}
export default Login;
