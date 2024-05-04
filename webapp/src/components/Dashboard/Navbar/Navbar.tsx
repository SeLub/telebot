import { Box, NavLink } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import {
    IconBrandTelegram,
    IconCalendarMonth,
    IconChartArrowsVertical,
    IconDatabaseSmile,
    IconHome,
    IconRobot,
    IconRobotFace,
    IconSettings,
} from '@tabler/icons-react';

const data = [
    { link: '/', label: 'Home', icon: IconHome, description: 'Start your jorney.' },
    { link: '/bots', label: 'Bots', icon: IconRobotFace, description: 'Place where Bots live.' },
    { link: '/channels', label: 'Channels', icon: IconBrandTelegram, description: 'Your channel`s list.' },
    { link: '/postlines', label: 'PostLines', icon: IconDatabaseSmile, description: 'Post`s repositories.' },
    { link: '/plans', label: 'Plans', icon: IconCalendarMonth, description: 'The place where plans are born.' },
    { link: '/publishers', label: 'Publishers', icon: IconRobot, description: 'Robots to publish Posts.' },
    { link: '/statistic', label: 'Statistic', icon: IconChartArrowsVertical, description: 'Report`s Room.' },
    { link: '/settings', label: 'Settings', icon: IconSettings, description: 'Wild territory.' },
];

export function Navbar() {
    const [currentPage, setCurrentPage] = useLocalStorage<number>({
        key: 'current-page',
        defaultValue: 0,
    });

    const items = data.map((item, index) => (
        <NavLink
            href={item.link}
            key={item.label}
            active={index === currentPage}
            label={item.label}
            description={item.description}
            leftSection={<item.icon size="24" />}
            onClick={() => setCurrentPage(index)}
        />
    ));

    return <Box w={220}>{items}</Box>;
}
