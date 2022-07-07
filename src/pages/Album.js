import React from 'react';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      tituloAlbum: '',
      nomeArtista: '',
      imagem: '',
      resultadoApi: [],
      carregamentoInicial: 0,
    };
  }

  recebeInformacao = async ({ match }) => {
    const { id } = match.params;
    const resultado = await getMusics(id);
    const { collectionName, artistName, artworkUrl100 } = resultado[0];
    this.setState({
      tituloAlbum: collectionName,
      nomeArtista: artistName,
      imagem: artworkUrl100,
      resultadoApi: resultado,
      carregamentoInicial: 1,
    });
  }

  render() {
    const { carregamentoInicial,
      nomeArtista,
      tituloAlbum,
      imagem,
      resultadoApi } = this.state;
    if (carregamentoInicial === 0) this.recebeInformacao(this.props);
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ imagem } alt={ tituloAlbum } />
        <h2 data-testid="album-name">{ tituloAlbum }</h2>
        <h4 data-testid="artist-name">{ nomeArtista }</h4>
        {
          resultadoApi.map((musica) => {
            const { trackName, previewUrl, trackId } = musica;
            if (trackName !== undefined) {
              return (<MusicCard
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
              />);
            }
            return '';
          })
        }
      </div>
    );
  }
}

export default Album;
