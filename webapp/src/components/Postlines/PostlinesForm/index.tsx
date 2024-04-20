import { Flex } from '@mantine/core';
import { useState } from 'react';

import PostlinesButton from './PostlinesButton';
import PostlinesName from './PostlinesName';

const PostlinesForm = ({ postlines, setPostlines }) => {
    const [dbname, setDbname] = useState('');
    const [saved, setSaved] = useState(true);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <PostlinesName dbname={dbname} saved={saved} setSaved={setSaved} setDbname={setDbname} />
            <PostlinesButton
                dbname={dbname}
                postlines={postlines}
                setPostlines={setPostlines}
                saved={saved}
                setSaved={setSaved}
            />
        </Flex>
    );
};
export default PostlinesForm;
