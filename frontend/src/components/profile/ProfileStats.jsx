function ProfileStats({ profile }) {
  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-8
      "
    >
      <div className="grid grid-cols-3 text-center">

        <div>
          <h2 className="text-3xl font-bold">
            {profile?.posts_count ?? 0}
          </h2>

          <p className="text-slate-500 mt-2">
            Posts
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            {profile?.followers_count ?? 0}
          </h2>

          <p className="text-slate-500 mt-2">
            Followers
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            {profile?.following_count ?? 0}
          </h2>

          <p className="text-slate-500 mt-2">
            Following
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProfileStats;