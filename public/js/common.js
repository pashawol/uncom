"use strict";

let scrollWidth;
function getScrollWidth(scrollWidth){
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);

	scrollWidth = div.offsetWidth - div.clientWidth;
	let root = document.documentElement;
	root.style.setProperty('--spacing-end', scrollWidth + 'px');
	div.remove();
}
getScrollWidth(scrollWidth);

const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, { passive: true });
	},
	tabscostume() {
		//ultimate tabs
		let cTabs = document.querySelectorAll('.tabs');
		for (let tab of cTabs){
			let Btns = tab.querySelectorAll('.tabs__btn')
			let contentGroups = tab.querySelectorAll('.tabs__wrap');

			for (let btn of Btns){
				btn.addEventListener('click', function (){

					for (let btn of Btns){
						btn.classList.remove('active');
					}
					this.classList.add('active');

					let index = [...Btns].indexOf(this);
					//-console.log(index);

					for (let cGroup of contentGroups){
						let contentItems = cGroup.querySelectorAll('.tabs__content');

						for (let item of contentItems){
							item.classList.remove('active');
						}
						contentItems[index].classList.add('active');
					}
				})
			}
		}
	},
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll(topShift=80) {
		document.addEventListener('click', function (){
			if (event.target.closest('.menu li a, .scroll-link')) {
				let self = event.target.closest('.menu li a, .scroll-link');
				event.preventDefault();

				let targetSelector = self.getAttribute('href');
				let target = document.querySelector(targetSelector);

				if (!target) {
					self.setAttribute("href", '/' + targetSelector);
				}

				let targetTop = target.offsetTop;
				window.scrollTo({
					top: targetTop - topShift,
					behavior: "smooth",
				});
			}
		});
	},
};
//-const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask();
	JSCCommon.heightwindow();
	// JSCCommon.animateScroll();

	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	//luckyOne Js
	let headerH = 64;
	let header = document.querySelector(".header--js");
	function calcHeaderHeight() {
	// 	document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
	// 	window.setTimeout(function(){
	// 	document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
	// }, 100)
	// 	headerH = header.offsetHeight;
	// 	console.log(header.offsetHeight);
		if (!header) return;
		window.scrollY > 0
			? header.classList.add('fixed')
			: header.classList.remove('fixed');
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	// window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	// calcHeaderHeight();
		calcHeaderHeight();

	//
	let headerBlSlider = new Swiper('.headerBlock-slider-js', {
		loop: true,
		centeredSlides: true,
		spaceBetween: 0,

		slidesPerView: "auto",
		effect: "coverflow",
		coverflowEffect: {
			rotate: 0,
			stretch: -220,
			depth: 200,
			modifier: 1,
			//slideShadows: true,
		},
		breakpoints: {
			1200: {
				// spaceBetween: 230,
			},
		},

		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});
	//.sNew-slider-js
	let sNewSlider = new Swiper('.sNew-slider-js', {
		slidesPerView: 'auto',
		loop: true,

		breakpoints: {
			0: {
				spaceBetween: 16,
			},
			576: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 30,
			},
		},

		navigation: {
			nextEl: '.sNew--js .swiper-button-next',
			prevEl: '.sNew--js .swiper-button-prev',
		},
	});

	//-
	let sProdGroupSlider = new Swiper('.sProdGroup-slider-js', {
		spaceBetween: 0,
		breakpoints: {
			0: {
				slidesPerView: 2,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},

		slidesPerView: 3,
		grid: {
			rows: 2,
		},
	});

	//-
	let inpMasks = document.querySelectorAll('.number-mask-js');
	for (let inp of inpMasks){
		Inputmask(inp.getAttribute('data-mask')).mask(inp);
	}

	//-
	let sPrintSlider = new Swiper('.sPrint-slider-js', {
		watchOverflow: true,
		slidesPerView: 'auto',
		//loop: true,

		breakpoints: {
			0: {
				spaceBetween: 16,
			},
			576: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 32,
			},
		},

		navigation: {
			nextEl: '.sPrint--js .swiper-button-next',
			prevEl: '.sPrint--js .swiper-button-prev',
		},
	});
	//
	var breadcrumbSlider = new Swiper(".breadcrumb-slider--js", {
		slidesPerView: 'auto',
	});
	let sNewsSlider = new Swiper('.sNews-slider-js', {
		watchOverflow: true,
		slidesPerView: 'auto',

		breakpoints: {
			0: {
				spaceBetween: 36,
			},
			576: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 32,
			},
		},
	});
	//-
	//
	let popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	let markWrap = document.querySelector('.mark-wrap-js');
	let popoverMarks = [];
	let popoverMarksClientRects = [];
	let popovers = [];

	function putPopoverMarks(){
		for (let [index, elem] of Object.entries(popoverTriggerList)){
			let childPos = elem.getBoundingClientRect();
			let parentPos = markWrap.getBoundingClientRect();
			popoverMarksClientRects.push(elem.getBoundingClientRect());

			//shift (0-2)
			let leftShift = popoverTriggerList[index].getAttribute('data-left-shift') || 1;
			let topShift = popoverTriggerList[index].getAttribute('data-top-shift') || 1;

			let markOffset = {
				top: childPos.top - parentPos.top + childPos.height/2 * topShift,
				left: childPos.left - parentPos.left + childPos.width/2 * leftShift,
			}

			//if triggers firs time only
			if (popoverTriggerList.length !== markWrap.children.length){
				let mark = document.createElement('div');
				mark.classList.add(`map-div`, `map-div--${index}`);
				mark.setAttribute('data-bs-toggle', "popover");
				mark.setAttribute('data-bs-content', "And here's some amazing content. It's very engaging. Right?");
				mark.setAttribute('data-city', popoverTriggerList[index].getAttribute('data-city'));
				mark.setAttribute('data-placement', popoverTriggerList[index].getAttribute('data-placement'));
				mark.setAttribute('data-bg', popoverTriggerList[index].getAttribute('data-bg'));
				markWrap.appendChild(mark)
				popoverMarks.push(mark);
				mark.addEventListener('click', popOverMarkClick);
			}

			markWrap.children[index].style.cssText = `
				top: ${markOffset.top}px; 
				left: ${markOffset.left}px;
			`;
		}
	}
	putPopoverMarks();
	window.addEventListener('resize', putPopoverMarks, {passive: true});
	let popoverMissClick = function (){
		if (!event.target.closest('.popover') ){
			closeAllPopOvers();
		}
	};
	function closeAllPopOvers(){
		for (let popover of popovers){
			popover.hide();
		}

		for (let mark of popoverMarks){
			mark.classList.remove('active')
		}
		for (let tl of popoverTriggerList){
			tl.classList.remove('active')
		}
	}


	//
	for(let elem of popoverTriggerList){

		let popoverContent = {
			city: elem.dataset.city,
			placement: elem.dataset.placement,
			department: elem.dataset.department,
			tel: elem.dataset.tel,
			link: elem.dataset.link,
		};

		let popoverInner = `
		<div class="sMap__popover">
			<div class="sMap__city">${popoverContent.city}</div>
			<div class="sMap__department">${popoverContent.department}</div>
			<a class="sMap__link" target="_blank" href="${popoverContent.link}">${popoverContent.tel}</a>
		</div>`;

		let index = [...popoverTriggerList].indexOf(elem);

		//bind its placement to dot => popoverMarks[index], to el => elem
		let popover =  new bootstrap.Popover(popoverMarks[index], {
			template: `<div class="popover" role="tooltip">
			${popoverInner}`,
			container: '#sMap',
			trigger: 'manual',
			popperConfig: {
				placement: popoverContent.placement || 'top-start',
			},
		});
		popovers.push(popover);
		elem.addEventListener('click', popOverElemClick);
	}

	//part of map(path) trigger click on mark
	function popOverElemClick(){
		popoverMarks[[...popoverTriggerList].indexOf(this)].click();
	}
	function popOverMarkClick(){
		document.removeEventListener('click', popoverMissClick);
		for (let mark of popoverMarks){
			mark.classList.remove('active')
		}
		for (let tl of popoverTriggerList){
			tl.classList.remove('active')
		}

		//-[...popoverTriggerList].indexOf(this)
		let index = [...popoverMarks].indexOf(this);
		console.log(index);

		for (let popover of popovers){
			popover.hide();
		}
		popovers[index].show();

		popoverMarks[index].classList.add('active');
		popoverTriggerList[index].classList.add('active');

		window.setTimeout(function (){
			document.addEventListener('click', popoverMissClick);
		}, 10);
	}
	//-
	let sMapSlider = new Swiper('.sMap-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		//
		on: {
			sliderMove: function () {
				closeAllPopOvers();
			},
		},
	});
	let currYears = document.querySelectorAll('.curr-year-js')
	for(let year of currYears){
		year.innerHTML = new Date().getFullYear();
	}
	//-
	let locBtn = document.querySelector('.loc-btn-js');
	let locDd = document.querySelector('.tn-loc-dd--js');
	locBtn.addEventListener('click', function (){
		locDd.classList.toggle('active');
		document.body.classList.add('fixed2');
	});
	document.addEventListener('click', function (){
		if (!event.target.closest('.tn-box-js') && !event.target.closest('.loc-btn-js')){
			locDd.classList.remove('active');
			document.body.classList.remove('fixed2');
		}
	});
	//-
	// let subMenuItems = document.querySelectorAll('.top-nav--js .menu-item-has-children');
	// for (let item of subMenuItems){
	// 	let baner = this.querySelector('.tn-baner-js');
	//
	// 	item.addEventListener('mouseenter', function (){
	// 		item.classList.add('active');
	// 		//-baner.classList.add('active');
	// 	})
	// 	item.addEventListener('mouseleave', function (){
	// 		item.classList.remove('active');
	// 		//baner.classList.remove('active');
	// 	});
	// }
	//-
	let mobSubMenuItems = document.querySelectorAll('.menu-mobile--js .menu-item-has-children');
	for(let item of mobSubMenuItems){
		item.addEventListener('click', function (){
			this.classList.toggle('active');
			slideToggle(this.querySelector('.sub-menu'));
		})
	}



	//end luckyOne Js
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}