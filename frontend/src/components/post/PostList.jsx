import { usePosts } from "../../hooks/usePosts";
import PostCard from "./PostCard";

function PostList() {

  const {
    data: posts,
    isLoading,
    isError,
  } = usePosts();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-slate-400">
        Loading feed...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load feed.
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        No posts yet.
        <br />
        Be the first to share something 🚀
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}

export default PostList;