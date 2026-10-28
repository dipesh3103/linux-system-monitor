
async function updateDashboard() {
    try {
        const response = await fetch("/api/stats");

        if (!response.ok) {
            throw new Error("Could not fetch system data");
        }

        const data = await response.json();

        // CPU
        document.getElementById("cpu").textContent =
            data.cpu + "%";

        document.getElementById("cpu-bar").style.width =
            data.cpu + "%";

        // RAM
        document.getElementById("ram").textContent =
            data.ram + "%";

        document.getElementById("ram-bar").style.width =
            data.ram + "%";

        document.getElementById("ram-detail").textContent =
            `${data.ram_used} GB / ${data.ram_total} GB`;

        // Disk
        document.getElementById("disk").textContent =
            data.disk + "%";

        document.getElementById("disk-bar").style.width =
            data.disk + "%";

        document.getElementById("disk-detail").textContent =
            `${data.disk_used} GB / ${data.disk_total} GB`;

        // System information
        document.getElementById("hostname").textContent =
            data.hostname;

        document.getElementById("os").textContent =
            data.os;

        document.getElementById("uptime").textContent =
            data.uptime;

        document.getElementById("updated").textContent =
            "Last updated: " + new Date().toLocaleTimeString();

    } catch (error) {
        document.getElementById("updated").textContent =
            "Error: " + error.message;
    }
}

// Load data immediately
updateDashboard();

// Refresh every 3 seconds
setInterval(updateDashboard, 3000);
