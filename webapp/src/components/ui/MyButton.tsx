import { Button } from "@mantine/core";
import React from "react";

type Props = {
      buttonId: string | undefined;
      handleOnClick: () => void | undefined;
      buttonClassName: string | undefined;
      buttonText: string | undefined;
    };

function MyButton(props) {
  const { buttonId, onClick, buttonClassName, color="teal", buttonText="Submit" } = props;
  return    <Button 
                  className={buttonClassName}
                  id={buttonId}
                  onClick={onClick}
                  variant="filled"
                  color={color}
            >{buttonText}
            </Button>;
}

export default MyButton;