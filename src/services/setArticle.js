import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function setArticle({ body, description, headers, slug, tagList, title })
{
  if (!body || !description || !headers || !title)
  {
    throw new Error('Missing required parameters: body, description, headers, and title are required');
  }

  try
  {
    const { data } = await axios({
      data: { article: { title, description, body, tagList } },
      headers,
      method: slug ? "PUT" : "POST",
      url: slug ? `https://api.realworld.io/api/articles/${slug}` : "https://api.realworld.io/api/articles",
    });

    if (!data || !data.article || !data.article.slug)
    {
      throw new Error('Invalid response data: article or article.slug is missing');
    }

    return data.article.slug;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
}

export default setArticle;

