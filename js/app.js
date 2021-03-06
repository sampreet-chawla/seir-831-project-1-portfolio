let sheetAsJSON =
	'https://spreadsheets.google.com/feeds/list/1PCS9xZV7bCEX0Onnkn6k4wbTPwxeKnLuKf8yjEsTEqQ/od6/public/values?alt=json';

$.ajax({ url: sheetAsJSON })
	.then((data) => {
		let projects = data.feed.entry.map((project) => {
			return {
				title: project.gsx$title.$t,
				image: project.gsx$image.$t,
				description: project.gsx$description.$t,
				techs: project.gsx$techs.$t,
				url: project.gsx$url.$t,
			};
		});

		return projects;
	})
	.then((projects) => {
		renderProjectCarousel(projects);
		renderAllProjects(projects);
	});

const renderProjectCarousel = (projects) => {
	projects.forEach((project, index) => {
		const itemActive = index === 0 ? ' active' : '';

		const $li = `<li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="active"></li>`;
		$('.carousel-indicators').append($li);

		const $carouselItem = $(`<div class="carousel-item${itemActive}">
					<div><img src="${project.image}" alt="${project.title} picture" class="d-block w-100"></div>
					<div class="carousel-caption">
						<h5>${project.title}</h5>
						<p>${project.description}</p>
						<p>${project.techs}</p>
						<p class="project-view" id="project-view"><a href="${project.url}" target="_blank">View Here</a></p>
					</div>
					</div>`);
		$('.carousel-inner').append($carouselItem);
	});
};

const renderAllProjects = (projects) => {
	projects.forEach((project) => {
		const $article = $(
			`<div class="card" style="width: 18rem;">
			<img src="${project.image}" class="card-img-top" alt="{project.title} picture">
			<div class="card-body">
				<h5 class="card-title">${project.title}</h5>
				<p class="card-text">${project.description}</p>
				<p class="card-text">${project.techs}</p>
				<a href="${project.url}" class="btn btn-primary" target="_blank">View Project</a>
			</div>
		</div>`
		);
		$('.projects-main').append($article);
	});
};

$('form').on('submit', (event) => {
	event.preventDefault();

	const fullName = $('#full-name').val();
	const email = $('#email').val();
	const message = $('#message').val();
	console.log(
		`Get In Touch - Full Name: ${fullName}, email: ${email}, message: "${message}"`
	);

	$('#contact-thanks')
		.text('Thanks for reaching out! I shall get back to you in 1-2 days.')
		.css('display', 'block');

	$(event.currentTarget).trigger('reset');
});

$('.navbar-collapse a').click(function () {
	$collapseVal = $('.navbar-collapse').collapse();
	$('.navbar-collapse').collapse('hide');
});

/////////////////////////
// For Goto Top Button
// Source Code from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
window.onscroll = function () {
	scrollFunction();
};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById('myTopBtn').style.display = 'block';
	} else {
		document.getElementById('myTopBtn').style.display = 'none';
	}
}
var $root = $('html, body');
$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$root.animate({ scrollTop: $($.attr(this, 'href')).offset().top }, 800);
});
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
$('#myTopBtn').click(function () {
	$root.animate({ scrollTop: 0 }, 800);
});
$(() => {
	var $scroller = $('#site-wrapper');
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$scroller.stop().animate(
			{
				scrollTop:
					$target.offset().top - $scroller.offset().top + $scroller.scrollTop(),
			},
			900,
			'swing',
			function () {
				window.location.hash = target;
			}
		);
	});
});
var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName('close')[0];
btn.onclick = function () {
	modal.style.display = 'block';
};
span.onclick = function () {
	modal.style.display = 'none';
};
