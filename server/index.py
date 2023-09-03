from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pytube import YouTube
import os
import platform
from pathlib import Path
from googletrans import Translator

app = Flask(__name__)
CORS(app)


translator = Translator()
downloads = "Downloads"
downloads_path = str(Path.home() / downloads)

if str(downloads_path.split("\\")[-1]) != downloads:
    en_path = translator.translate(str(downloads_path.split("\\")[-1]), dest="en")
    if en_path.text == "downloads" or en_path.text == "Downloads":
        downloads_path = str(Path.home() / str(en_path.text))
    else:
        new_path = os.path.join(str(Path.home()), "my-downloads")
        os.mkdir(new_path)
        downloads_path = str(Path.home() / "my-downloads")


def open_downloads_folder():
    system = platform.system()
    if system == "Linux":
        os.system("xdg-open ~/Downloads")
    elif system == "Darwin":
        os.system("open ~/Downloads")
    elif system == "Windows":
        os.system("start %USERPROFILE%/Downloads")


@app.route("/")
@cross_origin()
def home():
    return "Youtube Downloader"


@app.route("/api/v1", methods=["POST"])
@cross_origin()
def download_video():
    try:
        if request.method == "POST":
            data = request.json
            link = data.get("yt_link")
            yt = YouTube(str(link))
            stream = yt.streams.get_highest_resolution()
            stream.download(output_path=downloads_path)
            open_downloads_folder()
            return "Done"
    except Exception as error:
        return "Error: " + str(error)


if __name__ == "__main__":
    app.run(debug=True)
