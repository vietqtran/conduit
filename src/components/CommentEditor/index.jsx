import { Link, useParams } from "react-router-dom";

import Avatar from "../Avatar";
import postComment from "../../services/postComment";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function CommentEditor({ updateComments })
{
  const [ { body }, setForm ] = useState({ body: "" });
  const { headers, isAuth, loggedUser } = useAuth();
  const { username, image } = loggedUser || {};
  const { slug } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (body.trim() === "") return;
  
    postComment({ body, headers, slug })
      .then(newComment => {
        updateComments(newComment);
        setForm({ body: "" });
      })
      .catch(console.error);
  };

  const handleChange = (e) =>
  {
    setForm({ body: e.target.value });
  };

  return isAuth ? (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          onChange={handleChange}
          placeholder="Write a comment..."
          rows="3"
          value={body}
        ></textarea>
      </div>

      <div className="card-footer">
        <Avatar alt={username} className="comment-author-img" src={image} />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  ) : (
    <span>
      <Link to="/login">Sign in</Link> or <Link to="/register">Sign up</Link> to
      add comments on this article.
    </span>
  );
}

export default CommentEditor;
