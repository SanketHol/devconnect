import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  X,
  Sparkles,
} from "lucide-react";

import Button from "../ui/Button";

import { useCreatePost } from "../../hooks/useCreatePost";
import { useUploadImage } from "../../hooks/useUploadImage";

function CreatePost() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const createPostMutation = useCreatePost();
  const uploadMutation = useUploadImage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
  };

  const onSubmit = async (data) => {
    let imageUrl = null;

    try {
      if (selectedImage) {
        const uploadResponse =
          await uploadMutation.mutateAsync(selectedImage);

        imageUrl = uploadResponse.image_url;
      }

      await createPostMutation.mutateAsync({
        caption: data.caption,
        image_url: imageUrl,
      });

      reset();

      removeImage();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="
      bg-slate-900/90
      backdrop-blur
      border
      border-slate-800
      rounded-3xl
      shadow-xl
      p-6
      transition
      hover:border-cyan-500/30
      "
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Top */}

        <div className="flex gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            font-bold
            text-white
            text-lg
            shrink-0
            "
          >
            Y
          </div>

          <div className="flex-1">

            <textarea
              rows={3}
              placeholder="What's happening today?"
              className="
              w-full
              bg-transparent
              resize-none
              outline-none
              text-slate-200
              placeholder:text-slate-500
              text-lg
              leading-7
              "
              {...register("caption", {
                required: true,
              })}
            />

          </div>

        </div>

        {/* Preview */}

        {preview && (

          <div className="mt-5 relative">

            <img
              src={preview}
              alt=""
              className="
              rounded-2xl
              w-full
              max-h-[450px]
              object-cover
              border
              border-slate-700
              "
            />

            <button
              type="button"
              onClick={removeImage}
              className="
              absolute
              top-3
              right-3
              p-2
              rounded-full
              bg-black/70
              hover:bg-red-500
              transition
              "
            >
              <X size={18} />
            </button>

          </div>

        )}

        {/* Bottom */}

        <div
          className="
          mt-6
          pt-5
          border-t
          border-slate-800
          flex
          justify-between
          items-center
          "
        >
          <div className="flex gap-5">

            <label
              className="
              flex
              items-center
              gap-2
              cursor-pointer
              text-slate-400
              hover:text-cyan-400
              transition
              "
            >
              <Image size={20} />

              <span className="text-sm">
                Photo
              </span>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />

            </label>

            <button
              type="button"
              className="
              flex
              items-center
              gap-2
              text-slate-400
              hover:text-yellow-400
              transition
              "
            >
              <Sparkles size={20} />

              <span className="text-sm">
                AI Caption
              </span>

            </button>

          </div>

          <Button
            type="submit"
            loading={
              uploadMutation.isPending ||
              createPostMutation.isPending
            }
          >
            {uploadMutation.isPending
              ? "Uploading..."
              : createPostMutation.isPending
              ? "Posting..."
              : "Post"}
          </Button>

        </div>

      </form>

    </div>
  );
}

export default CreatePost;