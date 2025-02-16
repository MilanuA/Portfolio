import { loadJSON } from "./loadJSON.js";

export const renderTimeline = () => {
    loadJSON('data/workexperience.json', (err, workExperience) => {
        if (err) return console.error(err);
        loadJSON('data/education.json', (err, education) => {
            if (err) return console.error(err);
            const timelineContainer = document.getElementById('timeline-container');

            const generateTimelineItems = (items, isWorkExperience) => {
                const sectionHeading = isWorkExperience ? "Work Experience" : "Education";
                const headingHTML = `
                    <li class="timeline-heading text-center animate-box">
                        <div><h3>${sectionHeading}</h3></div>
                    </li>
                `;
                timelineContainer.innerHTML += headingHTML;

                items.forEach((item, index) => {
                    const timelineClass = index % 2 === 0 ? 'timeline-unverted' : 'timeline-inverted';
                    const badgeIcon = isWorkExperience ? 'icon-suitcase' : 'icon-graduation-cap';

                    const timelineItem = `
                        <li class="${timelineClass} animate-box">
                            <div class="timeline-badge"><i class="${badgeIcon}"></i></div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h3 class="timeline-title">${isWorkExperience ? item.title : item.title}</h3>
                                    <span class="company">${isWorkExperience ? item.company : item.institution} <br> ${item.years}</span>
                                </div>
                                <div class="timeline-body">
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        </li>
                    `;
                    timelineContainer.innerHTML += timelineItem;
                });
            };

            generateTimelineItems(workExperience, true);
            generateTimelineItems(education, false);
        });
    });
};