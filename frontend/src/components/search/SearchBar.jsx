import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { useSearchUsers } from "../../hooks/useSearchUsers";
import SearchDropdown from "./SearchDropdown";

function SearchBar() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(text);
    }, 400);

    return () => clearTimeout(timer);
  }, [text]);

  const { data = [], isLoading } =
    useSearchUsers(query);

  return (
    <div className="relative w-[420px]">

      <div
        className="
        flex
        items-center
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        px-4
        "
      >
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Search developers..."
          className="
          w-full
          bg-transparent
          py-3
          px-3
          outline-none
          text-white
          placeholder:text-slate-500
          "
        />
      </div>

      <SearchDropdown
        visible={text.length >= 2}
        users={data}
        loading={isLoading}
        onClose={() => setText("")}
      />
    </div>
  );
}

export default SearchBar;