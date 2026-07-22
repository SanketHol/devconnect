import { Link } from "react-router-dom";

function SearchItem({ user, onClose }) {
  return (
    <Link
      to={`/profile/${user.id}`}
      onClick={onClose}
      className="
      flex
      items-center
      gap-3
      px-4
      py-3
      hover:bg-slate-800
      transition
      "
    >
      <div
        className="
        w-11
        h-11
        rounded-full
        bg-gradient-to-br
        from-cyan-400
        to-blue-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        "
      >
        {user.full_name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">

        <h4 className="font-semibold">
          {user.full_name}
        </h4>

        <p className="text-sm text-slate-400">
          {user.email}
        </p>

      </div>
    </Link>
  );
}

export default SearchItem;