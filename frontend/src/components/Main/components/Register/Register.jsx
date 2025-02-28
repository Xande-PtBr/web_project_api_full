import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const Register = ({ handleRegistration }) => {
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
    handleRegistration(data);
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title-enter">Inscrever-se</h1>
        <input
          className="register__input-email"
          id="email"
          required
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="register__input-password"
          id="password"
          required
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Senha"
        />
        <button className="register__button-link">Inscrever-se</button>

        <div type="submit" className="register__link-login">
          Já é um membro?
          <Link to="/signin" className="register__register-link">
            &nbsp;&nbsp;Faça o login aqui!
          </Link>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = { handleRegistration: PropTypes.func };

export default Register;
