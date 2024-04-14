import { Button, Divider, Group, Paper, Stepper, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Fragment, useState } from 'react';

import Spep1 from './Steps/Step1';

const Home = () => {
    const [active, setActive] = useLocalStorage({
        key: 'homeActiveStepper',
        defaultValue: 0,
    });
    const [disabledNext, setDisabledNext] = useState(true);
    const [disabledPrev, setDisabledPrev] = useState(true);
    const nextStep = () =>
        setActive((current) => {
            const stepNumber = current + 1;
            if (current === 0) {
                setDisabledPrev(false);
            }

            if (stepNumber !== 5) {
                notifications.show({ message: `Step ${stepNumber} finished successfully.` });
            } else {
                notifications.show({ message: 'All steps completed successfully.' });
                setDisabledNext(true);
            }
            return current < 5 ? current + 1 : current;
        });
    const prevStep = () =>
        setActive((current) => {
            if (current === 1) {
                setDisabledPrev(true);
            }
            return current > 0 ? current - 1 : current;
        });

    return (
        <Fragment>
            <Title order={1}>Home</Title>
            <Paper shadow="lg" withBorder p="xl">
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                    <Stepper.Step label="Step 1" description="Create channels and bots">
                        <Spep1 setDisabledNext={setDisabledNext} />
                    </Stepper.Step>
                    <Stepper.Step label="Step 2" description="Create PostLines and prepare posts">
                        Step 2 content: Create PostLines and prepare posts
                    </Stepper.Step>
                    <Stepper.Step label="Step 3" desdisabledPrevcription="Plan Posting">
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
                    <Button variant="default" onClick={prevStep} disabled={disabledPrev}>
                        Back
                    </Button>
                    <Button onClick={nextStep} disabled={disabledNext}>
                        Next step
                    </Button>
                </Group>
            </Paper>
        </Fragment>
    );
};
export default Home;
