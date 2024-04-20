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

    const handleDelete = async (name) => {
        const removeDatabase = async (name) => {
            const response = await fetch(`${serverHost}/api/posts/database/${name}`, {
                method: 'DELETE',
            });
            return await response.json();
        };
        await removeDatabase(name);
        setPostlines(postlines.filter((postline: IPostlines) => postline.database_name !== name));
    };
    return (
        <Fragment>
            {postlines.map((postline) => (
                <div key={postline.database_id} style={{ borderBottom: '1px solid lightgray' }}>
                    <div style={inline}>
                        <div>{postline.database_name}</div>
                    </div>
                    <div style={inline}>
                        <ActionIcon component="a" href={`/database/name/${postline.database_name}`}>
                            <IconEdit size={18} />
                        </ActionIcon>{' '}
                        <ActionIcon>
                            <IconTrash size={18} onDoubleClick={() => handleDelete(postline.database_name)} />
                        </ActionIcon>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};
export default PostlinesList;
