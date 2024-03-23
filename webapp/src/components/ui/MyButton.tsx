import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

interface IMyButtonProps {
    buttonId?: string | undefined;
    onClick?: () => void | undefined;
    handleOnClick?: () => void | undefined;
    buttonClassName?: string | undefined;
    color?: string | undefined;
    buttonText: string | undefined;
    rightSection?: any;
    href?: string;
}

function MyButton(props: IMyButtonProps) {
    const { buttonId, onClick, buttonClassName, color = 'teal', buttonText = 'Submit', rightSection, href } = props;
    return (
        <Button
            className={buttonClassName}
            rightSection={rightSection}
            id={buttonId}
            onClick={onClick}
            variant="filled"
            color={color}
            component="a"
            href={href}
        >
            {buttonText}
        </Button>
    );
}

export default MyButton;
