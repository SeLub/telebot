import { ActionIcon, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import { IPublishers } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const removePublisher = async (id: string) => {
    const response = await fetch(`${serverHost}/api/publishers/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
};

type Props = {
    publishers: IPublishers[];
    setPublishers: any;
};

const ListPublishers = (props: Props) => {
    const { publishers, setPublishers } = props;

    const inline = {
        display: 'inline-block',
        margin: '0 0 0 60px',
    };

    const handleDelete = async (id: string) => {
        await removePublisher(id);
        setPublishers(publishers.filter((publisher: IPublishers) => publisher.publisher_id !== id));
    };

    const pubList = () =>
        publishers.map((publisher) => (
            <div key={publisher.publisher_id} style={{ borderBottom: '1px solid lightgray' }}>
                <div style={inline}>
                    <div>{publisher.publisher_name}</div>
                </div>
                <div style={inline}>
                    <div>{publisher.postline_id}</div>
                </div>
                <div style={inline}>
                    <div>{publisher.bot_id}</div>
                </div>
                <div style={inline}>
                    <div>{publisher.channel_id}</div>
                </div>
                <div style={inline}>
                    <div>{publisher.strategy_id}</div>
                </div>
                <div style={inline}>
                    <ActionIcon key={publisher.publisher_id}>
                        <IconTrash
                            key={publisher.publisher_id}
                            size={18}
                            onDoubleClick={() => handleDelete(publisher.publisher_id)}
                        />
                    </ActionIcon>
                </div>
            </div>
        ));

    return <Fragment>{pubList()}</Fragment>;
};
export default ListPublishers;
