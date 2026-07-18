import { Link } from "react-router-dom";
import {
  House,
  Search,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Logo />
        </Link>

        {/* Search */}

        <div className="hidden md:flex items-center w-[420px] bg-slate-900 border border-slate-800 rounded-xl px-4">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search developers..."
            className="w-full bg-transparent py-3 px-3 outline-none text-white placeholder:text-slate-500"
          />

        </div>

        {/* Right Icons */}

        <div className="flex items-center gap-5">

          <Link to="/">
            <House
              size={22}
              className="hover:text-cyan-400 transition"
            />
          </Link>

          <button>
            <Bell
              size={22}
              className="hover:text-cyan-400 transition"
            />
          </button>

          <Link to="/profile">
            <User
              size={22}
              className="hover:text-cyan-400 transition"
            />
          </Link>

          <button
            onClick={logout}
          >
            <LogOut
              size={22}
              className="hover:text-red-500 transition"
            />
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;