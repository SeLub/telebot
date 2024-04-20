import { Input } from '@mantine/core';
import { IconRobot } from '@tabler/icons-react';

const InputPublisherName = (props) => {
    const { pubname, setPubname, saved, setSaved, disabled } = props;

    return (
        <Input
            disabled={disabled}
            value={pubname}
            placeholder="Create new Publisher"
            onChange={(event) => {
                setSaved(false);
                setPubname(event.currentTarget.value);
            }}
            leftSection={<IconRobot size={24} color={saved ? 'green' : 'red'} />}
        />
    );
};
export default InputPublisherName;
