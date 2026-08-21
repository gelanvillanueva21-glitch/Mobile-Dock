
from fastapi import FastAPI



app = FastAPI(title="Mobile-Dock")


@app.get("/test")
def test_api():
    return {
        "status": "success",
        "health": "Api success"
    }


