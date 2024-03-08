import DCButton from "./ui/DCButton";
import { notifications } from '@mantine/notifications';
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
            notifications.show({
              title: 'Success',
              message: 'Post has been updated. 😊',
              color: "green"
            });
          }
          console.log(result);
    } catch(error) {
          notifications.show({
            title: 'Failed',
            message: 'Error while try to update text of the post. 🤥',
            color: "red"
          });
    }
  }

  return (
      <>
      <div width="50%">
                <div><textarea name="text" value={text} rows="15" cols="33" onChange={handleTextChange} /></div>
                <RichTextEditor editor={editor}>
                  {editor && (
                    <BubbleMenu editor={editor}>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Link />
                      </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                  )}
                  <RichTextEditor.Content />
                </RichTextEditor>
                <DCButton 
                  buttonId = "saveTextButton"
                  handleOnClick = {() => saveText(postId)}
                  buttonClassName = "submit" 
                  buttonText = "SavePost"
                  color="green"
                />
                                
                <div id='text-status'></div> 
      </div>
      <div width="50%">
      <div id='text-message'></div>
      </div>
    </>
  );
};



export default PostForm;