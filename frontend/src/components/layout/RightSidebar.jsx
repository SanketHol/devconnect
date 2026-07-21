function RightSidebar() {
  return (
    <aside
      className="
      hidden
      xl:block
      w-80
      sticky
      top-16
      h-[calc(100vh-64px)]
      border-l
      border-slate-800
      px-6
      py-8
      "
    >
      {/* Trending */}

      <div
        className="
        bg-slate-900
        rounded-2xl
        border
        border-slate-800
        p-5
        "
      >
        <h2 className="text-lg font-semibold mb-5">
          🔥 Trending
        </h2>

        <div className="space-y-4">

          <div>
            <p className="font-medium">
              #ReactJS
            </p>

            <p className="text-sm text-slate-500">
              1.8K posts
            </p>
          </div>

          <div>
            <p className="font-medium">
              #MachineLearning
            </p>

            <p className="text-sm text-slate-500">
              920 posts
            </p>
          </div>

          <div>
            <p className="font-medium">
              #WebDevelopment
            </p>

            <p className="text-sm text-slate-500">
              700 posts
            </p>
          </div>

        </div>

      </div>

      {/* Suggestions */}

      <div
        className="
        mt-6
        bg-slate-900
        rounded-2xl
        border
        border-slate-800
        p-5
        "
      >
        <h2 className="text-lg font-semibold mb-5">
          👥 Suggested Developers
        </h2>

        <div className="space-y-5">

          {["Alex", "Sarah", "John"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">

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
                  font-semibold
                  "
                >
                  {name.charAt(0)}
                </div>

                <div>

                  <p className="font-medium">
                    {name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Developer
                  </p>

                </div>

              </div>

              <button
                className="
                text-sm
                bg-cyan-500
                px-3
                py-1.5
                rounded-lg
                hover:bg-cyan-600
                transition
                "
              >
                Follow
              </button>

            </div>
          ))}

        </div>

      </div>

    </aside>
  );
}

export default RightSidebar;