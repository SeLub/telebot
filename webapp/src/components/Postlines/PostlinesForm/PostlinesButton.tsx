import { ActionIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const PostlinesButton = (props) => {
    const { dbname, postlines, setPostlines, saved, setSaved } = props;

    const savePublisher = async () => {
        const response = await fetch(`${serverHost}/api/posts/database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dbname }),
        });
        const publisher = await response.json();
        setPostlines([...postlines, publisher]);
        setSaved(true);
    };
    return (
        <ActionIcon component="button" disabled={saved} color={saved ? 'green' : 'red'} onClick={savePublisher}>
            <IconCheck size={18} />
        </ActionIcon>
    );
};
export default PostlinesButton;
