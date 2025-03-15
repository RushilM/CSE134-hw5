class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Create card structure
        this.card = document.createElement("div");
        this.card.classList.add("project-card");

        // Title
        this.titleElement = document.createElement("h2");

        // Picture & Image
        this.picture = document.createElement("picture");
        this.imgElement = document.createElement("img");
        this.picture.appendChild(this.imgElement);

        // Description
        this.descriptionElement = document.createElement("p");

        // Link
        this.linkElement = document.createElement("a");
        this.linkElement.textContent = "Learn More";
        this.linkElement.target = "_blank";

        // Append elements to card
        this.card.appendChild(this.titleElement);
        this.card.appendChild(this.picture);
        this.card.appendChild(this.descriptionElement);
        this.card.appendChild(this.linkElement);

        // Apply Styles
        const style = document.createElement("style");
        style.textContent = `
            .project-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: white;
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease-in-out;
                text-align: center;
                max-width: 300px;
                margin: 1rem;
            }
            .project-card:hover {
                transform: scale(1.05);
            }
            h2 {
                font-size: 1.5rem;
                margin: 0.5rem 0;
                color: black;
            }
            img {
                max-width: 100%;
                border-radius: 8px;
            }
            p {
                font-size: 1rem;
                margin: 0.5rem 0;
                color: black;
            }
            a {
                text-decoration: none;
                color: blue;
                font-weight: bold;
                margin-top: 0.5rem;
            }
            a:hover {
                text-decoration: underline;
            }
        `;

        // Attach elements to Shadow DOM
        this.shadowRoot.append(style, this.card);
    }

    static get observedAttributes() {
        return ["title", "image", "alt", "description", "link"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
            this.titleElement.textContent = newValue;
        } else if (name === "image") {
            this.imgElement.src = newValue;
        } else if (name === "alt") {
            this.imgElement.alt = newValue;
        } else if (name === "description") {
            this.descriptionElement.textContent = newValue;
        } else if (name === "link") {
            this.linkElement.href = newValue;
        }
    }
}

customElements.define("project-card", ProjectCard);
