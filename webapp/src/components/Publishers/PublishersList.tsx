import { ActionIcon, Divider, Flex, Grid, Input, Paper, Title } from '@mantine/core';
import { IconCheck, IconChevronDown, IconEdit, IconRobot, IconTrash } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';

import { IPublishers } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;
const bots = ['@BisonTeamBot', '@OneMoreBot'];
const listBots = (bots: string[]) =>
    bots.map((bot, index) => {
        return (
            <option key={index + 1} value={bot}>
                {bot}
            </option>
        );
    });

function PublishersList() {
    const [publishers, setPublishers] = useState<IPublishers[] | []>([]);
    const [pubname, setPubname] = useState('Create new Publisher');
    const [saved, setSaved] = useState(true);
    const [bot, setBot] = useState(bots[0]);

    const fetchPublishers = async () => {
        const response = await fetch(`${serverHost}/api/publisher/publishers`);
        return await response.json();
    };
    const removePublisher = async (id) => {
        const response = await fetch(`${serverHost}/api/publisher/publishers/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    };

    useEffect(() => {
        const prevPublisher = publishers;
        async function getPublishers() {
            const currentPublishers = await fetchPublishers();
            if (JSON.stringify(prevPublisher) !== JSON.stringify(currentPublishers)) {
                setPublishers(currentPublishers);
            }
        }
        getPublishers();
    }, [publishers]);

    const handleDelete = async (id) => {
        await removePublisher(id);
        setPublishers(publishers.filter((publisher: IPublishers) => publisher.publisher_id !== id));
    };

    const listPublihser = (publishers: IPublishers[]) => (
        <Fragment>
            {publishers.map((publisher) => (
                <div key={publisher.publisher_id}>
                    <Grid>
                        <Grid.Col span={4}>{publisher.publisher_name}</Grid.Col>
                        <Grid.Col span={3}>{publisher.publisher_bots}</Grid.Col>
                        <Grid.Col span={3}>{publisher.publisher_channels}</Grid.Col>
                        <Grid.Col span={2}>
                            <ActionIcon>
                                <IconEdit size={18} onClick={() => console.log('!')} />
                            </ActionIcon>
                            <ActionIcon>
                                <IconTrash size={18} onDoubleClick={() => handleDelete(publisher.publisher_id)} />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </div>
            ))}
        </Fragment>
    );

    const savePublisher = async () => {
        const response = await fetch(`${serverHost}/api/publisher/publishers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publisher_name: pubname, publisher_bots: bot }),
        });
        const publisher = await response.json();
        setPublishers([...publishers, publisher]);
        setSaved(true);
    };

    return (
        <Fragment>
            <Title order={1}>Publishers</Title>
            <Paper shadow="lg" withBorder p="xl">
                <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
                    <ActionIcon
                        component="button"
                        disabled={saved}
                        color={saved ? 'green' : 'red'}
                        onClick={savePublisher}
                    >
                        <IconCheck size={18} />
                    </ActionIcon>
                    <Input
                        value={pubname}
                        onChange={(event) => {
                            setSaved(false);
                            setPubname(event.currentTarget.value);
                        }}
                        leftSection={<IconRobot size={24} color={saved ? 'green' : 'red'} />}
                    />
                    <Input
                        disabled={saved}
                        placeholder="Select bot"
                        component="select"
                        leftSection={<IconChevronDown size={14} stroke={1.5} />}
                        pointer
                        onChange={(event) => {
                            const selectedBot = event.target.options[event.target.options.selectedIndex].text;
                            console.log(selectedBot);
                            setBot(selectedBot);
                        }}
                    >
                        {listBots(bots)}
                    </Input>
                </Flex>
                <Divider my="md" />
                {listPublihser(publishers)}
            </Paper>
        </Fragment>
    );
}
export default PublishersList;
