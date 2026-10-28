
from flask import Flask, render_template, jsonify
import psutil
import platform
import socket
import time

app = Flask(__name__)

# Website home page
@app.route("/")
def home():
    return render_template("index.html")


# API for live system statistics
@app.route("/api/stats")
def stats():

    # CPU usage
    cpu = psutil.cpu_percent(interval=0.5)

    # RAM usage
    memory = psutil.virtual_memory()

    # Disk usage
    disk = psutil.disk_usage("/")

    # System uptime
    boot_time = psutil.boot_time()
    uptime_seconds = int(time.time() - boot_time)

    days = uptime_seconds // 86400
    hours = (uptime_seconds % 86400) // 3600
    minutes = (uptime_seconds % 3600) // 60

    return jsonify({
        "cpu": cpu,
        "ram": memory.percent,
        "ram_used": round(memory.used / (1024 ** 3), 2),
        "ram_total": round(memory.total / (1024 ** 3), 2),
        "disk": disk.percent,
        "disk_used": round(disk.used / (1024 ** 3), 2),
        "disk_total": round(disk.total / (1024 ** 3), 2),
        "hostname": socket.gethostname(),
        "os": platform.system() + " " + platform.release(),
        "uptime": f"{days}d {hours}h {minutes}m"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
