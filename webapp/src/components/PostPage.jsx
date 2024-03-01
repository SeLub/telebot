import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import Navigation from './Navigation';
import PostTextForm from './PostTextForm';
import AttachmentsForm from './AttachmentsForm'
import SubmitForm from './SubmitForm';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const Post = () => {
      const { postId:post_id } = useParams();
      const [attachments, setAttachments] = useState([]);
      const [text, setText] = useState('');

      useEffect(() => {

            const getAttachments = async () => {
                  const response = await fetch(`${serverHost}/api/posts/photos/${post_id}`);
                  const data = await response.json();
                  if (data.code == 404) { setAttachments([]) } else { setAttachments(data) }
            }
                  getAttachments()
            }, [post_id])

      useEffect(() => {
            const getText = async () => {
                  const response = await fetch(`${serverHost}/api/posts/${post_id}`);
                  const data = await response.json();
                  const postText = data[0]['post_text']; 
                  if (data.code == 404) { setText([]) } else { setText(postText) }
            }
                  getText()
      }, [post_id])

      return(
            <>
                  <Navigation />
                  <h1>Post page {post_id}</h1>
                  <PostTextForm text={text} setText={setText} />
                  <AttachmentsForm attachments={attachments} setAttachments={setAttachments} post_id={post_id}/>
                  <SubmitForm  postId={post_id}/>
            </>
      )
}
export default Post