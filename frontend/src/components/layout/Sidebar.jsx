import {
  House,
  User,
  Search,
  Flame,
  Bookmark,
  Users,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuth } from "../../context/AuthContext";

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
  const { logout } = useAuth();

  return (
    <aside
      className="
      hidden
      lg:flex
      flex-col
      justify-between
      w-72
      sticky
      top-16
      h-[calc(100vh-64px)]
      border-r
      border-slate-800
      px-6
      py-8
      bg-slate-950/70
      backdrop-blur
      "
    >
      <div>
        {/* USER */}

        <div
          className="
          mb-8
          rounded-2xl
          bg-slate-900
          border
          border-slate-800
          p-4
          "
        >
          {isLoading ? (
            <p className="text-slate-500">
              Loading...
            </p>
          ) : (
            <div className="flex items-center gap-4">

              <div
                className="
                w-14
                h-14
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                flex
                items-center
                justify-center
                font-bold
                text-xl
                shadow-lg
                "
              >
                {user?.full_name?.charAt(0)}
              </div>

              <div>

                <h2 className="font-semibold">
                  {user?.full_name}
                </h2>

                <p className="text-sm text-slate-400 truncate w-36">
                  {user?.email}
                </p>

              </div>

            </div>
          )}
        </div>

        {/* MENU */}

        <nav className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        text-red-400
        hover:bg-red-500/10
        transition
        "
      >
        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;