import cloudinary
import cloudinary.uploader

from cloudinary.exceptions import Error

from app.config import (
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
)

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True
)


def upload_image(file):
    try:
        result = cloudinary.uploader.upload(file)
        return result["secure_url"]

    except Error as e:
        raise Exception(str(e))


def delete_image(public_id):

    cloudinary.uploader.destroy(public_id)




