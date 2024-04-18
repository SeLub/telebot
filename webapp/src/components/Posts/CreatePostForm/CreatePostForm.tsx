import { Flex } from '@mantine/core';
import { useState } from 'react';

import InputPostText from './InputPostText';
import SavePostButton from './SavePostButton';

const CreatePostForm = (props) => {
    const { posts, setPosts, database_name } = props;
    const [text, setText] = useState('');
    const [saved, setSaved] = useState(true);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <InputPostText text={text} setText={setText} saved={saved} setSaved={setSaved} />
            <SavePostButton
                post_text={text}
                posts={posts}
                setPosts={setPosts}
                saved={saved}
                setSaved={setSaved}
                database_name={database_name}
            />
        </Flex>
    );
};
export default CreatePostForm;
