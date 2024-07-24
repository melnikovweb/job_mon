/* eslint-disable no-unused-vars */
import Swiper, { Pagination, Navigation, EffectFade, EffectCoverflow, Mousewheel, Keyboard } from 'swiper';
import { gsap, toArray } from 'gsap/all';

export const homeSlider = (slider) => {
	if(!slider) return;

	const slides = slider.querySelectorAll('.swiper-slide');
	const sliderLogo = slider.querySelector('.home-slider__logo');

	const getAllActiveSlideTl = (activeIndex) => {
		const sliderAnimation = slides[activeIndex].querySelectorAll('.sk-slider-animation__wrapp');
		let animationTl = [];
		toArray(sliderAnimation).map(anim => {
			const delay = anim.dataset.skDelay;
			const duration = anim.dataset.skDuration;
			const typeX = anim.dataset.skTypex;
			const typeY = anim.dataset.skTypey;
			const fade = anim.dataset.skFade === 'fade' ? 0 : 1;

			animationTl.push(gsap.timeline({ paused: true, scrub: true, ease: 'ease' })
			.from(anim, {
				y: typeY,
				x: typeX,
				opacity: fade,
				delay: delay,
				duration: duration,
			})
			.to(anim, {
				y: 0,
				x: 0,
				opacity: 1,
				delay: 0,
				duration: 0.3,
			}));
		});

		return animationTl;
	}

	const homeSliderInit = new Swiper( slider, {
		modules: [ Pagination, EffectFade, Mousewheel, Keyboard],
		spaceBetween: 0,
		effect: 'fade',
		direction: 'vertical',
		mousewheel: true,
		speed: 1000,

		keyboard: {
			enabled: true,
		},

		pagination: {
			el: '.home-slider__pagination',
			type: 'bullets',
			clickable: true,

			renderBullet: function (index, className) {
				return `<span class="${className}"><span class="swiper-pagination-bullet__title sk-title--small">${slides[index].dataset.title}</span><span class="swiper-pagination-bullet__item"></span></span>`;
			},
		},

		hashNavigation: {
			watchState: true,
		},

		on: {
			beforeInit: function () {
				slides[0].classList.add('first-slide');
				getAllActiveSlideTl(0).forEach(tl => tl.pause(0));
			},

			init: function () {
				setTimeout(() => {
					slides[0].classList.remove('first-slide');
					sliderLogo?.classList.add('hide');
					getAllActiveSlideTl(homeSliderInit.activeIndex).forEach(tl => tl.play());
				}, 1000);

				document.addEventListener('keydown', (e) => {
					const code = e.keyCode || e.which;
					if(code == 37) {
						homeSliderInit.slidePrev();
					} else if(code == 39) {
						homeSliderInit.slideNext();
					}
				});
			},

			slideChangeTransitionStart: function () {
				getAllActiveSlideTl(homeSliderInit.previousIndex).forEach(tl => tl.reverse(1));
				getAllActiveSlideTl(homeSliderInit.activeIndex).forEach(tl => tl.restart());
			},
		},
	} );
};

export const gallerySlider = (sliders) => {
	if(!sliders) return;

	[...sliders].forEach(slider => {
		const slidesLenght = slider.querySelectorAll('.swiper-slide').length / 2;

		const swiperGallery = new Swiper( slider, {
			modules: [ Pagination, Navigation, EffectCoverflow, Mousewheel, Keyboard ],
			mousewheel: true,
			loop: true,
			observer: true,
            obsereParents: true,
			speed: 1000,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: true,
			simulateTouch: true,
			lazy: true,
			effect: "coverflow",
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 900,
				modifier: 1,
				slideShadows: false,
			},

			hashNavigation: {
				replaceState: true,
				watchState: true,
			},

			breakpoints: {
				768: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				},
			},
	
			keyboard: {
				enabled: true,
			},
	
			pagination: {
				el: '.gallery-slider__pagination',
				type: 'custom',
				dynamicBullets: false,
				clickable: true,
				renderCustom: function (swiperGallery, current, total) {
					let out = '';
					for (let i = 1; i < (total / 2)+1; i++) out = `${out} <span class="swiper-pagination-bullet ${ i == current ? 'swiper-pagination-bullet-active' : ''}" tabindex="${i}" role="button" aria-label="Go to slide ${i}"></span>`
					return out;
				},
			},

			navigation: {
				nextEl: '.gallery-slider__button-next',
				prevEl: '.gallery-slider__button-prev',
			},

			on: {
				slideChange: () => {
					if((swiperGallery?.realIndex + 1) > slidesLenght) {
						slider.querySelector(`.swiper-pagination-bullet[tabindex="${(swiperGallery?.realIndex + 1) - slidesLenght}"]`).classList.add('swiper-pagination-bullet-active');
					}
				},
			},
		} );
	} );
};