import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import api from '../api/api';

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    countHits: 0,
    isLoading: false,
    isShow: false,
    error: null,
  };

  async componentDidMount() {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const images = api.fetchArticlesWithQuery(searchQuery, page);
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
  onLoad = () => {};
  render() {
    const { isLoading, isShow, images, error } = this.state;
    return (
      <div>
        <Searchbar />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading ?? <Loader visible={isLoading} />}
        {images.length > 0 ?? <ImageGallery images={images} />}

        <Button onClick={this.onLoad} />
        <Modal visible={isShow} />
      </div>
    );
  }
}
