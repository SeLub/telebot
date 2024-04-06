import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import PostsList from '../Posts/PostsList';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const EditDatabase = () => {
    const { database_id } = useParams<{ database_id: string }>();
    const [dbname, setDbname] = useState('');

    useEffect(() => {
        async function getDatabaseName() {
            const response = await fetch(`${serverHost}/api/posts/database/${database_id}`);
            const { database_name } = await response.json();
            setDbname(database_name);
        }
        getDatabaseName();
    }, [database_id, dbname]);

    return (
        <Fragment>
            <Title order={1}>Edit database: {database_id}</Title>
            <PostsList database_id={database_id} dbname={dbname} />
        </Fragment>
    );
};

export default EditDatabase;
