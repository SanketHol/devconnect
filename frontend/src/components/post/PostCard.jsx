import {
  Heart,
  MessageCircle,
} from "lucide-react";

function PostCard({ post }) {
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

        <button className="flex gap-2 hover:text-cyan-400">

          <Heart size={20} />

          {post.likes_count}

        </button>

        <button className="flex gap-2 hover:text-cyan-400">

          <MessageCircle size={20} />

          {post.comments_count}

        </button>

      </div>

    </div>
  );
}

export default PostCard;