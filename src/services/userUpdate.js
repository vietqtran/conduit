import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function userUpdate({ headers, bio, email, image, password, username })
{
  if (!headers || !bio || !email || !image || !password || !username)
  {
    throw new Error("Missing required fields");
  }

  try
  {
    const { data } = await axios({
      data: { user: { bio, email, image, password, username } },
      headers,
      method: "PUT",
      url: "https://api.realworld.io/api/user",
    });

    const { user } = data;

    if (!user)
    {
      throw new Error("Invalid response data");
    }

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}

export default userUpdate;

