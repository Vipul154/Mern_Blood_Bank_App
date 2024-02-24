const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed due to token mismatch",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: true,
      message: "Auth Failed..",
    });
  }
};
//Till our route does not get token and the token does not not successfully verify, it will show us the error.
