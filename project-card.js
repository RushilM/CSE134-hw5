class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const card = document.createElement("div");
        card.classList.add("project-card");

        const title = document.createElement("h2");
        title.textContent = this.getAttribute("title") || "Project Title"; // Default if title missing

        const picture = document.createElement("picture");
        const img = document.createElement("img");
        img.src = this.getAttribute("image") || "";
        img.alt = this.getAttribute("alt") || "Project Image";
        picture.appendChild(img);

        const description = document.createElement("p");
        description.textContent = this.getAttribute("description") || "Short project description.";

        const link = document.createElement("a");
        link.href = this.getAttribute("link") || "#";
        link.textContent = "Learn More";
        link.target = "_blank";

        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(description);
        card.appendChild(link);

        const style = document.createElement("style");
        style.textContent = `
            .project-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: var(--background-color, white);
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease-in-out;
                text-align: center;
                max-width: 300px;
            }
            .project-card:hover {
                transform: scale(1.05);
            }
            h2 {
                font-size: 1.5rem;
                margin: 0.5rem 0;
                color: var(--text-color, black);
            }
            img {
                max-width: 100%;
                border-radius: 8px;
            }
            p {
                font-size: 1rem;
                margin: 0.5rem 0;
                color: var(--text-color, black);
            }
            a {
                text-decoration: none;
                color: var(--primary-color, blue);
                font-weight: bold;
                margin-top: 0.5rem;
            }
            a:hover {
                text-decoration: underline;
            }
        `;

        this.shadowRoot.append(style, card);
    }
}

customElements.define("project-card", ProjectCard);

// Function to load projects dynamically
async function loadProjects() {
    const container = document.getElementById("experience-cards-container");

    try {
        const response = await fetch("projects.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const projects = await response.json();

        projects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("alt", project.alt);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Load projects on page load
document.addEventListener("DOMContentLoaded", loadProjects);
