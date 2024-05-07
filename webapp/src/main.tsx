import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
// import * as Sentry from '@sentry/react';
import ReactDOM from 'react-dom/client';

import Dashboard from './components/Dashboard/Dashboard';
import AuthProvider from './provider/AuthProvider';
import Routes from './routes';

// const dsn = import.meta.env.SENTRY_DSN;
// const environment = import.meta.env.SENTRY_ENV;

// Sentry.init({
//     dsn,
//     environment,
//     integrations: [],
// });

const theme = {
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Verdana, sans-serif' },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider defaultColorScheme="light" theme={theme}>
        <Notifications position="top-right" />
        <AuthProvider>
            <Dashboard>
                <Routes />
            </Dashboard>
        </AuthProvider>
    </MantineProvider>,
);
