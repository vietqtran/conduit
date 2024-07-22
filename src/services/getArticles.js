import axios from "axios";
import errorHandler from "../helpers/errorHandler";

// prettier-ignore
async function getArticles({
  headers,
  limit = 3,
  location,
  page = 0,
  tagName,
  username,
})
{
  if (!headers)
  {
    throw new Error("headers is required");
  }

  if (!location)
  {
    throw new Error("location is required");
  }

  if (location !== "favorites" && location !== "feed" && location !== "global" && location !== "profile" && location !== "tag")
  {
    throw new Error("Invalid location. Supported values are 'favorites', 'feed', 'global', 'profile', 'tag'");
  }

  if (location === "favorites" && !username)
  {
    throw new Error("username is required for 'favorites' location");
  }

  if (location === "profile" && !username)
  {
    throw new Error("username is required for 'profile' location");
  }

  if (location === "tag" && !tagName)
  {
    throw new Error("tagName is required for 'tag' location");
  }

  try
  {
    const url = {
      favorites: `https://api.realworld.io/api/articles?favorited=${username}&&limit=${limit}&&offset=${page}`,
      feed: `https://api.realworld.io/api/articles/feed?limit=${limit}&&offset=${page}`,
      global: `https://api.realworld.io/api/articles?limit=${limit}&&offset=${page}`,
      profile: `https://api.realworld.io/api/articles?author=${username}&&limit=${limit}&&offset=${page}`,
      tag: `https://api.realworld.io/api/articles?tag=${tagName}&&limit=${limit}&&offset=${page}`,
    };

    const { data } = await axios({ url: url[ location ], headers });

    return data;
  } catch (error)
  {
    errorHandler(error);
  }
}

export default getArticles;

