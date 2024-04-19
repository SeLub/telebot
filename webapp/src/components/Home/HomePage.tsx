import { Button, Divider, Group, Paper, Stepper, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendarMonth, IconDatabaseSmile, IconRobot, IconRobotFace, IconRun } from '@tabler/icons-react';
import { Fragment, useState } from 'react';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';

const Home = () => {
    const [active, setActive] = useLocalStorage({
        key: 'homeActiveStepper',
        defaultValue: 0,
    });
    const [disabledNext, setDisabledNext] = useState(false);
    const [disabledPrev, setDisabledPrev] = useState(false);
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
                    <Stepper.Step
                        label="Step 1"
                        description="Create channels and bots"
                        icon={<IconRobotFace size={24} />}
                    >
                        <Step1 setDisabledNext={setDisabledNext} />
                    </Stepper.Step>
                    <Stepper.Step
                        label="Step 2"
                        description="Create PostLines and prepare posts"
                        icon={<IconDatabaseSmile size={26} />}
                    >
                        <Step2 setDisabledNext={setDisabledNext} />
                    </Stepper.Step>
                    <Stepper.Step
                        label="Step 3"
                        description="Arrange the Publishers"
                        icon={<IconCalendarMonth size={26} />}
                    >
                        <Step3 setDisabledNext={setDisabledNext} />
                    </Stepper.Step>
                    <Stepper.Step label="Step 4" description="Plan Posting" icon={<IconRobot size={26} />}>
                        <Step4 setDisabledNext={setDisabledNext} />
                    </Stepper.Step>
                    <Stepper.Step label="Step 5" description="Start and control process" icon={<IconRun size={26} />}>
                        <Step5 setDisabledNext={setDisabledNext} />
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
