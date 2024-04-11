import { Button } from '@mantine/core';

interface IMyButtonProps {
    buttonId?: string | undefined;
    disabled?: boolean | undefined;
    onClick?: () => void | undefined;
    handleOnClick?: () => void | undefined;
    buttonClassName?: string | undefined;
    color?: string | undefined;
    buttonText: string | undefined;
    rightSection?: unknown;
    leftSection?: unknown;
    href?: string;
}

function MyButton(props: IMyButtonProps) {
    const {
        buttonId,
        disabled,
        onClick,
        buttonClassName,
        color = 'teal',
        buttonText = 'Submit',
        rightSection,
        leftSection,
        href,
    } = props;
    return (
        <Button
            disabled={disabled}
            className={buttonClassName}
            rightSection={rightSection}
            leftSection={leftSection}
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
