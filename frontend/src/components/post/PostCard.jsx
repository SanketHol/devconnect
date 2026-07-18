import {
  Heart,
  MessageCircle,
} from "lucide-react";

import CommentInput from "../comments/CommentInput";
import CommentList from "../comments/CommentList";

import { useLike } from "../../hooks/useLike";

function PostCard({ post }) {
  const likeMutation = useLike();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      <div className="p-5">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
            {post.owner_name.charAt(0)}
          </div>

          <div>

            <h3 className="font-semibold">
              {post.owner_name}
            </h3>

            <p className="text-sm text-slate-400">
              {new Date(post.created_at).toLocaleString()}
            </p>

          </div>

        </div>

        <p className="mb-4 whitespace-pre-wrap">
          {post.caption}
        </p>

      </div>

      {post.image_url && (
        <img
          src={post.image_url}
          alt=""
          className="w-full max-h-[500px] object-cover"
        />
      )}

      <div className="flex justify-around border-t border-slate-800 py-3">

        <button
          onClick={() => likeMutation.mutate(post.id)}
          disabled={likeMutation.isPending}
          className="
            flex
            items-center
            gap-2
            transition
            hover:text-red-400
          "
        >
          <Heart
            size={20}
            className={`transition ${
              post.is_liked
                ? "fill-red-500 text-red-500"
                : "text-slate-300"
            }`}
          />

          <span>{post.likes_count}</span>

        </button>

        <button
          className="
            flex
            items-center
            gap-2
            hover:text-cyan-400
            transition
          "
        >
          <MessageCircle size={20} />

          <span>{post.comments_count}</span>

        </button>

        <div className="px-5 pb-5">

            <CommentInput postId={post.id} />

            <CommentList postId={post.id} />

        </div>

      </div>

    </div>
  );
}

export default PostCard;