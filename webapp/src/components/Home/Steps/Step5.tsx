import { Divider, Text, Title } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

import Databases from '../../Postlines';

const Step5 = ({ setDisabledNext }) => {
    return (
        <Fragment>
            <Title order={3}>Step 5: Start and control process</Title>
            <Text size="md">Start and control process.</Text>
            <Divider my="md" />
            <Databases setDisabledNext={setDisabledNext} />
        </Fragment>
    );
};
export default Step5;
