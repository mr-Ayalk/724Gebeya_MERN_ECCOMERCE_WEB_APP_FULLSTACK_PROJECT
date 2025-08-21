import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const generatedRefreshToken = async (userId) => {
  const token = await jwt.sign(
    {
      id: userId,
    },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "30d" }
  );

  const updatedRefereshTokenUser = await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      refresh_token: token,
    }
  );
  return token;
};
export default generatedRefreshToken;
