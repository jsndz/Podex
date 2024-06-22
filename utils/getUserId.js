import User from "@models/user";
import { connectToDB } from "./database";

export const getUserId = async (eMail) => {
  await connectToDB();

  try {
    const user = await User.findOne({ email: eMail });
    if (user) {
      return user._id;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};
