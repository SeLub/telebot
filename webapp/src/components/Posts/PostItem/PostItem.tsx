import { ActionIcon, Card, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCopy, IconEdit, IconToggleLeft, IconTrash } from '@tabler/icons-react';

import MyButton from '../../ui/MyButton';
import Attachments from '../Attachments';
import classes from './PostItem.module.css';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

type Props = {
    text: string;
    to: string;
    dbname: string;
    post_id: string;
    showEditButton: boolean;
    posts: any;
    setPosts: any;
};

function PostItem(props: Props) {
    const { text, to, dbname, post_id, posts, setPosts, showEditButton } = props;
    const [editorHTMLMode, handlers] = useDisclosure(true);

    const deletePost = async () => {
        try {
            const response = await fetch(`${serverHost}/api/posts/?database_name=${dbname}&post_id=${post_id}`, {
                method: 'DELETE',
            });
            const newPosts = posts.filter((post) => post.post_id !== post_id);
            setPosts(newPosts);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

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
                            rightSection={<IconToggleLeft size={18} />}
                            buttonText="HTML / Text"
                            color={'green'}
                            onClick={() => {
                                handlers.toggle();
                            }}
                        />
                        {/* <PublishPost database_name={dbname} post_id={post_id} /> */}
                    </Group>
                    <Group wrap="nowrap" gap="xs" justify="flex-end">
                        <ActionIcon variant="filled" color={'yellow'} aria-label="Clone Post">
                            <IconCopy size={18} />
                        </ActionIcon>
                        <ActionIcon variant="filled" color={'red'} aria-label="Delete Post">
                            <IconTrash size={18} onDoubleClick={() => deletePost()} />
                        </ActionIcon>
                    </Group>
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
