import { PropTypes } from 'prop-types';
const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
