import { Paper, Title } from '@mantine/core';
import { Fragment } from 'react';

const bots = ['@BisonTeamBot', '@OneMoreBot'];

function Settings() {
    return (
        <Fragment>
            <Title order={1}>Settings</Title>
            <Paper shadow="lg" withBorder p="xl">
                {bots.map((bot) => (
                    <>
                        <div>
                            <Title order={2}>{bot}</Title>
                        </div>
                    </>
                ))}
            </Paper>
        </Fragment>
    );
}
export default Settings;
