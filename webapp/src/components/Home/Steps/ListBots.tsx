import { Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';

const ListBots = ({ bots, setBots }) => {
    const handleDelete = (botName) => {
        setBots(bots.filter((bot) => bot.bot_name !== botName));
    };

    return (
        <Fragment>
            {bots.map((bot) => (
                <Fragment key={bot.bot_token}>
                    <Divider my="md" />
                    <div key={bot.bot_token}>
                        {bot.bot_name + '   ' + bot.bot_token + '   '}
                        <IconTrash size={18} onDoubleClick={() => handleDelete(bot.bot_name)} />
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
};
export default ListBots;
