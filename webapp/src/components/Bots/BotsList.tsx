import { Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

import * as message from '../../common/notification';
import { IBots } from '../../common/types';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ListBots = ({ bots, setBots }) => {
    const handleDelete = (botName: string) => {
        const id = message.start('Start delete bot.');
        const deleteBotFromDatabase = (botName: string) => {
            fetch(`${serverHost}/api/bots/${botName}`, { method: 'DELETE' });
        };
        try {
            deleteBotFromDatabase(botName);
            setBots(bots.filter((bot: IBots) => bot.bot_name !== botName));
            message.success({ message: 'Bot deleted.', id });
        } catch (error) {
            message.error({ message: 'Bot not deleted.', id });
            console.log(error);
        }
    };

    return (
        <Fragment>
            {bots.map((bot: IBots, index: number) => (
                <Fragment key={index}>
                    <Divider my="md" />
                    <div key={bot.bot_id}>
                        {bot.bot_name + '   ' + bot.bot_token + '   '}
                        <IconTrash size={18} onDoubleClick={() => handleDelete(bot.bot_name)} />
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
};
export default ListBots;
