import axios from "axios";

async function postComment({ body, headers, slug }) {
  try {
    const { data } = await axios({
      data: { comment: { body } },
      headers,
      method: "POST",
      url: `https://api.realworld.io/api/articles/${slug}/comments`,
    });

    return data.comment;
  } catch (error) {
    errorHandler(error);
  }
}

export default postComment;

