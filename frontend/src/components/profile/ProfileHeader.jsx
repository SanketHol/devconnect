function ProfileHeader({ profile }) {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">

      {/* Cover */}

      <div className="h-56 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />

      <div className="px-10 pb-8">

        <div className="-mt-16 flex items-end justify-between">

          <div className="flex items-end gap-6">

            <div
              className="
              w-32
              h-32
              rounded-full
              bg-slate-950
              border-4
              border-slate-900
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              "
            >
              {profile?.full_name?.charAt(0)}
            </div>

            <div className="pb-3">

              <h1 className="text-3xl font-bold">
                {profile?.full_name}
              </h1>

              <p className="text-slate-400 mt-1">
                AI Engineer • DevConnect
              </p>

              <p className="text-slate-500 text-sm mt-2">
                {profile?.email}
              </p>

            </div>

          </div>

          <button
            className="
            px-6
            py-3
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            font-semibold
            transition
            "
          >
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;