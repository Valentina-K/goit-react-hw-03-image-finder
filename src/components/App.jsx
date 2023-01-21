import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';

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
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, error } = this.state;
    console.log('componentDidUpdate', searchQuery, page);
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        const { hits, totalHits } = await api.fetchImagesWithQuery(
          searchQuery,
          page
        );
        console.log(hits);
        if (hits.length === 0) {
          throw error;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          error: null,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({
          error: { message: 'Request returned nothing' },
          status: 'rejected',
        });
      }
    }
  }
  onLoad = () => {
    console.log('onLoad', this.state.page, this.state.countHits);
    this.setState(prevState => ({
      page: prevState.page + 1,
      countHits: prevState.countHits + 12,
    }));
  };
  onSearch = searchQuery => {
    console.log('onSearch', searchQuery);
    this.setState({
      searchQuery,
      page: 1,
      countHits: 0,
      status: 'pending',
      images: [],
    });
  };

  render() {
    const { images, error, status } = this.state;
    console.log('render', status, images);
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
