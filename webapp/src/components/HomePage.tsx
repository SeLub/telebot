import { Button, Group, Stepper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Fragment, useState } from 'react';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import createDB from '../db';

// addRxPlugin(RxDBQueryBuilderPlugin);

// async function createDb() {
//     if (process.env.NODE_ENV !== 'production') {
//         await import('rxdb/plugins/dev-mode').then((module) => addRxPlugin(module.RxDBDevModePlugin));
//     }
//     const PostsSchema = {
//         version: 0,
//         title: 'Posts schema',
//         primaryKey: 'post_id',
//         type: 'object',
//         properties: {
//             post_id: {
//                 type: 'string',
//                 maxLength: 36, // <- the primary key must have set maxLength
//             },
//             post_text: {
//                 type: 'string',
//             },
//         },
//         required: ['post_id', 'post_text'],
//     };

//     const url = URL.createObjectURL(new Blob());
//     const UUID = url.substring(url.lastIndexOf('/') + 1);
//     const db = await createRxDatabase({
//         name: 'database' + UUID, // <- name
//         storage: getRxStorageDexie(), // <- RxStorage
//     });
//     await db.addCollections({
//         posts: {
//             schema: PostsSchema,
//         },
//     });
//     await db.addCollections({
//         photos: {
//             schema: PostsSchema,
//         },
//     });
//     await db.posts.insert({
//         post_id: '1',
//         post_text: 'Test',
//     });
//     await db.posts.insert({
//         post_id: '2',
//         post_text: 'Success',
//     });
//     await db.posts
//         .find()
//         .where('post_id')
//         .eq('1')
//         .exec()
//         .then((documents) => console.dir('1', documents));
//     await db.posts
//         .find()
//         .exec() // <- find all documents
//         .then((documents) => console.dir('all', documents));
//     // Function to list all collections
//     const listCollections = async (db) => {
//         try {
//             // Get collection names from the database object
//             const collectionNames = Object.keys(db.collections);

//             console.log('Collections:', collectionNames);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     // Call the function to list collections
//     listCollections(db);

//     console.dir(db.posts.name);
//     return db;
// }

// const db = createDb();
// // console.log('!!! ', db);
// const { db } = new Database('test');
// db().then((db) => console.log('!!! ', Object.keys(db.collections)));

const createDB = async (name: string) => {
    const db = await createRxDatabase({
        name,
        storage: getRxStorageDexie(),
    });
    return db;
}
const list = async () => {
    const db = await createDB('test2');
    console.log('!!! ', Object.keys(db.collections));
};

list().then(() => console.log('done'));

const Home = () => {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    notifications.show({ message: 'Hello' });

    return (
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
                <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </Fragment>
    );
};
export default Home;
