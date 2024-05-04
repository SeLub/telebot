import { Button } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const isDev = process.env.VITE_REACT_APP_NODE_ENV === 'development';
const hostname = `${isDev ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL}`;

type ErrorPageProps = {
    error?: string;
};
const ErrorPage = (props: ErrorPageProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navMsg = location.state?.error;
    const msg = navMsg ? (
        <p className="text-lg">{navMsg}</p>
    ) : props.error ? (
        <p className="text-lg">{props.error}</p>
    ) : (
        <p className="text-lg">
            The targeted page <b>"{location.pathname}"</b> was not found, please confirm the spelling and try again.
        </p>
    );
    return (
        <section id="Error" className="w-full h-full flex flex-col items-center">
            {msg}
            <span className="flex flex-row justify-center items-center space-x-8 my-10 ">
                <Button id="backButton" onClick={() => navigate(-1)}>
                    Return to Previous Page
                </Button>
                <Button id="homeButton" onClick={() => navigate('/home')}>
                    Return to Home Page
                </Button>
                <Button
                    id="logout"
                    onClick={() => {
                        const endpoint = `${hostname}/logout`;
                        window.open(endpoint, '_blank');
                    }}
                >
                    Reset Authentication
                </Button>
            </span>
        </section>
    );
};

export default ErrorPage;
