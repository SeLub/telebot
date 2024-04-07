import { Flex } from '@mantine/core';
import { useState } from 'react';

import InputDatabaseName from './InputDatabaseName';
import SaveDatabaseButton from './SaveDatabaseButton';

const CreateDatabaseForm = (props) => {
    const { databases, setDatabases } = props;
    const [dbname, setDbname] = useState('Create new PostLine');
    const [saved, setSaved] = useState(true);

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <SaveDatabaseButton
                dbname={dbname}
                databases={databases}
                setDatabases={setDatabases}
                saved={saved}
                setSaved={setSaved}
            />
            <InputDatabaseName dbname={dbname} saved={saved} setSaved={setSaved} setDbname={setDbname} />
        </Flex>
    );
};
export default CreateDatabaseForm;
