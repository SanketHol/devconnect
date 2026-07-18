import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, X } from "lucide-react";

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
      // Upload image first (if selected)
      if (selectedImage) {
        const uploadResponse =
          await uploadMutation.mutateAsync(selectedImage);

        imageUrl = uploadResponse.image_url;
      }

      // Create post
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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <form onSubmit={handleSubmit(onSubmit)}>

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

        {/* Image Preview */}

        {preview && (
          <div className="relative mt-5">

            <img
              src={preview}
              alt="preview"
              className="rounded-xl w-full max-h-[400px] object-cover border border-slate-700"
            />

            <button
              type="button"
              onClick={removeImage}
              className="
              absolute
              top-3
              right-3
              bg-black/70
              rounded-full
              p-2
              hover:bg-red-500
              transition
              "
            >
              <X size={18} />
            </button>

          </div>
        )}

        <div className="flex justify-between items-center mt-5">

          <label
            className="
            flex
            items-center
            gap-2
            cursor-pointer
            text-cyan-400
            hover:text-cyan-300
            "
          >
            <Image size={18} />

            <span>
              {selectedImage ? "Change Image" : "Photo"}
            </span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

          </label>

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