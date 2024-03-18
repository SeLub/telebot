import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import PostTextEditor from './PostTextEditor';
import AttachmentsForm from './AttachmentsForm';
import Attach from './Attach';
import SubmitForm from './SubmitForm';
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
            }, [post_id])

      return(
            <>
                  <h1>Post page {post_id}</h1>
                  <PostTextEditor postId={post_id} />
                  <Attach postId={post_id} attachments={attachments} setAttachments={setAttachments} />
                  {<AttachmentsForm attachments={attachments} setAttachments={setAttachments} post_id={post_id}/>}
                  <SubmitForm  postId={post_id} />
            </>
      )
}
export default Post