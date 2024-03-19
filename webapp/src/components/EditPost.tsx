import { Divider, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Attach from './Attach';
import CurrentAttachments from './CurrentAttachments';
import PostTextEditor from './PostTextEditor';
import SubmitForm from './SubmitForm';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

type Params = {
    post_id: string;
};

const Post = () => {
    const { post_id } = useParams<Params>();
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        const getAttachments = async () => {
            const response = await fetch(`${serverHost}/api/posts/photos/${post_id}`);
            const data = await response.json();
            if (data.code == 404) {
                setAttachments([]);
            } else {
                setAttachments(data);
            }
        };
        getAttachments();
    }, [post_id, attachments]);

    return (
        <Fragment>
            <Title order={1}>Post {post_id}</Title>
            <Divider my="xs" label="Current attachments" labelPosition="center" />
            <CurrentAttachments attachments={attachments} setAttachments={setAttachments} />
            <Divider my="xs" label="Add attachments" labelPosition="center" />
            <Attach post_id={post_id} attachments={attachments} setAttachments={setAttachments} />
            <Divider my="xs" label="Edit post" labelPosition="center" />
            <PostTextEditor post_id={post_id} />
            <Divider my="xs" label="Publish post" labelPosition="center" />
            <SubmitForm post_id={post_id} />
        </Fragment>
    );
};
export default Post;
