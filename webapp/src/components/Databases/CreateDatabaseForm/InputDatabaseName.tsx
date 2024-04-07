import { Input } from '@mantine/core';
import { IconDatabaseImport } from '@tabler/icons-react';

const InputPublisherName = (props) => {
    const { dbname, setDbname, saved, setSaved } = props;

    return (
        <Input
            value={dbname}
            placeholder="Create new PostLine"
            onChange={(event) => {
                setSaved(false);
                setDbname(event.currentTarget.value);
            }}
            leftSection={<IconDatabaseImport size={20} color={saved ? 'green' : 'red'} />}
        />
    );
};
export default InputPublisherName;
