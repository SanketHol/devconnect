import {
    House,
    User,
    Search,
    Bookmark,
    Bell,
} from "lucide-react";

function Sidebar() {
    return (
        <aside className="w-64 min-h-[calc(100vh-64px)] border-r border-slate-800 p-5">

            <ul className="space-y-2">

                <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition">
                    <House size={22} />
                    <span>Home</span>
                </li>

                <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition">
                    <User size={22} />
                    <span>Profile</span>
                </li>

                <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition">
                    <Search size={22} />
                    <span>Search</span>
                </li>

                <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition">
                    <Bookmark size={22} />
                    <span>Saved</span>
                </li>

                <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition">
                    <Bell size={22} />
                    <span>Notifications</span>
                </li>

            </ul>

        </aside>
    );
}

export default Sidebar;