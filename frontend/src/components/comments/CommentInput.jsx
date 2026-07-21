import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { useCreateComment } from "../../hooks/useCreateComment";

function CommentInput({ postId }) {
  const [text, setText] = useState("");

  const mutation = useCreateComment(postId);

  const submit = () => {
    if (!text.trim()) return;

    mutation.mutate({
      postId,
      text,
    });

    setText("");
  };

  return (
    <div className="mt-6">

      <div
        className="
        flex
        items-center
        gap-3
        bg-slate-800
        border
        border-slate-700
        rounded-full
        px-4
        py-2
        "
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="
          flex-1
          bg-transparent
          outline-none
          text-sm
          placeholder:text-slate-500
          "
        />

        <button
          onClick={submit}
          disabled={mutation.isPending}
          className="
          w-9
          h-9
          rounded-full
          bg-cyan-500
          hover:bg-cyan-600
          flex
          items-center
          justify-center
          transition
          disabled:opacity-50
          "
        >
          <SendHorizontal size={18} />
        </button>

      </div>

    </div>
  );
}

export default CommentInput;