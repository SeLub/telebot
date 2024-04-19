import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { IChannels } from '../../../common/types';

const SelectChannel = (props) => {
    const { channels, setChannel, saved } = props;

    const listChannels = (channels: IChannels[]) =>
        channels.map((channel) => {
            return (
                <option key={channel.channel_id} value={channel.channel_id}>
                    {channel.channel_name}
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
