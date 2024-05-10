import { readLocalStorageValue } from '@mantine/hooks';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const token = readLocalStorageValue({ key: 'token' });
console.log('token from localStorage ', token);

export const getBots = async () => {
    const response = await fetch(serverHost + '/api/bots', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    const data = await response.json();
    return data;
};

export const getChannels = async () => {
    const response = await fetch(serverHost + '/api/channels');
    const data = await response.json();
    return data;
};

export const fetchPublishers = async () => {
    const response = await fetch(serverHost + '/api/publishers/getInitData');
    const data = await response.json();
    return data;
};
export const fetchPostlines = async () => {
    const response = await fetch(serverHost + '/api/posts/databases');
    const data = await response.json();
    return data;
};

export const fetchPostline = async (database_id) => {
    const response = await fetch(serverHost + '/api/posts/' + database_id);
    const data = await response.json();
    return data;
};

export const fetchPost = async (database_id, post_id) => {
    const response = await fetch(serverHost + '/api/posts/database/' + database_id + '/post/' + post_id);
    const data = await response.json();
    return data;
};
