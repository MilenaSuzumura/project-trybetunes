import React from 'react';
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
            : <h1>Header</h1>
        }
      </header>
    );
  }
}

export default Header;
