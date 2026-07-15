document.addEventListener('DOMContentLoaded', () => {


    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadTechnicalSkills(data.technicalSkills);
            loadSoftSkills(data.softSkills);
            loadProjects(data.projects);
            loadExperience(data.education, 'education-list');
            loadExperience(data.experience, 'work-list');
        });

    function loadTechnicalSkills(skills) {
        const container = document.getElementById('tech-skills-list');
        skills.forEach(skill => {
            container.innerHTML += `
                <div class="skill-item">
                    <div class="skill-info">
                        <span>${skill.name}</span>
                        <span>${skill.level}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${skill.level};"></div>
                    </div>
                </div>
            `;
        });
    }

    function loadSoftSkills(skills) {
        const container = document.getElementById('soft-skills-list');
        skills.forEach(skill => {
            container.innerHTML += `<div class="tag">${skill}</div>`;
        });
    }

    function loadProjects(projects) {
        const container = document.getElementById('projects-grid');
        projects.forEach(project => {
            let tagsHtml = "";
            project.tags.forEach(tag => {
                tagsHtml += `<span class="tag">${tag}</span> `;
            });

            let buttonHtml = "";
            
            if (project.actionType === "scroll-top") {
                buttonHtml = `<button class="btn btn-primary full-width" 
                            onclick="window.scrollTo({top: 0, behavior: 'smooth'})">Try Live Demo</button>`;
            
            } else if (project.actionType === "external") {
                buttonHtml = `<a href="${project.link}" target="_blank" class="btn btn-primary full-width" 
                                style="display:block; text-align:center; box-sizing: border-box;">Try Live Demo</a>`;
            
            } else {
                buttonHtml = `<button class="btn btn-primary full-width" 
                            onclick="openModal('${project.id}', '${project.title}')">Try Live Demo</button>`;
            }

            container.innerHTML += `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    ${buttonHtml}
                </div>
            `;
        });
    }

    function loadExperience(items, elementId) {
        const container = document.getElementById(elementId);
        items.forEach(item => {
            container.innerHTML += `
                <div class="experience-card">
                    <h4>${item.title}</h4>
                    <span class="experience-date">${item.date}</span>
                    <p style="font-weight: 600; font-size: 14px; margin-bottom: 10px; color: #555;">${item.place}</p>
                    <p style="font-size: 14px; color: #666;">${item.description}</p>
                </div>
            `;
        });
    }

    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

function openModal(projectId, projectTitle) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').innerText = projectTitle;
    document.getElementById('modal-desc').innerText = "Try out my working calculator ";
    modal.style.display = "flex";
}

let calcDisplay = "";

function addCalc(value) {
    calcDisplay += value;
    document.getElementById('calc-display').value = calcDisplay;
}

function clearCalc() {
    calcDisplay = "";
    document.getElementById('calc-display').value = "0";
}

function calculateResult() {
    try {
        let result = eval(calcDisplay); 
        document.getElementById('calc-display').value = result;
        calcDisplay = result.toString();
    } catch (error) {
        document.getElementById('calc-display').value = "Error";
        calcDisplay = "";
    }
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});