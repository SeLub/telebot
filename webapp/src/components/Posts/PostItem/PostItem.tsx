import { ActionIcon, Card, Group, Menu, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCopy, IconDots, IconEdit, IconEye, IconFileZip, IconToggleLeft, IconTrash } from '@tabler/icons-react';

import MyButton from '../../ui/MyButton';
import Attachments from '../Attachments';
import PublishPost from '../PublishPost';
import classes from './PostItem.module.css';

type Props = {
    text: string;
    to: string;
    dbname: string;
    post_id: string;
    showEditButton: boolean;
};

function PostItem(props: Props) {
    const { text, to, dbname, post_id, showEditButton } = props;
    const [editorHTMLMode, handlers] = useDisclosure(true);

    return (
        <Card withBorder radius="lg" shadow="sm" className={classes.card}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Group wrap="nowrap" gap="xs" justify="flex-end">
                        {showEditButton && (
                            <MyButton
                                rightSection={<IconEdit size={18} />}
                                buttonText="Edit Post"
                                color={'blue'}
                                href={to}
                            />
                        )}
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
                        <MyButton
                            rightSection={<IconToggleLeft size={18} />}
                            buttonText="HTML / Text"
                            color={'green'}
                            onClick={() => {
                                handlers.toggle();
                            }}
                        />
                        <PublishPost database_name={dbname} post_id={post_id} />
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
                {editorHTMLMode ? (
                    <Text className={classes.text} mt="xs" mb="md" dangerouslySetInnerHTML={{ __html: text }}></Text>
                ) : (
                    <Text className={classes.text} mt="xs" mb="md">
                        {text}
                    </Text>
                )}
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md" className={classes.attachments}>
                <Attachments dbname={dbname} post_id={post_id} height={70} />
            </Card.Section>
        </Card>
    );
}

export default PostItem;
