import axios from "axios";
import errorHandler from "../helpers/errorHandler";

const deleteComment = async ({ commentId, headers, slug }) =>
{
  if (!commentId || !headers || !slug)
  {
    throw new Error('Invalid parameters');
  }

  try
  {
    const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${commentId}`, { headers });
    return response.data;
  } catch (error)
  {
    errorHandler(error);
    throw error;
  }
};

export default deleteComment;

