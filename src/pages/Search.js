import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disabledButton: true,
    };
  }

  validaBotao = () => {
    const { artist } = this.state;
    const valorLimite = 2;
    if (artist.length >= valorLimite) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    }, this.validaBotao);
  }

  render() {
    const { artist, disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            name="artist"
            value={ artist }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
