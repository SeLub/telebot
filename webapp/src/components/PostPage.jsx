import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import Navigation from './Navigation';

const Post = () => {
      const { postId:post_id } = useParams()
      const [images, setImages] = useState([]);

      useEffect(() => {
            async function getImages(){
                  const response = await fetch(`http://localhost:3000/api/posts/photos/${post_id}`);
                  const data = await response.json();
                  console.log(data)
                  if (data.code == 404) { setImages([]) } else { setImages(data) }
            }
            getImages()

            }, [post_id])
      
            const listImage = (image) => (<li key={image.photo_id}>{image.photo_filename}</li>)
      return(
            <>
                  <Navigation />
                  <h1>Post page {post_id}</h1>
                  <ul> { images.map(image => listImage(image)) } </ul>
            </>
      )
}
export default Post