import {
  House,
  User,
  Search,
  Flame,
  Bookmark,
  Users,
  Bell,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const menuItems = [
  {
    title: "Home",
    icon: House,
    path: "/",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Explore",
    icon: Search,
    path: "/search",
  },
  {
    title: "Trending",
    icon: Flame,
    path: "/trending",
  },
  {
    title: "Saved",
    icon: Bookmark,
    path: "/saved",
  },
  {
    title: "People",
    icon: Users,
    path: "/suggestions",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
    const { data: user, isLoading } = useCurrentUser();
  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 min-h-[calc(100vh-64px)] border-r border-slate-800 p-6">

      <div>

        <h2 className="text-lg font-semibold mb-8 text-slate-300">
          Navigation
        </h2>

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-cyan-500 text-white"
                      : "hover:bg-slate-900 text-slate-300 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.title}</span>

              </NavLink>
            );
          })}

        </nav>

      </div>

      <div className="border-t border-slate-800 pt-5">

  {isLoading ? (

    <p className="text-slate-500">
      Loading...
    </p>

  ) : (

    <div className="flex items-center gap-3">

      <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-lg">

        {user?.full_name?.charAt(0)}

      </div>

      <div>

        <h3 className="font-semibold">
          {user?.full_name}
        </h3>

        <p className="text-sm text-slate-400">
          {user?.email}
        </p>

      </div>

    </div>

  )}

</div>

    </aside>
  );
}

export default Sidebar;