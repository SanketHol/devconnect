function Sidebar() {
    return (
        <aside className="w-64 min-h-[calc(100vh-64px)] border-r border-slate-800 p-5">

            <ul className="space-y-4">

                <li>🏠 Home</li>

                <li>👤 Profile</li>

                <li>🔍 Search</li>

                <li>❤️ Saved</li>

                <li>🔔 Notifications</li>

            </ul>

        </aside>
    );
}

export default Sidebar;