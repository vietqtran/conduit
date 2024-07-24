import axios from "axios";

async function userLogin({ email, password })
{
  try
  {
    const response = await axios.post("https://api.realworld.io/api/users/login", {
      user: { email, password },
    });

    const { user } = response.data;
    if (!user)
    {
      throw new Error("Failed to login user.");
    }

    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error)
  {
    
  }
}

export default userLogin;

