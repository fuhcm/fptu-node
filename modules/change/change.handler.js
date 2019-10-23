const db = require("configs/mongodb").getDB();
const errorHandler = require("utils/handlers/error.handler");
const verifyGoogleOAuth = require("modules/authen/google.oauth");

const { createdTimestamp } = require("utils/parsers/timestamp");

const signHandler = async (req, res) => {
  const { token } = req.body;
  const { email } = await verifyGoogleOAuth(token);

  const changeCollection = db.collection("changes");
  const posted = await changeCollection.findOne({ email });

  const success = async email => {
    const newSign = {
      email,
      ...createdTimestamp()
    };

    await changeCollection.insertOne(newSign);
    res.send({ message: "Successfully", email });
  };

  const fail = () => res.status(400).send({ message: "Invalid" });

  !posted && email.includes("@fpt.edu.vn") ? success(email) : fail();
};

const getAllSign = async (_, res) => {
  const changeCollection = db.collection("changes");
  const allSigns = await changeCollection
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  const count = await changeCollection.find().count();

  res.send({ list: allSigns, count });
};

module.exports = errorHandler({
  signHandler,
  getAllSign
});
