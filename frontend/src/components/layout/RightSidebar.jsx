import { Flame, Users } from "lucide-react";

function RightSidebar() {
    return (
        <aside className="w-72 min-h-[calc(100vh-64px)] border-l border-slate-800 p-5">

            <div className="mb-8">

                <div className="flex items-center gap-2 mb-4">
                    <Flame className="text-orange-500" />
                    <h2 className="font-bold text-lg">
                        Trending
                    </h2>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                    Trending Posts
                </div>

            </div>

            <div>

                <div className="flex items-center gap-2 mb-4">
                    <Users className="text-cyan-400" />
                    <h2 className="font-bold text-lg">
                        Suggested Users
                    </h2>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                    Suggestions
                </div>

            </div>

        </aside>
    );
}

export default RightSidebar;