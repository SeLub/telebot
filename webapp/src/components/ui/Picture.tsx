import PropTypes from 'prop-types';
import { Image } from '@mantine/core';
import React from 'react';

const Picture = (props) => {
            const {imageName} = props;
      return(
            <Image
                  radius="md"
                  src={`https://s3.tebi.io/telegram.backet/images/${imageName}`}
            />
      )
};

Picture.propTypes = {
      imageName: PropTypes.string
    };

export default Picture;