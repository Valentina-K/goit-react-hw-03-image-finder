import { PropTypes } from 'prop-types';
const Modal = ({ largeImageURL, tags, onClick }) => {
  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default Modal;
