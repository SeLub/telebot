import {
    ActionIcon,
    Avatar,
    BackgroundImage,
    Box,
    Card,
    Center,
    Group,
    Menu,
    SimpleGrid,
    Text,
    rem,
} from '@mantine/core';
import { IconCopy, IconDots, IconEdit, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import Attachments from '../Attachments';
import classes from './ArticleCardVertical.module.css';

type Props = {
    text: string;
    to: string;
    post_id: string;
};

function ArticleCardVertical(props: Props) {
    const { text, to, post_id } = props;

    return (
        <Card withBorder radius="lg" shadow="sm" className={classes.card}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={500}>Review pictures</Text>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: rem(16), height: rem(16) }} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconFileZip style={{ width: rem(14), height: rem(14) }} />}>
                                Download zip
                            </Menu.Item>
                            <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
                                Preview all
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                color="red"
                            >
                                Delete all
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group wrap="nowrap" gap="xs" justify="flex-end">
                    <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                        technology
                    </Text>
                    <ActionIcon size={30}>
                        <Link to={to}>
                            <IconEdit style={{ width: rem(20), height: rem(20) }} />
                        </Link>
                    </ActionIcon>
                    <ActionIcon>
                        <IconCopy style={{ width: rem(20), height: rem(20) }} />
                    </ActionIcon>
                    <ActionIcon>
                        <IconTrash style={{ width: rem(20), height: rem(20) }} />
                    </ActionIcon>
                </Group>
            </Card.Section>
            <Card.Section inheritPadding py="xs">
                <Text className={classes.title} mt="xs" mb="md" dangerouslySetInnerHTML={{ __html: text }}></Text>
            </Card.Section>

            {/* <div className={classes.body}>
                
                <Group wrap="nowrap" gap="xs">
                    <Group gap="xs" wrap="nowrap">
                        <Avatar
                            size={20}
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                        />
                        <Text size="xs">Elsa Typechecker</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                        •
                    </Text>
                    <Text size="xs" c="dimmed">
                        Feb 6th
                    </Text>
                </Group>
            </div> */}
            <Card.Section inheritPadding mt="sm" pb="md">
                <Attachments post_id={post_id} />
            </Card.Section>
        </Card>
    );
}

export default ArticleCardVertical;
