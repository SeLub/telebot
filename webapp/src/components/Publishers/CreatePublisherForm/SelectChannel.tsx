import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const listChannels = (channels: string[]) =>
    channels.map((channel, index) => {
        return (
            <option key={index + 1} value={channel}>
                {channel}
            </option>
        );
    });

const SelectChannel = (props) => {
    const { channels, setChannel, saved } = props;
    return (
        <Input
            disabled={saved}
            placeholder="Select bot"
            component="select"
            leftSection={<IconChevronDown size={14} stroke={1.5} />}
            pointer
            onChange={(event) => {
                const selectedChannel = event.target.options[event.target.options.selectedIndex].text;
                console.log(selectedChannel);
                setChannel(selectedChannel);
            }}
        >
            {listChannels(channels)}
        </Input>
    );
};
export default SelectChannel;
