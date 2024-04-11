import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const listBots = (bots: string[]) =>
    bots.map((bot, index) => {
        return (
            <option key={index + 1} value={bot}>
                {bot}
            </option>
        );
    });

const SelectBot = (props) => {
    const { bots, setBot, saved } = props;

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
