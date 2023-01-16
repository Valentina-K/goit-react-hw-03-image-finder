import { PropTypes } from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ visible }) => (
  <RotatingLines
    strokeColor="aqua"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={visible}
  />
);
export default Loader;
Loader.propTypes = {
  visible: PropTypes.bool,
};
