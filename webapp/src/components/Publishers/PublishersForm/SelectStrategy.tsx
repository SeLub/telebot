import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const SelectStrategy = (props) => {
    const { strategies, setStrategy, saved } = props;

    const listStrategies = (strategies: string[]) =>
        strategies.map((strategy: string, index: number) => {
            return (
                <option key={index + 1} value={strategy}>
                    {strategy}
                </option>
            );
        });
    return (
        <Input
            disabled={saved}
            placeholder="Select Strategy"
            component="select"
            leftSection={<IconChevronDown size={14} stroke={1.5} />}
            pointer
            onChange={(event) => {
                const selectedStrategy = event.target.options[event.target.options.selectedIndex].text;
                setStrategy(selectedStrategy);
            }}
        >
            {listStrategies(strategies)}
        </Input>
    );
};
export default SelectStrategy;
