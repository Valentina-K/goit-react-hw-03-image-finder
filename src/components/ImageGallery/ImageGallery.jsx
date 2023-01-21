import { PropTypes } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import React, { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    isShow: false,
    largeImageURL: '',
    tags: '',
  };

  onClickImage = (largeImageURL, tags) => {
    console.log('onClickImage', largeImageURL);
    this.setState({ isShow: true, largeImageURL, tags });
  };
  onClickOverlay = e => {
    if (e.target.className === 'Overlay') {
      this.setState({ isShow: false, largeImageURL: '' });
    }
  };
  render() {
    const { isShow, largeImageURL, tags } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {this.props.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              onClick={() => this.onClickImage(image.largeImageURL, image.tags)}
            />
          ))}
        </ul>
        {isShow && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={this.onClickOverlay}
          />
        )}
      </>
    );
  }
}

/* const isShow = false;
const largeImageURL = '';
function onClickImage(largeImageURL){
  isShow = true;
  largeImageURL = largeImageURL;
}
const ImageGallery = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
          onClick={this.onClickImage(largeImageURL)}
        />
      ))}
      {isShow && <Modal largeImageURL={largeImageURL} tags onClick={this.onClickOverlay} />}
    </ul>
  );
}; */
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
