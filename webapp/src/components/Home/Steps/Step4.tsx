import { Divider, Text, Title } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

import PlanPage from '../../Plans/PlansList';

const Step4 = ({ setDisabledNext }) => {
    return (
        <Fragment>
            <Title order={3}>Step 4: Plan Posting</Title>
            <Text size="md">Plan Posting.</Text>
            <Divider my="md" />
            <PlanPage setDisabledNext={setDisabledNext} />
        </Fragment>
    );
};
export default Step4;
