import { ActionIcon, Grid } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const removePublisher = async (id) => {
    const response = await fetch(`${serverHost}/api/publisher/publishers/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
};

const ListPublishers = (props) => {
    const { publishers, setPublishers } = props;

    const handleDelete = async (id) => {
        await removePublisher(id);
        setPublishers(publishers.filter((publisher: IPublishers) => publisher.publisher_id !== id));
    };

    return (
        <Fragment>
            {publishers.map((publisher) => (
                <div key={publisher.publisher_id}>
                    <Grid key={publisher.publisher_id}>
                        <Grid.Col span={4}>{publisher.publisher_name}</Grid.Col>
                        <Grid.Col span={3}>{publisher.publisher_bots}</Grid.Col>
                        <Grid.Col span={3}>{publisher.publisher_channels}</Grid.Col>
                        <Grid.Col span={2}>
                            <ActionIcon>
                                <IconEdit size={18} onClick={() => console.log('!')} />
                            </ActionIcon>
                            <ActionIcon>
                                <IconTrash size={18} onDoubleClick={() => handleDelete(publisher.publisher_id)} />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </div>
            ))}
        </Fragment>
    );
};
export default ListPublishers;
