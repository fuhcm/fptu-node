const axios = require("axios");

const verifyGoogleOAuth = async token => {
  const googleURL = "https://www.googleapis.com/userinfo/v2/me";
  const { id, email, name, picture } = await axios.get(googleURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
  });

  return { id, email, name, picture };
};

module.exports = verifyGoogleOAuth;
