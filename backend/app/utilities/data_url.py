

import shutil
import secrets
from pathlib import Path


def save_avatar_file(avatar_file):
    suffix_list = [
        ".jpg", 
        ".jpeg", 
        ".png", 
        ".webp", 
        ".gif", 
        ".bmp", 
        ".tiff", 
        ".svg", 
        ".ico", 
        ".heic", 
        ".heif", 
        ".avif", 
        ".jfif", 
        ".pjpeg", 
        ".pjp", 
        ".apng", 
        ".cur", 
        ".tga"
    ]

    if not avatar_file:
        return None

    DATA_URL = Path("/app/app/data")
    DATA_URL.mkdir(parents=True, exist_ok=True)
    extension = Path(avatar_file.filename).suffix.lower()
    if extension not in suffix_list:
        raise ValueError(f"Invalid file extension: {extension}. Allowed extensions are: {', '.join(suffix_list)}")

    while True:
        random_string = secrets.token_hex(6)
        file_path = f"{random_string}{extension}"
        URL_PATH = DATA_URL / f"{random_string}{extension}"

        if not URL_PATH.exists():
            break

    try:
        with open(URL_PATH, "wb") as file:
            shutil.copyfileobj(avatar_file.file, file)
    except Exception:
        raise ValueError()
    return str(file_path)


