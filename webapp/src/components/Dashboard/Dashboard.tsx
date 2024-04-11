import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import PostUp24Logo from '../../assets/appimg/logos/postup_logo_small_full.png';
import { Navbar } from './Navbar/Navbar';

export function Dashboard({ children }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 68 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Image radius="md" src={PostUp24Logo} alt="React Logo image" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
