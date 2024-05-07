import { AppShell, Paper } from '@mantine/core';

function Dashboard({ children }) {
    return (
        <AppShell header={{ height: 68 }}>
            <AppShell.Header>
                {/* <HeaderTabs /> */}
                HEADER
            </AppShell.Header>
            <AppShell.Main>
                <Paper shadow="lg" p="xl">
                    {children}
                </Paper>
            </AppShell.Main>
            <AppShell.Footer>Test</AppShell.Footer>
        </AppShell>
    );
}
export default Dashboard;
