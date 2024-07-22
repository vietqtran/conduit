import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function userSignUp({ username, email, password })
{
  try
  {
    if (!username || !email || !password)
    {
      throw new Error("Missing required fields");
    }

    const { data } = await axios.post(
      "https://api.realworld.io/api/users",
      { user: { username, email, password } }
    );

    if (!data || !data.user)
    {
      throw new Error("Invalid response data");
    }

    const { user } = data;
    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}

export default userSignUp;

