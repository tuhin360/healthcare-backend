import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const expirationTime = parseInt(expiresIn); // convert expiresIn to a numeric value
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expirationTime, // pass the numeric value
  });

  return token;
};

export const jwtHelpers = {
  generateToken,
};