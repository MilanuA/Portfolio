import { loadJSON } from "./loadJSON.js";

export const renderSkills = () => {
    loadJSON('data/gamedevskills.json', (err, gameskills) => {
        if (err) return console.error(err);
        loadJSON('data/otherskills.json', (err, otherSkills) => {
            if (err) return console.error(err);
            loadJSON('data/tools.json', (err, tools) => {
                if (err) return console.error(err);

                const gameSkillsContainer = document.getElementById('skills-game-container');
                const otherSkillsContainer = document.getElementById('skills-container');
                const toolsContainer = document.getElementById('tools-container');

                gameskills.forEach(skill => {
                    const skillElement = `
                        <div class="col-md-3 col-sm-6 col-xs-12 text-center">
                            <div class="chart" data-percent="${skill.percent}">
                                <span><strong>${skill.name}</strong>${skill.percent}%</span>
                            </div>
                        </div>
                    `;
                    gameSkillsContainer.innerHTML += skillElement;
                });

                otherSkills.forEach(skill => {
                    const skillElement = `
                        <div class="col-md-3 col-sm-6 col-xs-12 text-center">
                            <div class="chart" data-percent="${skill.percent}">
                                <span><strong>${skill.name}</strong>${skill.percent}%</span>
                            </div>
                        </div>
                    `;
                    otherSkillsContainer.innerHTML += skillElement;
                });

                tools.forEach(skill => {
                    const skillElement = `
                        <div class="col-md-3 col-sm-6 col-xs-12 text-center">
                            <div class="chart" data-percent="${skill.percent}">
                                <span><strong>${skill.name}</strong>${skill.type}</span>
                            </div>
                        </div>
                    `;
                    toolsContainer.innerHTML += skillElement;
                });
            });
        });
    });
};