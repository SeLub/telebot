const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;
import React, { Fragment, useState, useEffect } from 'react';
import DCButton from './ui/DCButton';
import { notifications } from '@mantine/notifications';
import { useEditor } from '@tiptap/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';


function PostTextEditor(params) {
      const { post_id } = params;
      const [editorContent, setEditorContent] = useState('');
      const [text, setText] = useState('');

      useEffect(() => {
            const getText = async () => {
                        const response = await fetch(`${serverHost}/api/posts/${post_id}`);
                        const data = await response.json();
                        const postText = data[0]['post_text'];
                        console.log('@@@@@@@@@@@@@@@@@@@@@@ => ', postText); 
                        setText(postText) }
                  getText()
      }, [text])

      console.log('editorContent ', editorContent);
      
      const editor = useEditor({
            extensions: [ StarterKit, Link, Underline],
            content: text,
            onUpdate({ editor }) {
                  setEditorContent(editor.getHTML());
            },
      }, [text]);

  const saveText = async (post_id) => {

      try {
            const result = await fetch(`${serverHost}/api/posts/${post_id}`, { 
                  method: 'PUT',
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ "post_text": editorContent })
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
      <Fragment>
      <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Code />
                        <RichTextEditor.Blockquote />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                        <RichTextEditor.ClearFormatting />
                  </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
    </RichTextEditor>
    <DCButton 
            buttonId = "saveTextButton"
            handleOnClick = {() => saveText(post_id)}
            buttonClassName = "submit" 
            buttonText = "SavePost"
      />
    </Fragment>
  );
}
export default PostTextEditor;