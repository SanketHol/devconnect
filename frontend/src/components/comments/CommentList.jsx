import { useComments } from "../../hooks/useComments";
import CommentCard from "./CommentCard";

function CommentList({ postId }) {
  const { data, isLoading } = useComments(postId);

  if (isLoading)
    return (
      <p className="mt-5 text-sm text-slate-500">
        Loading comments...
      </p>
    );

  if (!data?.length)
    return (
      <p className="mt-5 text-sm text-slate-500">
        No comments yet. Be the first!
      </p>
    );

  return (
    <div className="mt-3 border-t border-slate-800 pt-3">

      {data.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}

    </div>
  );
}

export default CommentList;