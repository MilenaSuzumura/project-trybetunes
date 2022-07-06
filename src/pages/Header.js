import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      time: false,
    };
  }

  carregamento = async () => {
    const pessoaUsuaria = await getUser();
    console.log(pessoaUsuaria);
    this.setState({
      time: true,
    });
    setTimeout(() => {
      this.setState({
        time: false,
        usuario: pessoaUsuaria,
      });
    }, pessoaUsuaria !== undefined);
  };

  render() {
    const { time, usuario } = this.state;
    return (
      <header data-testid="header-component">
        <h1>{ usuario }</h1>
        {
          time ? <h1>Carregando...</h1>
            : (
              <div>
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
