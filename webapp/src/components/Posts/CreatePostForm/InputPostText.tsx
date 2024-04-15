import { Input } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

const InputPostText = (props) => {
    const { text, setText, saved, setSaved } = props;

    return (
        <Input
            w={300}
            value={text}
            placeholder="Create new Post"
            onChange={(event) => {
                setSaved(false);
                setText(event.currentTarget.value);
            }}
            leftSection={<IconPencil size={20} color={saved ? 'green' : 'red'} />}
        />
    );
};
export default InputPostText;
