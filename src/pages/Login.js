import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      disabledButton: true,
      time: false,
    };
  }

  validaBotao = () => {
    const { loginName } = this.state;
    const valorLimite = 3;
    if (loginName.length >= valorLimite) {
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
      loginName: value,
    }, this.validaBotao);
  }

  searchDirecionar = ({ history }) => {
    history.push('/search');
  }

  handleTime = () => {
    const { loginName } = this.state;
    const tempo = 1000;
    createUser({ name: loginName });
    this.setState({
      time: true,
    });
    setTimeout(() => {
      this.setState({
        time: false,
      });
    }, tempo);
    this.searchDirecionar(this.props);
  }

  render() {
    const { disabledButton, loginName, time } = this.state;
    return (
      <main>
        {
          time ? <h1>Carregando...</h1>
            : (
              <form data-testid="page-login">
                <label htmlFor="login-name-input">
                  <input
                    type="text"
                    data-testid="login-name-input"
                    name="loginName"
                    value={ loginName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ disabledButton }
                  onClick={ this.handleTime }
                >
                  Entrar
                </button>
              </form>
            )
        }
      </main>
    );
  }
}

export default Login;
