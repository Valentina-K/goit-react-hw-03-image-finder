import { PropTypes } from 'prop-types';
const Modal = ({ largeImageURL, tags }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
};
export default Modal;
