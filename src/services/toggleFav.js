import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function toggleFav({ slug, favorited, headers })
{
  if (!slug || !headers)
  {
    throw new Error('Missing required parameters');
  }

  try
  {
    const { data } = await axios({
      headers,
      method: favorited ? "DELETE" : "POST",
      url: `https://api.realworld.io/api/articles/${slug}/favorite`,
    });

    if (!data || !data.article)
    {
      throw new Error('Invalid response data');
    }

    return data.article;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}

export default toggleFav;

