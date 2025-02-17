export const renderPublicRepos = async () => {
    try {
        const serverResponse = await fetch('http://localhost:3000/repos');
        const serverData = await serverResponse.json();

        if (!Array.isArray(serverData)) {
            console.error("No repos found in server response:", serverData);
            return;
        }

        const ignoredProjects = ["Space-game", "Fisher-minigame,", "Tower-Defense"];
        const filteredData = serverData.filter(project => !ignoredProjects.includes(project.name));

        const container = document.getElementById('public-repos');
        container.innerHTML = ""; 

        const list = document.createElement('ul');
        list.style.listStyleType = "none"; 
        list.style.padding = "0";
        list.style.margin = "0";
        list.style.width = "100%"; 
        list.style.display = "flex";
        list.style.flexDirection = "column";
        list.style.gap = "10px"; 

        filteredData.forEach(project => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>
                    <a href="${project.html_url}">
                        ${project.name}
                    </a> - ${project.description || 'No description'}
                </span>
                <span style="color: white; font-size: 14px;">
                    (Published at ${project.created_at})
                </span>
            `;

            list.appendChild(listItem);
        });

        container.appendChild(list);
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

