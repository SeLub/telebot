// Double Click Button
import { Button } from "@mantine/core";
import React, { useState} from "react";

type Props = {
  buttonId: string | undefined;
  handleOnClick: () => void | undefined;
  buttonClassName: string | undefined;
  buttonText: string | undefined;
};

function DCButton(props: Props ) {
      const { buttonId, handleOnClick, buttonClassName, buttonText } = props;
      const [color, setColor] = useState("teal");
      const [count, setCount] = useState(0);
      
      const nextClickSubmit = () => {
        if (count === 0) {
          setColor("red");
          setCount(1);
        } else {
          handleOnClick();
          setColor("teal");
          setCount(0);
      }
      }
  
  return <Button 
            className={buttonClassName}
            id={buttonId}
            onClick={nextClickSubmit}
            variant="filled"
            color={color}
         >{buttonText}
         </Button>;
}

export default DCButton;