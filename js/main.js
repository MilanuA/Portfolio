;(function () {
	
	'use strict';
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	var fullHeight = function() {
		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};
	// Parallax
	var parallax = function() {
		$(window).stellar();
	};
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}
		} , { offset: '85%' } );
	};
	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});
		$(window).scroll(function(){
			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});
	
	};
	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: 'rgba(8, 75, 129, 0.9)',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};
	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};
	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};
	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
	});
}());

(function () {
    'use strict';

    const loadJSON = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // 'false' makes the request synchronous
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText)); // If the request is successful
            } else if (xhr.readyState === 4) {
                callback(new Error(`Failed to load ${url}`)); // If there's an error
            }
        };
        xhr.send();
    };

    const renderSkills = () => {
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

    const renderTimeline = () => {
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
	
	const renderProjects = () => {
		loadJSON('data/projects.json', (err, projects) => {
			if (err) return console.error(err);
			const container = document.getElementById('projects-container');
			const overlay = document.getElementById('bot-overlay');
			const closeBtn = document.getElementById('close-overlay');
	
			projects.forEach(project => {
				const projectElement = document.createElement('div');
				projectElement.className = 'col-md-3 text-center col-padding animate-box project';
				projectElement.setAttribute('data-tags', project.tags.join(' '));
	
				if (project.name === "Discord Bot") {
					projectElement.innerHTML = `
						<a href="#" class="work" style="background-image: url('images/projectsImages/${project.image}.png');">
							<div class="desc">
								<h3>${project.name}</h3>
								<span>${project.type}</span>
							</div>
						</a>
					`;
					projectElement.addEventListener('click', (e) => {
						e.preventDefault(); 
						overlay.classList.add('active');
					});
				} else {
					projectElement.innerHTML = `
						<a href="${project.url}" class="work" style="background-image: url('images/projectsImages/${project.image}.png');">
							<div class="desc">
								<h3>${project.name}</h3>
								<span>${project.type}</span>
							</div>
						</a>
					`;
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
		});
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

    const init = () => {
        renderSkills();
        renderTimeline();
        renderProjects();
    };

    window.addEventListener('DOMContentLoaded', init);
})();

