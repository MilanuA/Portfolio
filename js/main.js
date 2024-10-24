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
		// pieChart();
		skillsWayPoint();
	});


	const skills = [
        { name: "C#", percent: 80 },
        { name: "Unity", percent: 80 },
        { name: "C++", percent: 35 },
        { name: "Unreal", percent: 35 },
        { name: "PHP", percent: 25 },
        { name: "PL/SQL", percent: 30 },
        { name: "React", percent: 20 },
        { name: "HTML/CSS", percent: 40 },
		{name: "Blender", percent: 25},

        { name: "Git", percent: 100, type: "Tool" },
        { name: "FMOD", percent: 100, type: "Tool" },
        { name: "VSCode", percent: 100, type: "Tool" },
        { name: "Trello, Plane", percent: 100, type: "Task Management" },
	
    ];

    const skillsContainer = document.getElementById('skills-container');

    skills.forEach(skill => {
        const skillType = skill.type ? skill.type : '';
		const showPercent = skill.type ? '' : skill.percent  + '%';

        const skillElement = `
            <div class="col-md-3 col-sm-6 col-xs-12 text-center">
                <div class="chart" data-percent="${skill.percent}">
                    <span><strong>${skill.name}</strong>${showPercent}${skillType}</span>
                </div>
            </div>
        `;
        skillsContainer.innerHTML += skillElement;
    });

}());


;(function () {
	'use strict';

	const Icons = {
		WORK: 'icon-suitcase',
		EDUCATION: 'icon-graduation-cap'
	};

	const workExperience = [
		{
			title: "Unity developer",
			company: "Liquid Digital Group",
			years: "10-05-2022 - now",
			description: "Small studio based in the USA, specializing in freelance programming services. With me, as the lead game programmer, we have been involved in fulfilling a variety of projects through Fiverr."
		},
		{
			title: "Unreal developer - internship",
			company: "Incidental minds",
			years: "03-06-2024 - 30-08-2024",
			description: "Gained hands-on experience with both Blueprints and C++ while contributing to a real-world project in Unreal Engine, enhancing gameplay features and performance."
		},
		{
			title: "3D Modeler - Internship",
			company: "PWC Slovakia",
			years: "29-05-2023 - 23-06-2023",
			description: "Created detailed, office-based models for an internal project."
		},
		{
			title: "Web developer - Internship",
			company: "Unicorn",
			years: "16-05-2022 - 27-05-2022",
			description: "Developed a web calculator as the primary feature, then integrated an item database using an API, enabling efficient search and browsing through a user-friendly interface."
		}
	];

	const education = [
		{
			title: "Bachelor Degree",
			institution: "Faculty of Informatics and Statistics VŠE Prague",
			years: "2024 - now",
			description: ""
		},
		{
			title: "Graduation",
			institution: "Delta - Střední škola informatiky a ekonomie",
			years: "2020-2024",
			description: "C#, Cisco/Packet tracer, PHP, SQL, Android / Java, React / MUI / GraphQL "
		}
	];

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
			const badgeIcon = isWorkExperience ? Icons.WORK : Icons.EDUCATION;

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
}());