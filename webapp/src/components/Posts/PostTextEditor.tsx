import { notifications } from '@mantine/notifications';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { Underline } from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Fragment, useEffect, useState } from 'react';

import { transpileHTMLtoTelegramHTML } from '../../utils';
import DCButton from '../ui/DCButton';
import ArticleCardVertical from './PostItem/PostItem';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostTextEditor(params) {
    const { post_id } = params;
    const [editorContent, setEditorContent] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        const getText = async () => {
            const response = await fetch(`${serverHost}/api/posts/${post_id}`);
            const data = await response.json();
            const postText = data[0]['post_text'];
            setText(postText);
            setEditorContent(postText);
        };
        getText();
    });

    const editor = useEditor(
        {
            extensions: [StarterKit, Link, Underline],
            content: editorContent,
            onUpdate({ editor }) {
                setText(editor.getHTML());
            },
        },
        [editorContent],
    );

    const saveText = async (post_id) => {
        console.log('text ', text);
        console.log('editorContent');
        try {
            const result = await fetch(`${serverHost}/api/posts/${post_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_text: text }),
            });

            if (result.ok) {
                notifications.show({
                    title: 'Success',
                    message: 'Post has been updated. 😊',
                    color: 'green',
                });
            }
            console.log(result);
        } catch (error) {
            notifications.show({
                title: 'Failed',
                message: 'Error while try to update text of the post. 🤥',
                color: 'red',
            });
        }
    };

    return (
        <Fragment>
            <ArticleCardVertical showEditButton={false} to={'#'} text={text} post_id={post_id} />
            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar>
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
                    <DCButton
                        buttonId="saveTextButton"
                        handleOnClick={() => saveText(post_id)}
                        buttonClassName="submit"
                        buttonText="SaveText"
                    />
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
            </RichTextEditor>
        </Fragment>
    );
}
export default PostTextEditor;
