import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const expirationTime = parseInt(expiresIn); // convert expiresIn to a numeric value
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expirationTime, // pass the numeric value
  });

  return token;
};


const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};