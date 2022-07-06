import React from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      artista: '',
      resultApi: [],
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

  pesquisar = async () => {
    const { artist } = this.state;
    const listaArtista = await searchAlbumsAPI(artist);
    this.setState({
      artista: artist,
      artist: '',
      resultApi: listaArtista,
    });
  }

  render() {
    const { artist, disabledButton, resultApi, artista } = this.state;
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
          onClick={ this.pesquisar }
        >
          Pesquisar
        </button>
        {
          resultApi.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
            : (
              <div>
                <h2>{ `Resultado de álbuns de: ${artista}` }</h2>
                {
                  resultApi.map((album) => {
                    const { collectionName, artworkUrl100, collectionId } = album;
                    return (
                      <div key={ collectionId }>
                        <h4>{ collectionName }</h4>
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <NavLink
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        />
                      </div>
                    );
                  })
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
