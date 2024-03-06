import PropTypes from 'prop-types';
const Picture = (props) => {
      const {imageName} = props;
      return(
      <>
            <img src={`https://s3.tebi.io/telegram.backet/images/${imageName}`} />
      </>
            
      )
}

Picture.propTypes = {
      imageName: PropTypes.string
    };

export default Picture