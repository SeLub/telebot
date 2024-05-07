import { Divider, Tabs, Text, Title, rem } from '@mantine/core';
import {
    IconBrandTelegram,
    IconCalendarMonth,
    IconChartArrowsVertical,
    IconDatabaseSmile,
    IconRobot,
    IconRobotFace,
    IconSettings,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

const tabs = [
    {
        title: 'Postlines',
        image: IconDatabaseSmile,
        color: 'var(--mantine-color-green-1)',
    },
    {
        title: 'Channels',
        image: IconBrandTelegram,
        color: 'var(--mantine-color-teal-1)',
    },
    {
        title: 'Bots',
        image: IconRobotFace,
        color: 'var(--mantine-color-grape-1)',
    },
    {
        title: 'Plans',
        image: IconCalendarMonth,
        color: 'var(--mantine-color-cyan-1)',
    },
    {
        title: 'Publishers',
        image: IconRobot,
        color: 'var(--mantine-color-orange-1)',
    },
    {
        title: 'Statistic',
        image: IconChartArrowsVertical,
        color: 'ar(--mantine-color-lime-1',
    },
    {
        title: 'Settings',
        image: IconSettings,
        color: 'var(--mantine-color-teal-1',
    },
];
const iconStyle = { width: rem(24), height: rem(24) };

function Demo() {
    const navigate = useNavigate();
    const { tabValue } = useParams();

    const items = tabs.map((tabitem) => (
        <Tabs.Tab
            value={tabitem.title}
            leftSection={<tabitem.image style={iconStyle} />}
            key={tabitem.title}
            bg={tabitem.color}
        >
            {tabitem.title}
        </Tabs.Tab>
    ));

    //     const Panels = () =>
    //         tabs.forEach((tabitem) => {
    //             return (
    //                 <Tabs.Panel value={tabitem.title} key={tabitem.title} bg={tabitem.color}>
    //                     <Text order={1}>{tabitem.title}</Text>
    //                 </Tabs.Panel>
    //             );
    //         });

    return (
        <Tabs value={tabValue} onChange={(value) => navigate(`/${value}`)}>
            <Tabs.List>{items}</Tabs.List>
            <Tabs.Panel value="Postlines" bg="var(--mantine-color-green-1)">
                <Title order={2}>Postlines</Title>
                <Divider my="xs" label="Description" labelPosition="center" />
                <Text>Just text</Text>
            </Tabs.Panel>
            <Tabs.Panel value="Channels" bg="var(--mantine-color-teal-1)">
                <Title order={2}>Channels</Title>
                <Divider my="xs" label="Description" labelPosition="center" />
                <Text>Just text</Text>
            </Tabs.Panel>
        </Tabs>
    );
}

export default Demo;
