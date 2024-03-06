import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Image } from '@mantine/core';
import ReactLogo from '../assets/react.svg';
import { NavbarSimpleColored } from './NavbarSimpleColored'
import React from 'react';

export function Dashboard({children}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image radius="md" src={ReactLogo} alt="React Logo image" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
            <NavbarSimpleColored />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}