import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  /* return <div>Signin</div>; */
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title-enter">Entrar</h1>
        <input
          className="login__input-email"
          id="email"
          required
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="login__input-password"
          id="password"
          required
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Senha"
        />
        <button className="login__button-link">Entrar</button>

        <div type="submit" className="login__link-register">
          Ainda não é membro?
          <Link to="/signup" className="login__register-link">
            &nbsp;&nbsp;Inscreva-se aqui
          </Link>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = { handleRegistration: PropTypes.func };

export default Login;
