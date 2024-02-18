import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Navigation from './Navigation';

const Posts = () => {
      const [posts, setPosts] = useState([]);
      
      useEffect(() => {
            async function getPosts(){
                  const response = await fetch("http://localhost:3000/api/posts");
                  const data = await response.json();
                  setPosts(data)
            }
            getPosts()

      },
            [])

      const listPost = (post) => (<li key={post.post_id}><Link to={`/posts/${post.post_id}`} >{post.post_text}</Link></li>)
      
      return(
            <>
            <Navigation />
             <h1>Posts Page</h1>
                  <div>
                        <ul> { posts.map(post => listPost(post)) } </ul>
                  </div>
                  
            </>
            
      )
}

export default Posts