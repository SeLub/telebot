import { Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import * as message from '../../common/notification';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ListBots = ({ bots, setBots }) => {
    const deleteBotFromDatabase = (botId) => {
        fetch(`${serverHost}/api/bots/${botId}`, { method: 'DELETE' });
    };

    const handleDelete = (botId) => {
        const id = message.start('Start delete bot.');
        try {
            deleteBotFromDatabase(botId);
            setBots(bots.filter((bot) => bot.bot_id !== botId));
            message.success('Bot deleted.', id);
        } catch (error) {
            message.error('Bot not deleted.', id);
            console.log(error);
        }
    };

    return (
        <Fragment>
            {bots.map((bot, index) => (
                <Fragment key={index}>
                    <Divider my="md" />
                    <div key={bot.bot_id}>
                        {bot.bot_name + '   ' + bot.bot_token + '   '}
                        <IconTrash size={18} onDoubleClick={() => handleDelete(bot.bot_id)} />
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
};
export default ListBots;
