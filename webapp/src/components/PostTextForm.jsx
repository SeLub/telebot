const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const PostForm = (params) => {
  const {postId, text, setText} = params;

  const handleTextChange = (e) => {
    setText(e.target.value);
    displayHTML(text);
  };

  const displayHTML = (htmlString) => {
    let targetElement = document.getElementById('text-message');
    targetElement.innerHTML = htmlString;
}

  const saveText = async (postId) => {

    const message = document.getElementById('message');
    
    try {
          const result = await fetch(`${serverHost}/api/posts/${postId}`, { 
            method: 'PUT',
            headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
              "post_text": text
            })
          });
          if (result.ok) {
                message.innerText='Post has been updated.'
          }
          console.log(result);
    } catch(error) {
          console.log('Error while try to update text of the post: ', error);
          message.innerText='Error while try to update text of the post.'
    }
  }

  return (
      <>
      <div width="50%">
                <div><textarea name="text" value={text} rows="15" cols="33" onChange={handleTextChange} /></div>
                <div><button id="saveTextButton" onClick={() => saveText(postId)} className="submit">Save Text</button></div>
                <div id='text-status'></div> 
      </div>
      <div width="50%">
      <div id='text-message'></div>
      </div>
    </>
  );
};



export default PostForm;