import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadImage } from "../api/uploadApi";

export function useUploadImage() {

    return useMutation({

        mutationFn: uploadImage,

        onError: (error) => {

            toast.error(
                error.response?.data?.detail ||
                "Image upload failed"
            );

        },

    });

}