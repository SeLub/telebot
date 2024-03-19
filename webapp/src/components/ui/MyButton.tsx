import { Button } from '@mantine/core';

interface IMyButtonProps {
    buttonId: string | undefined;
    onClick: () => void | undefined;
    handleOnClick: () => void | undefined;
    buttonClassName: string | undefined;
    color: string | undefined;
    buttonText: string | undefined;
}

function MyButton(props: IMyButtonProps) {
    const { buttonId, onClick, buttonClassName, color = 'teal', buttonText = 'Submit' } = props;
    return (
        <Button className={buttonClassName} id={buttonId} onClick={onClick} variant="filled" color={color}>
            {buttonText}
        </Button>
    );
}

export default MyButton;
