import { Flex } from '@mantine/core';
import { useState } from 'react';

import InputDatabaseName from './InputDatabaseName';
import SaveDatabaseButton from './SaveDatabaseButton';

const CreateDatabaseForm = (props) => {
    const { databases, setDatabases } = props;
    const [dbname, setDbname] = useState('');
    const [saved, setSaved] = useState(true);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <InputDatabaseName dbname={dbname} saved={saved} setSaved={setSaved} setDbname={setDbname} />
            <SaveDatabaseButton
                dbname={dbname}
                databases={databases}
                setDatabases={setDatabases}
                saved={saved}
                setSaved={setSaved}
            />
        </Flex>
    );
};
export default CreateDatabaseForm;
