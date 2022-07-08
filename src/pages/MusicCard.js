import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      check: false,
    };
  }

  adicionarFavoritos = ({ target }) => {
    addSong(Object.values(target)[1]);
    const { checked } = target;
    const tempo = 1000;
    this.setState({
      carregando: true,
      check: checked,
    });
    setTimeout(() => {
      this.setState({
        carregando: false,
      });
    }, tempo);
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando, check } = this.state;
    return (
      <div>
        {
          carregando ? <h1>Carregando...</h1>
            : (
              <div>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor={ `checkbox-music-${trackId}` } key={ trackName }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    id={ `checkbox-music-${trackId}` }
                    name={ trackName }
                    value={ `checkbox-music-${trackId}` }
                    onClick={ this.adicionarFavoritos }
                    checked={ check }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
