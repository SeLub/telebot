import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import PostUp24Logo from '../../assets/appimg/logos/postup_logo_small_full.png';
import Header from '../Header';
import UserButton from '../UserButton';
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
                <Header />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
