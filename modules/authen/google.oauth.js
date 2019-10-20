const axios = require("axios");

const verifyGoogleOAuth = async token => {
  const googleURL = "https://www.googleapis.com/userinfo/v2/me";
  const { data } = await axios.get(googleURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
  });

  return data;
};

module.exports = verifyGoogleOAuth;
