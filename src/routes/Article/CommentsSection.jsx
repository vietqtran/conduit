import { useState, useCallback } from "react";
import CommentList from "../../components/CommentList/CommentList";
import CommentEditor from '../../components/CommentEditor'

function CommentsSection() {
  const [comments, setComments] = useState([]);

  const handleUpdateComments = useCallback((newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  }, []);

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentEditor updateComments={handleUpdateComments} />
        <CommentList comments={comments} setComments={setComments} />
      </div>
    </div>
  );
}

export default CommentsSection