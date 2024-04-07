import { ActionIcon, Grid } from '@mantine/core';
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
    const handleDelete = async (name) => {
        await removeDatabase(name);
        setDatabases(databases.filter((database: IDatabases) => database.database_name !== name));
    };
    return (
        <Fragment>
            {databases.map((database) => (
                <div key={database.database_id}>
                    <Grid key={database.database_id}>
                        <Grid.Col span={5}>{database.database_id}</Grid.Col>
                        <Grid.Col span={5}>{database.database_name}</Grid.Col>
                        <Grid.Col span={2}>
                            <ActionIcon
                                component="a"
                                href={`/database/name/${database.database_name}/id/${database.database_id}`}
                            >
                                <IconEdit size={18} />
                            </ActionIcon>{' '}
                            <ActionIcon>
                                <IconTrash size={18} onDoubleClick={() => handleDelete(database.database_name)} />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </div>
            ))}
        </Fragment>
    );
};
export default ListDatabases;
