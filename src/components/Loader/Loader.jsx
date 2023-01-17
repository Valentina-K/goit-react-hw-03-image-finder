import { RotatingLines } from 'react-loader-spinner';

const Loader = () => (
  <RotatingLines
    strokeColor="aqua"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
    className="Loader"
  />
);
export default Loader;
