import PropTypes from 'prop-types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const PublishPost = (props) => {
      const { postId } = props;

      const publishPost = async (postId) => {
            try {
                  const result = await fetch(`${serverHost}/api/posts/publish/${postId}`, { method: 'POST' });
                  if (result.ok) {
                        const message = document.getElementById('message');
                        message.innerText='Post has been published.'
                  }
                  console.log(result);
            } catch(error) {
                  console.log('Error while try to publish post: ', error);
            }

      }
      return(
            <>
            <div width="50%">
                <div><button id="publishButton" onClick={() => publishPost(postId)} className="submit">Publish Post</button></div>
                <div id='message'></div>  
            </div>
            </>
      )
}
export default PublishPost

PublishPost.propTypes = {
      postId: PropTypes.string
    };