import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { IDatabases } from '../../../common/types';

type Props = {
    databases: IDatabases[];
    setDatabase: any;
    saved: boolean;
};

const SelectDatabase = (props: Props) => {
    const { databases, setDatabase, saved } = props;

    const listDatabases = (databases: IDatabases[]) =>
        databases.map((database, index) => {
            return (
                <option key={index + 1} value={database.database_name}>
                    {database.database_name}
                </option>
            );
        });
    return (
        <Input
            disabled={saved}
            placeholder="Select bot"
            component="select"
            leftSection={<IconChevronDown size={14} stroke={1.5} />}
            pointer
            onChange={(event) => {
                const selectedDatabase = event.target.options[event.target.options.selectedIndex].text;
                console.log(selectedDatabase);
                setDatabase(selectedDatabase);
            }}
        >
            {listDatabases(databases)}
        </Input>
    );
};
export default SelectDatabase;
