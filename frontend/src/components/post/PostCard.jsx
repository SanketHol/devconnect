import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";

import CommentInput from "../comments/CommentInput";
import CommentList from "../comments/CommentList";

import { useLike } from "../../hooks/useLike";

function PostCard({ post }) {
  const likeMutation = useLike();

  const [showComments, setShowComments] = useState(false);

  // Supports both Feed API and Profile API
  const ownerName = post.owner_name || post.user?.full_name || "Unknown User";
  const avatarLetter = ownerName.charAt(0).toUpperCase();

  const likesCount = post.likes_count ?? 0;
  const commentsCount =
    post.comments_count ?? post.comments?.length ?? 0;
  const isLiked = post.is_liked ?? false;

  return (
    <article
      className="
      bg-slate-900/90
      backdrop-blur
      border
      border-slate-800
      rounded-3xl
      overflow-hidden
      shadow-xl
      transition-all
      duration-300
      hover:border-cyan-500/40
      hover:shadow-cyan-500/10
      "
    >
      {/* HEADER */}

      <div className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg
            shadow-lg
            "
          >
            {avatarLetter}
          </div>

          <div>

            <h3 className="font-semibold text-white tracking-tight">
              {ownerName}
            </h3>

            <p className="text-xs text-slate-400 mt-0.5">
              {new Date(post.created_at).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

      {/* CAPTION */}

      <div className="px-6 pb-5">

        <p
          className="
          text-slate-200
          whitespace-pre-wrap
          leading-7
          "
        >
          {post.caption}
        </p>

      </div>

      {/* IMAGE */}

      {post.image_url && (

        <div className="overflow-hidden">

          <img
            src={post.image_url}
            alt=""
            className="
            w-full
            max-h-[550px]
            object-cover
            transition-transform
            duration-500
            hover:scale-[1.03]
            "
          />

        </div>

      )}

      {/* ACTION BAR */}

      <div
        className="
        flex
        items-center
        justify-between
        px-6
        py-4
        border-t
        border-slate-800
        "
      >
        <div className="flex items-center gap-6">

          <button
            disabled={likeMutation.isPending}
            onClick={() => likeMutation.mutate(post.id)}
            className="
            flex
            items-center
            gap-2
            text-slate-300
            hover:text-red-400
            transition
            "
          >
            <Heart
              size={21}
              className={`transition ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : ""
              }`}
            />

            <span className="text-sm font-medium">
              {likesCount}
            </span>

          </button>

          <button
            onClick={() =>
              setShowComments(!showComments)
            }
            className="
            flex
            items-center
            gap-2
            text-slate-300
            hover:text-cyan-400
            transition
            "
          >
            <MessageCircle size={21} />

            <span className="text-sm font-medium">
              {commentsCount}
            </span>

          </button>

        </div>

        <div className="flex items-center gap-4">

          <button
            className="
            text-slate-400
            hover:text-white
            transition
            "
          >
            <Bookmark size={20} />
          </button>

          <button
            className="
            text-slate-400
            hover:text-white
            transition
            "
          >
            <Share2 size={20} />
          </button>

        </div>

      </div>

      {/* COMMENTS */}

      {showComments && (

        <div
          className="
          px-6
          pb-6
          border-t
          border-slate-800
          "
        >
          <CommentInput postId={post.id} />

          <CommentList postId={post.id} />

        </div>

      )}

    </article>
  );
}

export default PostCard;