import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import dateFormatter from "../../helpers/dateFormatter";
import deleteComment from "../../services/deleteComment";
import getComments from "../../services/getComments";
import CommentAuthor from "./CommentAuthor";

function CommentList({ comments, setComments}) {
  const { headers, isAuth, loggedUser } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getComments({ slug })
      .then(fetchedComments => setComments(fetchedComments))
      .catch(console.error);
  }, [slug]);

  const handleDelete = (commentId) => {
    if (!isAuth) navigate('/login')

    const confirmation = window.confirm("Want to delete the comment?");
    if (!confirmation) return;

    deleteComment({ commentId, headers, slug })
      .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(console.error);
  };

  return comments?.length > 0 ? (
    comments.map(({ author, author: { username }, body, createdAt, id }) => {
      return (
        <div className="card" key={id}>
          <div className="card-block">
            <p className="card-text">{body}</p>
          </div>
          <div className="card-footer">
            <CommentAuthor {...author} />
            <span className="date-posted">{dateFormatter(createdAt)}</span>
            {isAuth && loggedUser.username === username && (
              <button
                className="btn btn-sm btn-outline-secondary pull-xs-right"
                onClick={() => handleDelete(id)}
              >
                <i className="ion-trash-a"></i>
              </button>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <div>There are no comments yet...</div>
  );
}

export default CommentList;
