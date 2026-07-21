import { Clock3 } from "lucide-react";

function CommentCard({ comment }) {
  const createdAt = new Date(comment.created_at);

  return (
    <div className="flex gap-3 py-4">

      {/* Avatar */}

      <div
        className="
        w-10
        h-10
        rounded-full
        bg-gradient-to-br
        from-cyan-400
        to-blue-600
        flex
        items-center
        justify-center
        text-white
        font-semibold
        shadow-md
        shrink-0
        "
      >
        {comment.user.full_name.charAt(0).toUpperCase()}
      </div>

      {/* Content */}

      <div className="flex-1">

        <div
          className="
          bg-slate-800/70
          border
          border-slate-700
          rounded-2xl
          px-4
          py-3
          "
        >
          <div className="flex items-center gap-2">

            <h4 className="font-semibold text-white text-sm">
              {comment.user.full_name}
            </h4>

            <div className="flex items-center gap-1 text-slate-500 text-xs">

              <Clock3 size={12} />

              <span>
                {createdAt.toLocaleDateString()}
              </span>

            </div>

          </div>

          <p className="mt-2 text-slate-300 leading-6">
            {comment.text}
          </p>

        </div>

      </div>

    </div>
  );
}

export default CommentCard;