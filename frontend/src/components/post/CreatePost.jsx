import { Image } from "lucide-react";
import Button from "../ui/Button";

function CreatePost() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <textarea
        rows={4}
        placeholder="What's happening today?"
        className="
        w-full
        resize-none
        bg-transparent
        outline-none
        text-slate-200
        placeholder:text-slate-500
        "
      />

      <div className="flex justify-between items-center mt-5">

        <button
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <Image size={18} />

          Photo

        </button>

        <Button>

          Post

        </Button>

      </div>

    </div>
  );
}

export default CreatePost;