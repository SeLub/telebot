import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import { IDatabases } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const removeDatabase = async (name) => {
    const response = await fetch(`${serverHost}/api/posts/database/${name}`, {
        method: 'DELETE',
    });
    return await response.json();
};

const ListDatabases = ({ databases, setDatabases }) => {
    const inline = {
        display: 'inline-block',
        margin: '0 0 0 60px',
    };

    const handleDelete = async (name) => {
        await removeDatabase(name);
        setDatabases(databases.filter((database: IDatabases) => database.database_name !== name));
    };
    return (
        <Fragment>
            {databases.map((database) => (
                <div key={database.database_id} style={{ borderBottom: '1px solid lightgray' }}>
                    <div style={inline}>
                        <div>{database.database_name}</div>
                    </div>
                    <div style={inline}>
                        <ActionIcon component="a" href={`/database/name/${database.database_name}`}>
                            <IconEdit size={18} />
                        </ActionIcon>{' '}
                        <ActionIcon>
                            <IconTrash size={18} onDoubleClick={() => handleDelete(database.database_name)} />
                        </ActionIcon>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};
export default ListDatabases;
