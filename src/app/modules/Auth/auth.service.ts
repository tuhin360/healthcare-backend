import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { UserStatus } from "../../../generated/prisma";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) throw new Error("Invalid password");

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
    console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken,

    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) throw new Error("Password Incorrect!");

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_password_token_secret as Secret,
    config.jwt.reset_password_token_expire_in as string
  );
  console.log(resetPasswordToken, "resetPasswordToken");

  const resetPasswordLink =
    config.reset_password_link +
    `?userId=${userData.id}&token=${resetPasswordToken}`;

  console.log(resetPasswordLink);
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
