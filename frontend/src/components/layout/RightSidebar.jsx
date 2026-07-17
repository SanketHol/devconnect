function RightSidebar() {
    return (
        <aside className="w-72 min-h-[calc(100vh-64px)] border-l border-slate-800 p-5">

            <h2 className="font-bold mb-4">

                Trending

            </h2>

            <div className="space-y-3">

                <div className="bg-slate-800 rounded-lg p-3">

                    Trending Post

                </div>

                <div className="bg-slate-800 rounded-lg p-3">

                    Suggested User

                </div>

            </div>

        </aside>
    );
}

export default RightSidebar;