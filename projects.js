const LOCAL_STORAGE_KEY = "cs_projects"; // Local Storage Key
const REMOTE_URL = "https://api.jsonbin.io/v3/b/67d108c88a456b796674205d"; // JSONBin API
const API_KEY = "$2a$10$4ZaH5uoie3zy2.c42Vpe6O.zlrNFKZOd1m5/HYmsM6wDNM7TPdhcu";

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM loaded, checking for buttons...");

    const localButton = document.getElementById("load-local");
    const remoteButton = document.getElementById("load-remote");
    const container = document.getElementById("projects-cards-container");

    if (localButton) {
        localButton.addEventListener("click", loadLocalProjects);
        console.log("✅ 'Load Local' button found.");
    } else {
        console.warn("⚠ 'Load Local' button not found.");
    }

    if (remoteButton) {
        remoteButton.addEventListener("click", loadRemoteProjects);
        console.log("✅ 'Load Remote' button found.");
    } else {
        console.warn("⚠ 'Load Remote' button not found.");
    }

    if (container) {
        console.log("🔄 Auto-loading local projects...");
        loadLocalProjects();
    }
});

// ✅ Function to Clear Old Project Cards Before Loading New Ones
function clearProjects() {
    const container = document.getElementById("projects-cards-container");
    if (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

// ✅ Fetch Data from Remote API (JSONBin) & Store in LocalStorage
async function loadRemoteProjects() {
    console.log("⏳ Fetching remote projects...");
    const container = document.getElementById("projects-cards-container");

    if (!container) {
        console.error("❌ Error: No container found for projects!");
        return;
    }

    clearProjects(); // Remove existing projects

    try {
        const response = await fetch(REMOTE_URL, {
            headers: { "X-Master-Key": API_KEY }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Remote projects loaded:", data.record);

        // ✅ Store the fetched data in localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.record));

        renderProjects(data.record);
    } catch (error) {
        console.error("❌ Error fetching remote projects:", error);
    }
}

// ✅ Load Projects from Local Storage
function loadLocalProjects() {
    console.log("⏳ Loading projects from localStorage...");
    const container = document.getElementById("projects-cards-container");

    if (!container) {
        console.warn("⚠ No container found for projects!");
        return;
    }

    clearProjects(); // Remove existing projects before loading new ones

    const storedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storedProjects) {
        console.warn("⚠ No local projects found in localStorage.");
        return;
    }

    try {
        const projects = JSON.parse(storedProjects); // Convert from string to object
        console.log("✅ Local projects loaded:", projects);

        if (Array.isArray(projects) && projects.length > 0) {
            renderProjects(projects);
        } else {
            console.warn("⚠ Local projects data is empty or not in the correct format.");
        }
    } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
    }
}

// ✅ Render Project Cards
function renderProjects(projects) {
    console.log("🔄 Rendering project cards...");
    const container = document.getElementById("projects-cards-container");

    if (!container) {
        console.error("❌ Error: No container found for rendering projects!");
        return;
    }

    projects.forEach(project => {
        console.log("ℹ️ Creating project card:", project);

        const card = document.createElement("project-card");
        card.setAttribute("title", project.title || "Untitled Project");
        card.setAttribute("image", project.image || "assets/media/default.jpg");
        card.setAttribute("alt", project.alt || "Project Image");
        card.setAttribute("description", project.description || "No description available.");
        card.setAttribute("link", project.link || "#");

        container.appendChild(card);
    });

    console.log("✅ All projects displayed!");
}
