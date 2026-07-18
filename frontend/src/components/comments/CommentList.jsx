import { useComments } from "../../hooks/useComments";
import CommentCard from "./CommentCard";

function CommentList({ postId }) {

    const { data, isLoading } = useComments(postId);

    if (isLoading)
        return <p className="mt-3 text-slate-400">Loading...</p>;

    if (!data?.length)
        return <p className="mt-3 text-slate-500">No comments yet.</p>;

    return (

        <div className="mt-4">

            {data.map(comment => (

                <CommentCard

                    key={comment.id}

                    comment={comment}

                />

            ))}

        </div>

    );

}

export default CommentList;