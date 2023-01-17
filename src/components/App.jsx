import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Error from './Error/Error';
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
    status: 'idle',
  };

  /* async componentDidMount() {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const images = await api.fetchImagesWithQuery(searchQuery, page);
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  } */
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, error } = this.state;
    if (prevState.searchQuery !== this.state.searchQuery && error === null) {
      try {
        const images = await api.fetchImagesWithQuery(searchQuery, page);
        if (images.length === 0) {
          throw error;
        }
        this.setState({
          images,
          error: null,
          status: 'resolved',
          page: prevState.page + 1,
        });
      } catch (error) {
        this.setState({
          error: { message: 'Request returned nothing' },
          status: 'rejected',
        });
      }
    }
  }
  onLoad = () => {};
  onSearch = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };
  render() {
    const { images, error, status } = this.state;
    if (status === 'idle') {
      return <Searchbar onSearch={this.onSearch} />;
    }
    if (status === 'pending') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <Loader />
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <ImageGallery images={images} />
          <Button onClick={this.onLoad} />
          <Modal />
        </>
      );
    }
    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSearch={this.onSearch} />
          <Error message={error.message} />
        </>
      );
    }
  }
}
