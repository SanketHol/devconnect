import { useFollow } from "../../hooks/useFollow";

function FollowButton({ profile }) {
  if (!profile) return null;

  const {
    followMutation,
    unfollowMutation,
  } = useFollow();

  const loading =
    followMutation.isPending ||
    unfollowMutation.isPending;

  const toggleFollow = () => {
    if (profile.is_following) {
      unfollowMutation.mutate(profile.id);
    } else {
      followMutation.mutate(profile.id);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`px-6 py-3 rounded-xl font-semibold transition ${
        profile.is_following
          ? "bg-slate-700 hover:bg-red-500"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      {loading
        ? "Please wait..."
        : profile.is_following
        ? "Following ✓"
        : "Follow"}
    </button>
  );
}

export default FollowButton;