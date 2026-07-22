import SearchItem from "./SearchItem";

function SearchDropdown({
  users,
  loading,
  visible,
  onClose,
}) {
  if (!visible) return null;

  return (
    <div
      className="
      absolute
      top-14
      left-0
      w-full
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      shadow-2xl
      overflow-hidden
      z-50
      "
    >
      {loading && (
        <p className="p-4 text-slate-400">
          Searching...
        </p>
      )}

      {!loading && users.length === 0 && (
        <p className="p-4 text-slate-500">
          No developers found
        </p>
      )}

      {!loading &&
        users.map((user) => (
          <SearchItem
            key={user.id}
            user={user}
            onClose={onClose}
          />
        ))}
    </div>
  );
}

export default SearchDropdown;