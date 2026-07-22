import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Home,
  Plus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import SearchBar from "../search/SearchBar";

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

        <div className="hidden lg:block">
          <SearchBar />
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