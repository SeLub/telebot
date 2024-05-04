import { Paper, Title } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';

import { isArrayEmpty } from '../../utils';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function Plans() {
    // const [plans, setPlans] = useState<any[]>([]);

    // useEffect(() => {
    //     if (setDisabledNext !== undefined) {
    //         setDisabledNext(isArrayEmpty(plans));
    //     }
    // }, [plans, setDisabledNext]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string>('');

    // const getPlans = async (id: string) => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`${serverHost}/plans/${id}`);
    //         const data = await response.json();
    //         setPlans(data);
    //     } catch (error: any) {
    //         setError(error.message);
    //     }
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     getPlans();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    // const handleDelete = async (id: string) => {
    //     try {
    //         const response = await fetch(`${serverHost}/plans/${id}`, {
    //             method: 'DELETE',
    //         });
    //         if (response.ok) {
    //             console.log('ok');
    //         }
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // };

    return (
        <Fragment>
            <Title order={2}>Plans</Title>
            <Paper shadow="lg" withBorder p="xl" bg="var(--mantine-color-cyan-1)">
                Plans
            </Paper>
        </Fragment>
    );
}
export default Plans;
