import {
    Icon2fa,
    IconBellRinging,
    IconDatabaseImport,
    IconKey,
    IconLogout,
    IconReceipt2,
    IconRobot,
    IconSettings,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useState } from 'react';

import classes from './Navbar.module.css';

const data = [
    { link: '/', label: 'Databases', icon: IconDatabaseImport },
    { link: '/posts', label: 'Posts', icon: IconBellRinging },
    { link: '/image', label: 'Billing', icon: IconReceipt2 },
    { link: '/publishers', label: 'Publishers', icon: IconRobot },
    { link: '', label: 'SSH Keys', icon: IconKey },

    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '/setting', label: 'Other Settings', icon: IconSettings },
];

export function Navbar() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={() => {
                console.log('item.label');
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>{links}</div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
