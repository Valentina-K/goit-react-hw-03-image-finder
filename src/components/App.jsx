import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

//const BASE_URL = 'https://pixabay.com/api/';
//const KEY = '32106201-0c90331702e18f870e8d36f12';

export default class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    countHits: 0,
    isLoader: false,
    isShow: false,
  };
  onLoad = () => {};
  render() {
    const { isLoader, isShow } = this.state;
    return (
      <div>
        <Searchbar />
        <Loader visible={isLoader} />
        <ImageGallery />
        <Button onClick={this.onLoad} />
        <Modal visible={isShow} />
      </div>
    );
  }
}
