export const renderProjects = async () => {
    try {
      const serverResponse = await fetch('https://portfolio-api-nine-delta.vercel.app/games');
      const serverData = await serverResponse.json();
      
      if (!Array.isArray(serverData)) {
        console.error("No games found in server response:", serverData);
        return;
      }
  
      const jsonResponse = await fetch('data/projects.json');
      const jsonData = await jsonResponse.json();
  
      if (!Array.isArray(jsonData)) {
        console.error("No games found in JSON response:", jsonData);
        return;
      }
  
      const allProjects = [...jsonData, ...serverData,];
      
      const container = document.getElementById('projects-container');
      const overlay = document.getElementById('bot-overlay');
      const closeBtn = document.getElementById('close-overlay');
  
      allProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'col-md-3 text-center col-padding animate-box project';
  
        if (project.title === "Discord Bot") {
          projectElement.innerHTML = `
            <a href="#" class="work" style="background-image: url('${project.cover_url}');">
              <div class="desc">
                <h3>${project.title}</h3>
                <span>${project.type}</span>
              </div>
            </a>
          `;

          projectElement.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
          });
          projectElement.setAttribute('data-tags', project.tags.join(' '));
        } else {
          const publishedAt = new Date(project.published_at);
          const formattedDate = publishedAt.toLocaleDateString('en-GB');
          
          const description = (project.short_text && formattedDate) 
          ? `<span>${project.short_text || ''}</span></br><span>Published at ${formattedDate || ''}</span>` 
          : `<span>${project.type}</span>`;
      
      projectElement.innerHTML = `
        <a href="${project.url}" class="work" style="background-image: url('${project.cover_url}');">
          <div class="desc">
            <h3>${project.title}</h3>
            ${description}
          </div>
        </a>
      `;
      
          
          if (project.tags && Array.isArray(project.tags)) {
            projectElement.setAttribute('data-tags', project.tags.join(' '));
          } else {
            projectElement.setAttribute('data-tags', 'Unity C#');
          }
        }
  
        container.appendChild(projectElement);
      });
      
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
  
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  

document.getElementById("filter").addEventListener("change", function () {
    const filter = this.value.toLowerCase(); 
    const projects = document.querySelectorAll(".project");

    projects.forEach((project) => {
        const tags = project.getAttribute("data-tags").toLowerCase();
        if (filter === "all" || tags.includes(filter)) {
            project.classList.remove("hidden");
        } else {
            project.classList.add("hidden");
        }
    });
});  