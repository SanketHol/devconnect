import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  LogOut,
  Home,
  Plus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

function Navbar() {
  const { logout } = useAuth();

  return (
    <header
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-slate-950/80
      border-b
      border-slate-800
      "
    >
      <div
        className="
        max-w-7xl
        h-16
        mx-auto
        flex
        items-center
        justify-between
        px-6
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Logo />

          <span className="font-bold text-xl tracking-tight">
            DevConnect
          </span>
        </Link>

        {/* Search */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-3
          w-[430px]
          px-4
          py-2.5
          rounded-2xl
          bg-slate-900
          border
          border-slate-800
          "
        >
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            placeholder="Search developers..."
            className="
            flex-1
            bg-transparent
            outline-none
            placeholder:text-slate-500
            "
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <NavLink
            to="/"
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            flex
            items-center
            justify-center
            hover:bg-cyan-500
            transition
            "
          >
            <Home size={20} />
          </NavLink>

          <button
            className="
            relative
            w-11
            h-11
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            flex
            items-center
            justify-center
            hover:bg-cyan-500
            transition
            "
          >
            <Bell size={20} />

            <span
              className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-red-500
              "
            />
          </button>

          <NavLink
            to="/profile"
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            flex
            items-center
            justify-center
            hover:bg-cyan-500
            transition
            "
          >
            <User size={20} />
          </NavLink>

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-cyan-500
            flex
            items-center
            justify-center
            hover:bg-cyan-600
            transition
            "
            title="Create Post"
          >
            <Plus size={22} />
          </button>

          <button
            onClick={logout}
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            flex
            items-center
            justify-center
            hover:bg-red-500
            transition
            "
          >
            <LogOut size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;