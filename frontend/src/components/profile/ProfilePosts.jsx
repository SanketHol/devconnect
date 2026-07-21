import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUserPosts } from "../../hooks/useUserPosts";

import PostCard from "../post/PostCard";

function ProfilePosts() {
  const { data: user } = useCurrentUser();

  const { data: posts, isLoading } = useUserPosts(user?.id);

  if (isLoading)
    return (
      <div className="text-center py-10 text-slate-400">
        Loading posts...
      </div>
    );

  if (!posts?.length)
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          My Posts
        </h2>

        <p className="text-slate-500">
          You haven't posted anything yet.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        My Posts
      </h2>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

    </div>
  );
}

export default ProfilePosts;