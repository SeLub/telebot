import PropTypes from 'prop-types';
import Navigation from './Navigation';
const Picture = (props) => {
      const {imageName} = props;
      return(
      <>
            <Navigation />
            <img src={`https://s3.tebi.io/telegram.backet/images/${imageName}`} />
      </>
            
      )
}

Picture.propTypes = {
      imageName: PropTypes.string
    };

export default Picture