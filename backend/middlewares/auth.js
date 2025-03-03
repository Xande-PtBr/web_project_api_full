const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization, "authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Autorização necessaria" });
  }

  const token = authorization.replace("Bearer ", ""); //extraindo o token

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET); //verificando se o token é valido
    console.log(payload, "payload");
  } catch (err) {
    return res.status(403).json({ message: "Token invalido" });
  }

  req.user = payload; //adicionando o payload do token na requisicao

  next();
};
