import { Divider, Text, Title } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

import PublishersList from '../../Publishers/PublishersList';

const Step3 = ({ setDisabledNext }) => {
    return (
        <Fragment>
            <Title order={3}>Step 3: Arrange the Publishers</Title>
            <Text size="md">Arrange the Publishers.</Text>
            <Divider my="md" />
            <PublishersList setDisabledNext={setDisabledNext} />
        </Fragment>
    );
};
export default Step3;
