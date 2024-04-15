import { Divider, Text, Title } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

import Databases from '../../Databases/Databases';

const Step2 = ({ setDisabledNext }) => {
    return (
        <Fragment>
            <Title order={3}>Step 2: Create PostLines and prepare posts</Title>
            <Text size="md">Create PostLines and prepare posts.</Text>
            <Divider my="md" />
            <Databases setDisabledNext={setDisabledNext} />
        </Fragment>
    );
};
export default Step2;
