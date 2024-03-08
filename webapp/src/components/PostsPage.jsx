import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const Posts = () => {
      const [posts, setPosts] = useState([]);
      
      useEffect(() => {
            async function getPosts(){
                  const response = await fetch(`${serverHost}/api/posts`);
                  const data = await response.json();
                  setPosts(data)
            }
            getPosts()

      },
            [])

      const listPost = (post) => (<li key={post.post_id}><Link to={`/posts/${post.post_id}`} >{post.post_text}</Link></li>)
      
      return(
            <>
             <h1>Posts Page</h1>
                  <div>
                        <ul> { posts.map(post => listPost(post)) } </ul>
                  </div>
                  
            </>
            
      )
}

export default Posts