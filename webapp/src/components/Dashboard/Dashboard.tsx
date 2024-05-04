import { Container, Paper, Tabs, rem } from '@mantine/core';
import {
    IconBrandTelegram,
    IconCalendarMonth,
    IconDatabaseSmile,
    IconMessageCircle,
    IconPhoto,
    IconRobot,
    IconRobotFace,
    IconSettings,
} from '@tabler/icons-react';
import { useState } from 'react';

import Postlines from '../Postlines';
import Settings from '../Settings/Settings';

function Dashboard({ children }) {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const iconStyle = { width: rem(24), height: rem(24) };
    console.log('render');

    return (
        <Container fluid px={100} bg="var(--mantine-color-blue-light)" h={500}>
            <Tabs
                variant="outline"
                radius="lg"
                defaultValue={activeTab}
                onChange={(value) => {
                    window.location.href = `/${value}`;
                    setActiveTab(value);
                }}
                fz="xl"
                py={10}
            >
                <Tabs.List justify="center">
                    <Tabs.Tab
                        value="bots"
                        leftSection={<IconRobotFace style={iconStyle} />}
                        bg="var(--mantine-color-grape-1)"
                        fz="xl"
                    >
                        Bots
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="channels"
                        leftSection={<IconBrandTelegram style={iconStyle} />}
                        bg="var(--mantine-color-teal-1)"
                        fz="xl"
                    >
                        Channels
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="postlines"
                        bg="var(--mantine-color-green-1)"
                        leftSection={<IconDatabaseSmile style={iconStyle} />}
                        fz="xl"
                    >
                        Postlines
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="plans"
                        bg="var(--mantine-color-cyan-1)"
                        leftSection={<IconCalendarMonth style={iconStyle} />}
                        fz="xl"
                    >
                        Plans
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="publishers"
                        bg="var(--mantine-color-orange-1)"
                        leftSection={<IconRobot style={iconStyle} />}
                        fz="xl"
                    >
                        Publishers
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        bg="var(--mantine-color-lime-1)"
                        leftSection={<IconSettings style={iconStyle} />}
                        fz="xl"
                    >
                        Settings
                    </Tabs.Tab>
                </Tabs.List>
                {/* 
                <Tabs.Panel value="bots">{children}</Tabs.Panel>

                <Tabs.Panel value="postlines">{children}</Tabs.Panel>

                <Tabs.Panel value="publishers">{children}</Tabs.Panel>

                <Tabs.Panel value="settings">{children}</Tabs.Panel> */}
            </Tabs>
            <Paper shadow="lg" p="xl">
                {children}
            </Paper>
        </Container>
    );
}
export default Dashboard;
