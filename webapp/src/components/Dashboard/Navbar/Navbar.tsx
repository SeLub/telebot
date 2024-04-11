import { Box, NavLink } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconDatabaseSmile, IconHome, IconRobot, IconSettings } from '@tabler/icons-react';

const data = [
    { link: '/', label: 'Home', icon: IconHome, description: 'Start your jorney.' },
    { link: '/database', label: 'PostLines', icon: IconDatabaseSmile, description: 'Workshop for your Posts.' },
    { link: '/publishers', label: 'Publishers', icon: IconRobot, description: 'Robots to publish Posts.' },
    { link: '/setting', label: 'Settings', icon: IconSettings, description: 'Wild territory.' },
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
