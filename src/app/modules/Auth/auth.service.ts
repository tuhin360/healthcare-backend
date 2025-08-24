import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  // console.log("user logged in", payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if(!isCorrectPassword) throw new Error("Invalid password");

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );
 
//   console.log(accessToken);

const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,

  };
};

export const AuthServices = {
  loginUser,
};
