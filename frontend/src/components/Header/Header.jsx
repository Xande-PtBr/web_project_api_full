import { useContext } from "react";
import { useState } from "react";
import logo_around from "../../images/logo_around.png";
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import hamburguer from "../../images/hamburguerMenu.png";
import closeHamburguer from "../../images/closeHamburguer.png";

const signOut = () => {
  removeToken();
  setIsLoggedIn(false);
};

/* function ShowHideContent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={(hamburguer) => setIsVisible(!isVisible)}>
        {isVisible ? "Hide content" : "Show content"}
      </button>
      {isVisible && (
        <div>
          <p>This is the content to show/hide.</p>
        </div>
      )}
    </div>
  );
} */

function Header(/* { isLoggedIn } */) {
  const location = useLocation();

  const from = location.state?.from || "/";
  let currentPage;

  if (location.pathname === "/signup") {
    currentPage = "signup";
  } else if (location.pathname === "/signin") {
    currentPage = "signin";
  } else if (location.pathname === "/") {
    currentPage = "/";
  }

  const { currentUser } = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 720);
  const menuHamburguerClosed = hamburguer;
  const menuHamburguerOpen = closeHamburguer;
  const isHomePage = currentPage === "/";

  return (
    <>
      <header
        className={`header ${
          !isHomePage ? "header__remove-colum-reverse" : ""
        }`}
      >
        <div className="header__button-menu">
          <img className="header__logo" src={logo_around} alt="Logo Around" />
          {currentPage !== "signin" && currentPage !== "signup" && (
            <img
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="header__button-hamburguer-menu"
              src={isMenuOpen ? menuHamburguerOpen : menuHamburguerClosed}
              alt="menu hamburguer"
            />
          )}
        </div>

        {currentPage === "signin" && (
          <Link className="header__button-subscribe" to="/signup">
            Inscrever-se
          </Link>
        )}

        {currentPage === "signup" && (
          <Link className="header__button-enter" to="/signin">
            Entrar
          </Link>
        )}

        {currentPage === "/" && isMenuOpen && (
          <div className="header__button-user-Logged">{currentUser.email}</div>
        )}
        {currentPage === "/" && isMenuOpen && (
          <Link className="header__button-exit" to="/signin" onClick={signOut}>
            Sair
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
