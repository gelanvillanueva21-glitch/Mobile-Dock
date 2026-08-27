

import shutil
import secrets
from pathlib import Path


def save_avatar_file(avatar_file):
    DATA_URL = Path("../data")
    DATA_URL.mkdir(parents=True, exist_ok=True)
    extension = Path(avatar_file.filename).suffix.lower()


    while True:
        random_string = secrets.token_hex(6)
        file_path = DATA_URL / f"{random_string}{extension}"

        if not file_path.exists:
            break

    with open(file_path, "wb") as file:
        shutil.copyfileobj(avatar_file.file, file)
    return file_path





