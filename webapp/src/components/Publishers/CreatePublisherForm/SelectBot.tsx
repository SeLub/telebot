import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { IBots } from '../../../common/types';

const SelectBot = (props) => {
    const { bots, setBot, saved } = props;

    const listBots = (bots: IBots[]) =>
        bots.map((bot, index) => {
            return (
                <option key={index + 1} value={bot.bot_name}>
                    {bot.bot_name}
                </option>
            );
        });

    return (
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
    );
};
export default SelectBot;
