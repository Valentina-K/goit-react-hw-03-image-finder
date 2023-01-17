import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgSearch from '../../images/imgSearch.svg';

export default class Searchbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  state = {
    search: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.search === '') {
      alert('error');
      return;
    }
    this.props.onSearch(this.state.search);
    this.reset();
  };
  reset = () => {
    this.setState({ search: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button
            type="submit"
            className="SearchForm-button"
            style={{ backgroundImage: `url(${imgSearch})` }}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            name="search"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
