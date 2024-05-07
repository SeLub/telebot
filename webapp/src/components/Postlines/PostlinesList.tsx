import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import { IPostlines } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const PostlinesList = ({ postlines, setPostlines }) => {
    const inline = {
        display: 'inline-block',
        margin: '0 0 0 60px',
    };

    const handleDelete = async (database_id) => {
        const removeDatabase = async (database_id) => {
            const response = await fetch(`${serverHost}/api/posts/database/${database_id}`, {
                method: 'DELETE',
            });
            return await response.json();
        };
        await removeDatabase(database_id);
        setPostlines(postlines.filter((postline: IPostlines) => postline.database_id !== database_id));
    };
    return (
        <Fragment>
            {postlines.map((postline) => (
                <div key={postline.database_id} style={{ borderBottom: '1px solid lightgray' }}>
                    <div style={inline}>
                        <div>{postline.database_name}</div>
                    </div>
                    <div style={inline}>
                        <ActionIcon component="a" href={`/postlines/${postline.database_id}`}>
                            <IconEdit size={18} />
                        </ActionIcon>{' '}
                        <ActionIcon>
                            <IconTrash size={18} onDoubleClick={() => handleDelete(postline.database_id)} />
                        </ActionIcon>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};
export default PostlinesList;
