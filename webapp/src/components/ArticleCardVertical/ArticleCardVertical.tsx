import { ActionIcon, Card, Group, Menu, Text, rem } from '@mantine/core';
import { IconCopy, IconDots, IconEdit, IconEye, IconFileZip, IconSend, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import Attachments from '../Attachments';
import PublishPost from '../PublishPost';
import MyButton from '../ui/MyButton';
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
                    <Group wrap="nowrap" gap="xs" justify="flex-end">
                        <MyButton
                            rightSection={<IconEdit size={18} />}
                            buttonText="Edit Post"
                            color={'blue'}
                            href={to}
                        />
                        <MyButton
                            rightSection={<IconCopy size={18} />}
                            buttonText="Clone Post"
                            color={'yellow'}
                            href={to}
                        />
                        <MyButton
                            rightSection={<IconTrash size={18} />}
                            buttonText="Delete Post"
                            color={'purple'}
                            href={to}
                        />
                        <PublishPost post_id={post_id} />
                    </Group>
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
            </Card.Section>
            <Card.Section inheritPadding py="xs">
                <Text className={classes.title} mt="xs" mb="md" dangerouslySetInnerHTML={{ __html: text }}></Text>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md">
                <Attachments post_id={post_id} height={70} />
            </Card.Section>
        </Card>
    );
}

export default ArticleCardVertical;
