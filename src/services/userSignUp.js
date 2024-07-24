import axios from "axios";

async function userSignUp({ username, email, password })
{
  try
  {
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
    
    throw error;
  }
}

export default userSignUp;

