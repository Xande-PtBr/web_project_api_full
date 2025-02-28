import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Login from "../components/Main/components/Login/Login";
import Register from "../components/Main/components/Register/Register";
import Main from "./Main/Main";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/Main/components/ProtectedRoute/ProtectedRoute";
/* import { getUserAuth } from "../utils/api"; */
import { getToken, setToken } from "../utils/token";
import InfoTooltip from "../components/Main/components/InfoTooltip/InfoTooltip";
import Popup from "../components/Main/components/Popup/Popup";
import signupSucess from "../images/signupSucess.png";
import signupFailed from "../images/signupFailed.png";

function App() {
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth.getUserAuth(jwt).then((response) => {
      const email = { email: response.data.email };
      setCurrentUser((prevData) => ({ ...prevData, ...email }));
      setIsLoggedIn(true);
      navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    api.getInitialCards().then((apiCards) => setCards(apiCards));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser((prevData) => ({ ...prevData, ...response }));
      })
      .catch((error) => {
        console.error("Erro ao obter informações do usuário:", error);
      });
  }, []);

  async function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
    // Verificar mais uma vez se esse cartão já foi curtido
  }

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;
    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleUpdateUser(data) {
    await api.setUserInfo(data).then((newData) => {
      setCurrentUser(newData);
    });
    handleClosePopup();
  }

  async function handleUpdateAvatar(avatar) {
    await api.profilePictureUpdate(avatar).then((newData) => {
      setCurrentUser(newData);
    });
    handleClosePopup();
  }

  const handleAddPlaceSubmit = async (newCard) => {
    await api.addNewCard(newCard.name, newCard.link).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    handleClosePopup();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleRegistration = ({ email, password }) => {
    auth
      .register({ email, password })
      .then(() => {
        const infoTooltip = {
          children: (
            <InfoTooltip
              icon={signupSucess}
              message="Você registrou e agora precisa fazer login!"
            />
          ),
        };

        handleOpenPopup(infoTooltip);
        navigate("/signin");
        /*        const redirectPath = location.state?.from?.pathname || "/signin";
        navigate(redirectPath); // Mande o usuário para /main */
      })
      .catch((err) => {
        const infoTooltip = {
          children: (
            <InfoTooltip
              icon={signupFailed}
              message="Ops, algo saiu deu errado! Por favor, tente novamente."
            />
          ),
        };

        handleOpenPopup(infoTooltip);
      });
  };

  const handleLogin = ({ email, password }) => {
    // Se o email do usuário ou a senha estiverem vazios, retorne sem enviar uma solicitação.
    if (!email || !password) {
      return;
    }
    // Passamos o email do usuário e a senha como argumentos posicionais. A
    // função authorize é configurada para renomear `email` para `identifier`
    // antes de enviar uma solicitação ao servidor, pois é isso que a
    // API espera.
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setCurrentUser((prevData) => ({ ...prevData, email }));
          setIsLoggedIn(true); // Permita o login do usuário
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath); // Mande o usuário para /main
        }
      })
      .catch((err) => {
        let message = "Ops, algo saiu deu errado! Por favor, tente novamente.";
        if (err === "Error: 400") {
          message = "Um ou mais campos não foram fornecidos";
        }

        if (err === "Error: 401") {
          message = "Usuário com o e-mail especificado não encontrado";
        }

        const infoTooltip = {
          children: <InfoTooltip icon={signupFailed} message={message} />,
        };

        handleOpenPopup(infoTooltip);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        setIsLoggedIn,
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
        isLoggedIn,
      }}
    >
      <div className="page">
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            }
          />
          {
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    handleCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                  />
                </ProtectedRoute>
              }
            />
          }
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
