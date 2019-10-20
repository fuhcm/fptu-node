const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");
const verifyGoogleOAuth = require("modules/authen/google.oauth");
const { createJWT } = require("utils/jwt/jwt");

const googleLoginHandler = async (req, res) => {
  const { token } = req.body;
  const { email } = await verifyGoogleOAuth(token);

  const userCollection = db.collection("users");
  const user = userCollection.findOne({ email });

  const success = ({ email, nickname }) =>
    res.send({ token: createJWT({ email, nickname }, null) });

  const fail = () =>
    res.status(400).send({ message: "Invalid authentication token" });

  user ? success(user) : fail();
};

module.exports = errorHandler({
  googleLoginHandler
});
