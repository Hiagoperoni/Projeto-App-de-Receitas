import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import rockGlass from '../images/rockGlass.svg';

function Login(props) {
  const { handleInpuEmail,
    handleInputPassword, isDisable, saveEmail } = useContext(AppContext);
  const { history } = props;

  const submit = () => {
    saveEmail();
    history.push('/meals');
  };

  return (
    <div className="loginPage">
      <p className="logo">App de Receitas</p>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form className="formLogin">
        <input
          type="email"
          placeholder="Digite seu E-mail"
          data-testid="email-input"
          onChange={ handleInpuEmail }
          className="formInput"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua Senha"
          onChange={ handleInputPassword }
          className="formInput"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          className="buttonForm"
          disabled={ isDisable }
          onClick={ submit }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
