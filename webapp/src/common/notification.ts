import { notifications } from '@mantine/notifications';

// import { IconCheck } from '@tabler/icons-react';
// import { Flex, Image, rem } from '@mantine/core';

// const Icon = () => {
//       return (
//             <IconCheck style={{ width: rem(18), height: rem(18) }} />
//       )
// };

export function start(message: string) {
    const id = notifications.show({
        loading: true,
        title: 'Started...',
        message,
        autoClose: false,
        withCloseButton: false,
    });
    return id;
}

export function success(message: string, id) {
    if (id !== undefined) {
        notifications.update({
            id,
            color: 'teal',
            title: 'Success',
            message: message,
            //  icon: Icon(),
            loading: false,
            autoClose: 2000,
        });
    } else {
        notifications.show({
            id,
            color: 'teal',
            title: 'Success',
            message: message,
            //  icon: Icon(),
            loading: false,
            autoClose: 2000,
        });
    }
}

export function error(message: string, id) {
    if (id !== undefined) {
        notifications.update({
            id,
            color: 'red',
            title: 'Error',
            message: message,
            loading: false,
            autoClose: 2000,
        });
    } else {
        notifications.show({
            id,
            color: 'red',
            title: 'Error',
            message: message,
            loading: false,
            autoClose: 2000,
        });
    }
}
