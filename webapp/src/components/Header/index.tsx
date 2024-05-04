import { Anchor, Box, Burger, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import PostUp24Logo from '../../assets/appimg/logos/postup_logo_small_full.png';
import classes from './Header.module.css';

const userLinks = [
    { link: '#', label: 'Privacy & Security' },
    { link: '#', label: 'Account settings' },
    { link: '#', label: 'Support options' },
];

const mainLinks = [
    { link: '#', label: 'Book a demo' },
    { link: '#', label: 'Documentation' },
    { link: '#', label: 'Community' },
    { link: '#', label: 'Academy' },
    { link: '#', label: 'Forums' },
];

function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);

    const mainItems = mainLinks.map((item, index) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            data-active={index === active || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
            }}
        >
            {item.label}
        </Anchor>
    ));

    const secondaryItems = userLinks.map((item) => (
        <Anchor
            href={item.link}
            key={item.label}
            onClick={(event) => event.preventDefault()}
            className={classes.secondaryLink}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <header className={classes.header}>
            <Container className={classes.inner}>
                {/* <Image radius="md" src={PostUp24Logo} alt="React Logo image" /> */}
                <Box className={classes.links} visibleFrom="sm">
                    <Group justify="flex-end">{secondaryItems}</Group>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" hiddenFrom="sm" />
            </Container>
        </header>
    );
}

export default Header;
