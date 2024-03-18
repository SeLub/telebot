import { useParams } from 'react-router-dom';
import { Title } from '@mantine/core';
import { Fragment, useState, useEffect } from "react";
import PostTextEditor from './PostTextEditor';
import Attach from './Attach';
import SubmitForm from './SubmitForm';
import CurrentAttachments from './CurrentAttachments';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const Post = () => {
      const { postId:post_id } = useParams();
      const [attachments, setAttachments] = useState([]);

      useEffect(() => {

            const getAttachments = async () => {
                  const response = await fetch(`${serverHost}/api/posts/photos/${post_id}`);
                  const data = await response.json();
                  if (data.code == 404) { setAttachments([]) } else { setAttachments(data) }
            }
                  getAttachments()
            }, [post_id, attachments])

      return(
            <Fragment>
                  <Title order={1}>Post {post_id}</Title>
                  <CurrentAttachments postId={post_id} attachments={attachments} setAttachments={setAttachments}/>
                  <Attach postId={post_id} attachments={attachments} setAttachments={setAttachments} />
                  <PostTextEditor postId={post_id} />
                  <SubmitForm  postId={post_id} />
            </Fragment>
      )
}
export default Post