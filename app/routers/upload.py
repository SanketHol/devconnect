from fastapi import APIRouter, UploadFile, File, HTTPException

from app.utils.cloudinary import upload_image

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

MAX_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("/")
def upload(file: UploadFile = File(...)):

    # Move cursor to end of file
    file.file.seek(0, 2)

    # Get file size
    size = file.file.tell()

    # Move cursor back to beginning
    file.file.seek(0)

    if size > MAX_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image size must be less than 10 MB."
        )

    try:
        image_url = upload_image(file.file)

        return {
            "image_url": image_url
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )