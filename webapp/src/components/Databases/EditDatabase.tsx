import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import PostsList from '../Posts/PostsList';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const EditDatabase = () => {
    const { database_id } = useParams<{ database_id: string }>();

    return (
        <Fragment>
            <Title order={1}>Edit database: {database_id}</Title>
            <PostsList database_id={database_id} />
        </Fragment>
    );
};

export default EditDatabase;
