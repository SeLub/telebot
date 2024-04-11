import { Button, Divider, Group, Paper, Stepper, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Fragment } from 'react';

import Spep1 from './Steps/Step1';

const Home = () => {
    const [active, setActive] = useLocalStorage({
        key: 'homeActiveStepper',
        defaultValue: 0,
    });
    const nextStep = () =>
        setActive((current) => {
            if (current !== 0) notifications.show({ message: 'Step ' + current + ' finished successfully.' });
            return current < 5 ? current + 1 : current;
        });
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <Fragment>
            <Title order={1}>Home</Title>
            <Paper shadow="lg" withBorder p="xl">
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                    <Stepper.Step label="Step 1" description="Create channels and bots">
                        <Spep1 />
                    </Stepper.Step>
                    <Stepper.Step label="Step 2" description="Create PostLines and prepare posts">
                        Step 2 content: Create PostLines and prepare posts
                    </Stepper.Step>
                    <Stepper.Step label="Step 3" description="Plan Posting">
                        Step 3 content: Plan Posting
                    </Stepper.Step>
                    <Stepper.Step label="Step 4" description="Arrange the Publishers">
                        Step 4 content: Arrange the Publishers
                    </Stepper.Step>
                    <Stepper.Step label="Step 5" description="Start and control process">
                        Step 5 content: Start and control process
                    </Stepper.Step>
                    <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
                </Stepper>
                <Divider my="md" />

                <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                    <Button onClick={nextStep}>Next step</Button>
                </Group>
            </Paper>
        </Fragment>
    );
};
export default Home;
