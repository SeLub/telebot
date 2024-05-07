import { notifications } from '@mantine/notifications';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { Underline } from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Fragment, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import { IPost } from '../../common/types';
import DCButton from '../ui/DCButton';
import PostItem from './PostItem/PostItem';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function PostTextEditor() {
    const { post_id, database_id } = useParams<{ database_id: string; post_id: string }>();
    const originPost = useLoaderData() as IPost[];
    const { post_text } = originPost[0];

    const [editorContent, setEditorContent] = useState('');
    const [text, setText] = useState(post_text);

    const editor = useEditor(
        {
            extensions: [StarterKit, Link, Underline],
            content: text,
            onBlur({ editor }) {
                setEditorContent(editor.getHTML());
                setText(editor.getHTML());
            },
        },
        [text],
    );

    const saveText = async (post_id, database_id) => {
        try {
            const result = await fetch(`${serverHost}/api/posts/editPost`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ database_id, post_id, post_text: editorContent }),
            });

            if (result.ok) {
                notifications.show({
                    title: 'Success',
                    message: 'Post has been updated. 😊',
                    color: 'green',
                });
            }
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
            <PostItem
                database_id={database_id}
                showEditButton={false}
                to={'#'}
                text={text}
                post_id={post_id}
                posts={undefined}
                setPosts={undefined}
            />
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
                        handleOnClick={() => saveText(post_id, database_id)}
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
