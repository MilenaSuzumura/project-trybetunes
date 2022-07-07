import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      time: false,
      carregamentoInicio: 0,
    };
  }

  carregamento = async () => {
    const tempo = 100;
    this.setState({
      time: true,
      carregamentoInicio: 1,
    });
    const pessoaUsuaria = await getUser();
    setTimeout(() => {
      this.setState({
        time: false,
        usuario: Object.values(pessoaUsuaria)[0],
      });
    }, tempo);
  };

  render() {
    const { time, usuario, carregamentoInicio } = this.state;
    if (carregamentoInicio === 0) {
      this.carregamento();
    }
    return (
      <header data-testid="header-component">
        {
          time ? <h1>Carregando...</h1>
            : (
              <div>
                <h1 data-testid="header-user-name">{ usuario }</h1>
                <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
                <NavLink to="/favorites" data-testid="link-to-favorites">
                  Favorites
                </NavLink>
                <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
