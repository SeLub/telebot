import { ActionIcon } from '@mantine/core';
import { IconPencilPlus } from '@tabler/icons-react';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const SavePostButton = (props) => {
    const { post_text, posts, setPosts, saved, setSaved, database_name } = props;

    const savePost = async () => {
        const response = await fetch(`${serverHost}/api/posts/createPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ database_name, post_text }),
        });
        const createdPost = await response.json();
        console.log('createdPost', createdPost);
        console.log({ database_name, post_text });
        setPosts([...posts, ...createdPost]);
        setSaved(true);
    };
    return (
        <ActionIcon component="button" disabled={saved} color={saved ? 'green' : 'red'} onClick={savePost}>
            <IconPencilPlus size={18} />
        </ActionIcon>
    );
};
export default SavePostButton;
