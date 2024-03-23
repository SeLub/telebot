// Double Click Button
import { Button } from '@mantine/core';
import { useState } from 'react';

type Props = {
    buttonId: string | undefined;
    handleOnClick: () => Promise<void> | undefined;
    buttonClassName: string | undefined;
    buttonText: string | undefined;
    rightSection?: unknown;
};

function DCButton(props: Props) {
    const { buttonId, handleOnClick, buttonClassName, buttonText, rightSection } = props;
    const [color, setColor] = useState('teal');
    const [count, setCount] = useState(0);

    const nextClickSubmit = () => {
        if (count === 0) {
            setColor('red');
            setCount(1);
        } else {
            handleOnClick();
            setColor('teal');
            setCount(0);
        }
    };

    return (
        <Button
            rightSection={rightSection}
            className={buttonClassName}
            id={buttonId}
            onClick={nextClickSubmit}
            variant="filled"
            color={color}
        >
            {buttonText}
        </Button>
    );
}

export default DCButton;
