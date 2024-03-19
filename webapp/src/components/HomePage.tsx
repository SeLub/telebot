import { notifications } from '@mantine/notifications';
import React, {Fragment, useState} from "react";
import { Title, Stepper, Button, Group } from '@mantine/core';

const Home = () => {
      const [active, setActive] = useState(1);
      const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
      const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
      notifications.show({ message: 'Hello' });

      return(
            <Fragment>
                   <Title order={1}>Home</Title>
                   <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                        <Stepper.Step label="Step 1" description="Create a table">
                        Step 1 content: Create a dedicated table
                        </Stepper.Step>
                        <Stepper.Step label="Step 2" description="Load CSV or XLS">
                        Step 2 content: Load CSV or XLS
                        </Stepper.Step>
                        <Stepper.Step label="Step 3" description="Edit Posts">
                        Step 3 content: Edit Posts
                        </Stepper.Step>
                        <Stepper.Step label="Step 4" description="Plan Posting">
                        Step 4 content: Plan Posting
                        </Stepper.Step>
                        <Stepper.Step label="Step 5" description="Start process">
                        Step 5 content: Start Process
                        </Stepper.Step>
                        <Stepper.Completed>
                        Completed, click back button to get to previous step
                        </Stepper.Completed>
                  </Stepper>

                  <Group justify="center" mt="xl">
                        <Button variant="default" onClick={prevStep}>Back</Button>
                        <Button onClick={nextStep}>Next step</Button>
                  </Group>
            </Fragment>
      )
}
export default Home