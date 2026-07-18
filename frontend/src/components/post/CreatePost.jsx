import { Image } from "lucide-react";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import { useCreatePost } from "../../hooks/useCreatePost";

function CreatePost() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const createPostMutation = useCreatePost();

  const onSubmit = (data) => {
    createPostMutation.mutate(
      {
        caption: data.caption,
        image_url: null,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <form
        onSubmit={handleSubmit(onSubmit)}
      >

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
          {...register("caption", {
            required: true,
          })}
        />

        <div className="flex justify-between items-center mt-5">

          <button
            type="button"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <Image size={18} />

            Photo

          </button>

          <Button
            type="submit"
            loading={createPostMutation.isPending}
          >
            Post
          </Button>

        </div>

      </form>

    </div>
  );
}

export default CreatePost;