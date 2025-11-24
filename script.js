// Load projects from JSON
fetch("projects.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("projectCards");

        data.forEach(p => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${p.image}" alt="${p.title}">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
            `;

            card.onclick = () => openProject(p.file);
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading projects.json", err));


// Open project in iframe
function openProject(file) {
    document.getElementById('about').style.display = 'none';
    document.getElementById('projects').style.display = 'none';
    document.getElementById('contact').style.display = 'none';

    let viewer = document.getElementById('projectViewer');
    if (!viewer) {
        viewer = document.createElement('section');
        viewer.id = 'projectViewer';
        viewer.className = 'section';
        document.body.insertBefore(viewer, document.querySelector('footer'));
    }

    viewer.innerHTML = `
        <h2>Project Preview</h2>
        <iframe src="projects/${file}" width="100%" height="600px"></iframe>
        <br><br>
        <button onclick="goBack()">Go Back</button>
    `;

    viewer.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go back to main page
function goBack() {
    document.getElementById('about').style.display = 'block';
    document.getElementById('projects').style.display = 'block';
    document.getElementById('contact').style.display = 'block';

    const viewer = document.getElementById('projectViewer');
    if (viewer) viewer.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
