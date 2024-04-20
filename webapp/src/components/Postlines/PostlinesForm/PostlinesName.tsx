import { Input } from '@mantine/core';
import { IconDatabaseSmile } from '@tabler/icons-react';

const PostlinesName = (props) => {
    const { dbname, setDbname, saved, setSaved } = props;

    return (
        <Input
            value={dbname}
            placeholder="Create new PostLine"
            onChange={(event) => {
                setSaved(false);
                setDbname(event.currentTarget.value);
            }}
            leftSection={<IconDatabaseSmile size={20} color={saved ? 'green' : 'red'} />}
        />
    );
};
export default PostlinesName;
