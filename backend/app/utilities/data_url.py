

import shutil
import secrets
from pathlib import Path


def save_avatar_file(avatar_file):
    DATA_URL = Path("../data")
    DATA_URL.mkdir(parents=True, exist_ok=True)

    while True:
        random_string = secrets.token_hex(6)
        file_path = DATA_URL / random_string

        if not file_path.exists:
            break

    with open(file_path, "wb") as file:
        shutil.copyfileobj(avatar_file.file, file)
    return file_path





