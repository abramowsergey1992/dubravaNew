const navSwitcher = document.querySelector(".nav-switcher");
const mainNav = document.querySelector(".nav");
navSwitcher.addEventListener("click", () => {
	navSwitcher.classList.toggle("nav-switcher--active");
	mainNav.classList.toggle("nav--active");
	document.body.classList.toggle("overflow");
});
const mainNavLinksSub = mainNav.querySelectorAll(".sub>a");
mainNavLinksSub.forEach((li) => {
	li.addEventListener("click", (evt) => {
		evt.currentTarget.parentElement.classList.toggle("active");
	});
});
if (document.querySelector("#contact-map")) {
	ymaps.ready(function () {
		let center = document
			.querySelector("#contact-map")
			.dataset.coord.split(",");
		console.log(center);
		let myMap = new ymaps.Map(
			"contact-map",
			{
				center: [
					parseFloat(center[0].trim()),
					parseFloat(center[1].trim()),
				],
				controls: ["zoomControl"],
				zoom: 16,
			},
			{
				searchControlProvider: "yandex#search",
			}
		);

		myMap.behaviors.disable("scrollZoom");

		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable("drag");
		}
		myPlacemark = new ymaps.Placemark(
			[parseFloat(center[0].trim()), parseFloat(center[1].trim())],
			{
				hintContent: "",
				balloonContent: "",
			},
			{
				iconLayout: "default#image",
				iconImageHref:
					document.querySelector("#contact-map").dataset.marker,
				iconImageSize: [33, 33],
				iconImageOffset: [-16, -16],
			}
		);
		myMap.geoObjects.add(myPlacemark);
	});
}
const swiper2 = new Swiper(".mySwiper2", {
	spaceBetween: 50,
	slidesPerView: 1,
	slideClass: "swiper2-slide",
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		768: {
			enabled: false,
		},
	},
});

const getParentByNode = (el, node) => {
	if (el && el.nodeName !== node) {
		while (el && el.nodeName !== node) el = el.parentNode;
	}
	return el?.nodeName === "#document" ? null : el;
};

const getParentByClassname = (el, className) => {
	if (el && el.classList && !el.classList.contains(className)) {
		while (el && el.classList && !el.classList.contains(className)) {
			el = el.parentNode;
		}
	}
	return el?.nodeName === "#document" ? null : el;
};

const validation = {
	isNotEmpty: (e) => {
		const pattern = /(^\s*)|(\s*$)/g;
		let val = e.value.replace(pattern, "");
		if (
			typeof CKEDITOR !== "undefined" &&
			CKEDITOR.instances[e.name] !== undefined
		) {
			val = CKEDITOR.instances[e.name].getData().replace(pattern, "");
		}
		return val !== "";
	},
	isInt: (e) => {
		return /^\-?\+?\d+$/.test(e.value);
	},
	isMail: (e) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			e.value
		);
	},
};

window.onload = () => {
	const ScrollMagicController = new ScrollMagic.Controller();
	// Loader
	const loader = document.querySelector("[data-loader]");
	setTimeout(() => {
		loader.classList.add("hidden");
		setTimeout(() => loader.remove(), 500);
	}, 500);
	// Header
	const header = document.querySelector("[data-header]");
	let lastScroll = window.pageYOffset;
	const toggleHeader = (hidden) => {
		const currentScroll = window.pageYOffset;
		header.classList[currentScroll > 5 ? "add" : "remove"]("bg");
		hidden &&
			header.classList[
				currentScroll < lastScroll || currentScroll <= 10
					? "remove"
					: "add"
			]("hidden");
		lastScroll = currentScroll;
	};
	toggleHeader(false);
	window.addEventListener("scroll", () => toggleHeader(true));
	// Swipers
	const swiperList = Array.from(document.querySelectorAll("[data-swiper]"));
	window.swipers = {};
	let navs, prev, next;
	let delay = 0;
	for (let i in swiperList) {
		const type = swiperList[i].getAttribute("data-swiper");
		switch (type) {
			case "main":
				window.swipers.main = new Swiper(swiperList[i], {
					effect: "fade",
					loop: true,
					allowTouchMove: false,
					on: {
						init: (s) => {
							const videoBtns = Array.from(
								s.el.querySelectorAll("[data-video-btn]")
							);
							videoBtns.map((btn) =>
								btn.addEventListener("click", ({ target }) => {
									target = getParentByNode(target, "BUTTON");
									target.classList.toggle("active");
									if (target.classList.contains("active")) {
										s.el.classList.toggle("active");
										s.el.classList.add("animate1");
										setTimeout(
											() =>
												s.el.classList.add("animate2"),
											150
										);
									} else {
										s.el.classList.remove("animate2");
										setTimeout(() => {
											s.el.classList.remove("animate1");
											setTimeout(
												() =>
													s.el.classList.toggle(
														"active"
													),
												150
											);
										}, 150);
									}
									setTimeout(
										() =>
											s.el.nextElementSibling.classList.toggle(
												"opacity"
											),
										150
									);
									document.body.classList.toggle("overflow");
									if (
										document.body.classList.contains(
											"overflow"
										)
									) {
										swiperList[
											i
										].parentNode.parentNode.classList.add(
											"fullscreen"
										);
									} else {
										setTimeout(
											() =>
												swiperList[
													i
												].parentNode.parentNode.classList.remove(
													"fullscreen"
												),
											700
										);
									}
								})
							);
						},
					},
				});
				break;
			case "main_thumb":
				new Swiper(swiperList[i], {
					loop: true,
					allowTouchMove: false,
					autoHeight: true,
					navigation: {
						nextEl: ".main_thumb_next",
						prevEl: ".main_thumb_prev",
					},
					on: {
						slideChange: (s) =>
							window.swipers.main.slideTo(s.realIndex),
					},
				});
				break;
			case "main_side":
				setTimeout(function () {
					new Swiper(swiperList[i], {
						loop: true,
						allowTouchMove: false,
						autoplay: true,
					});
				}, delay);
				delay += 1500;
				break;
			case "card":
				navs = swiperList[i].querySelector(".swipernavs");
				prev = navs.querySelector(".card_prev");
				next = navs.querySelector(".card_next");
				new Swiper(swiperList[i], {
					slidesPerView: 1.3,

					breakpoints: {
						576: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 4,
						},
					},
					spaceBetween: 16,
					navigation: { nextEl: next, prevEl: prev },
				});
				break;
			case "news":
				navs = swiperList[i].querySelector(".swipernavs");
				prev = navs.querySelector(".news_prev");
				next = navs.querySelector(".news_next");
				new Swiper(swiperList[i], {
					autoHeight: true,
					slidesPerView: 1,
					breakpoints: {
						768: {
							slidesPerView: 2,
						},
						1300: {
							slidesPerView: "auto",
						},
					},
					spaceBetween: 16,
					navigation: { nextEl: next, prevEl: prev },
				});
				break;
			case "quiz":
				const stepbox =
					swiperList[i].querySelector("[data-quiz-steps]");
				const quizPrev = document.querySelector(
					'[data-quiz-step="prev"]'
				);
				const setQuizSteps = (s) => {
					if (stepbox)
						stepbox.innerHTML = `Шаг ${s.realIndex + 1}<span>из ${
							s.slides.length - 1
						}</span>`;
					s.el.classList[
						s.realIndex + 1 === s.slides.length ? "add" : "remove"
					]("hidden");
					quizPrev.classList[s.realIndex ? "remove" : "add"](
						"disable"
					);
				};
				const quizSteps = Array.from(
					document.querySelectorAll("[data-quiz-step]")
				);
				window.swipers.quiz = new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
					on: {
						init: (s) => setQuizSteps(s),
						slideChange: (s) => setQuizSteps(s),
					},
				});
				for (let i in quizSteps) {
					quizSteps[i].addEventListener("click", ({ target }) => {
						target = getParentByNode(target, "BUTTON");
						const idx = window.swipers.quiz.realIndex;
						const slide = window.swipers.quiz.slides[idx];
						const validations = Array.from(
							slide.querySelectorAll("[data-validate]")
						);
						let err = false;
						for (let e in validations) {
							const rule =
								validations[e].getAttribute("data-validate");
							let check = true;
							switch (rule) {
								case "text":
									check = validation.isNotEmpty(
										validations[e]
									);
									validations[e].classList[
										!check ? "add" : "remove"
									]("error");
									if (!check) err = true;
									break;
								case "number":
									check = validation.isInt(validations[e]);
									validations[e].classList[
										!check ? "add" : "remove"
									]("error");
									if (!check) err = true;
									break;
								case "email":
									check = validation.isMail(validations[e]);
									validations[e].classList[
										!check ? "add" : "remove"
									]("error");
									if (!check) err = true;
									break;
							}
						}
						if (!err) {
							if (
								target.getAttribute("data-quiz-step") === "prev"
							) {
								window.swipers.quiz.slidePrev();
							} else {
								window.swipers.quiz.slideNext();
							}
						}
					});
				}
				break;
			case "history":
				swiper_hist = window.swipers.history = new Swiper(
					swiperList[i],
					{
						slidesPerView: 1,
						spaceBetween: 16,
						breakpoints: {
							576: {
								slidesPerView: 2,
							},
							768: {
								slidesPerView: 4,
							},
						},
					}
				);
				const historyStepBtns = Array.from(
					swiperList[i].querySelectorAll("[data-history-step]")
				);
				swiper_hist.on("slideChange", function (sl) {
					console.log("slide changed");
					console.log(sl.activeIndex);
					historyStepBtns.forEach((histBtn) => {
						histBtn.classList.remove("active");
					});
					historyStepBtns[sl.activeIndex].classList.add("active");
				});
				for (let i in historyStepBtns) {
					historyStepBtns[i].addEventListener(
						"click",
						({ target }) => {
							if (!target.classList.contains("active")) {
								const current = historyStepBtns.find((btn) =>
									btn.classList.contains("active")
								);
								current && current.classList.remove("active");
								target.classList.add("active");
								const step =
									target.getAttribute("data-history-step");
								const index =
									window.swipers.history.slides.findIndex(
										(slide) =>
											slide.getAttribute(
												"data-history-target"
											) == step
									);
								window.swipers.history.slideTo(index);
							}
						}
					);
				}
				break;
			case "values":
				new Swiper(swiperList[i], {
					slidesPerView: 1.3,
					spaceBetween: 16,
					breakpoints: {
						576: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 4,
						},
					},
					navigation: {
						nextEl: ".values_next",
						prevEl: ".values_prev",
					},
				});
				break;
			case "career":
				new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
					navigation: {
						nextEl: ".next_carrer",
						prevEl: ".prev_carrer",
					},
				});
				break;
			case "contacts":
				new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
					navigation: {
						nextEl: ".next_contacts",
						prevEl: ".prev_contacts",
					},
				});
				break;
			case "where_to_buy":
				window.swipers.whereToBuy = new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
					navigation: {
						nextEl: ".next_where_to_buy",
						prevEl: ".prev_where_to_buy",
					},
				});
				break;
			case "contract_production":
				window.swipers.contractProduction = new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
				});
				const contractProductionNavs = Array.from(
					document.querySelectorAll("[data-contract-production-step]")
				);
				for (let i in contractProductionNavs) {
					contractProductionNavs[i].addEventListener(
						"click",
						({ target }) => {
							target = getParentByNode(target, "BUTTON");
							if (!target.classList.contains("active")) {
								const active = document.querySelector(
									"[data-contract-production-step].active"
								);
								active && active.classList.remove("active");
								target.classList.add("active");
								window.swipers.contractProduction.slideTo(
									parseInt(
										target.getAttribute(
											"data-contract-production-step"
										)
									)
								);
							}
						}
					);
				}
				const tooltips = Array.from(
					document.querySelectorAll(".tooltip")
				);
				for (let i in tooltips) {
					let tooltipBtn = tooltips[i].querySelector(".tooltip__btn");
					tooltipBtn.addEventListener("click", () => {
						tooltips[i].classList.toggle("active");
					});
				}
				break;
			case "contract_production_why":
				new Swiper(swiperList[i], {
					slidesPerView: 1,
					spaceBetween: 16,
					breakpoints: {
						576: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 4,
						},
					},
					navigation: {
						nextEl: ".contract_production_why_next",
						prevEl: ".contract_production_why_prev",
					},
				});
				break;
			case "gallery":
				window.swipers.gallery = new Swiper(swiperList[i], {
					effect: "fade",
					loop: true,
					allowTouchMove: false,
					on: {
						init: (s) => {
							const videoBtns = Array.from(
								s.el.querySelectorAll("[data-video-btn]")
							);
							videoBtns.map((btn) =>
								btn.addEventListener("click", ({ target }) => {
									target = getParentByNode(target, "BUTTON");
									target.classList.toggle("active");
									if (target.classList.contains("active")) {
										s.el.classList.toggle("active");
										s.el.classList.add("animate1");
										setTimeout(
											() =>
												s.el.classList.add("animate2"),
											150
										);
									} else {
										s.el.classList.remove("animate2");
										setTimeout(() => {
											s.el.classList.remove("animate1");
											setTimeout(
												() =>
													s.el.classList.toggle(
														"active"
													),
												150
											);
										}, 150);
									}
									setTimeout(
										() =>
											s.el.nextElementSibling.classList.toggle(
												"opacity"
											),
										150
									);
									document.body.classList.toggle("overflow");
									if (
										document.body.classList.contains(
											"overflow"
										)
									) {
										swiperList[
											i
										].parentNode.parentNode.classList.add(
											"fullscreen"
										);
									} else {
										setTimeout(
											() =>
												swiperList[
													i
												].parentNode.parentNode.classList.remove(
													"fullscreen"
												),
											700
										);
									}
								})
							);
						},
					},
				});
				break;
			case "gallery_thumb":
				new Swiper(swiperList[i], {
					breakpoints: {
						576: {
							direction: "vertical",
							spaceBetween: 16,
						},
					},
					slidesPerView: 4,
					spaceBetween: 8,
					navigation: {
						nextEl: ".gallery_thumb_next",
						prevEl: ".gallery_thumb_prev",
					},
					on: {
						init: (s) => {
							for (let i in s.slides) {
								if (i == 0) s.slides[i].classList.add("active");
								s.slides[i].addEventListener(
									"click",
									({ target }) => {
										if (
											!s.slides[i].classList.contains(
												"active"
											)
										) {
											window.swipers.gallery.slideTo(i);
											s.slideTo(i);
											const active = s.slides.find(
												(slide) =>
													slide.classList.contains(
														"active"
													)
											);
											active &&
												active.classList.remove(
													"active"
												);
											target = getParentByClassname(
												target,
												"swiper-slide"
											);
											target.classList.add("active");
										}
									}
								);
							}
						},
						slideChange: (s) =>
							window.swipers.gallery.slideTo(s.realIndex),
					},
				});
				break;
			case "product":
				window.swipers.contractProduction = new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
				});
				const productParamsNavs = Array.from(
					document.querySelectorAll("[data-product-step]")
				);
				for (let i in productParamsNavs) {
					productParamsNavs[i].addEventListener(
						"click",
						({ target }) => {
							target = getParentByNode(target, "BUTTON");
							if (!target.classList.contains("active")) {
								const active = document.querySelector(
									"[data-product-step].active"
								);
								active && active.classList.remove("active");
								target.classList.add("active");
								window.swipers.contractProduction.slideTo(
									parseInt(
										target.getAttribute("data-product-step")
									)
								);
							}
						}
					);
				}
				break;
			case "swiper_scroll":
				new Swiper(swiperList[i], {
					slidesPerView: "auto",
					freeMode: true,
					scrollbar: { el: ".swiper-scrollbar" },
					mousewheel: true,
				});
				break;
			case "similars":
				new Swiper(swiperList[i], {
					slidesPerView: 2,
					spaceBetween: 8,
					breakpoints: {
						576: {
							slidesPerView: 4,
							spaceBetween: 16,
						},
					},
					navigation: {
						nextEl: ".similars_next",
						prevEl: ".similars_prev",
					},
				});
				break;
			case "selectbox":
				window.swipers.selectbox = new Swiper(swiperList[i], {
					slidesPerView: 1,
					effect: "fade",
					fadeEffect: { crossFade: true },
					autoHeight: true,
				});
				break;
			case "certificates":
				const modalbox = getParentByClassname(
					swiperList[i],
					"modalbox"
				);
				const certificatesSteps = modalbox.querySelector(
					"[data-certificates-steps]"
				);
				const setCertificatesSteps = (s) => {
					if (certificatesSteps)
						certificatesSteps.innerHTML = `${s.realIndex + 1} / ${
							s.slides.length
						}`;
				};
				window.swipers.certificates = new Swiper(swiperList[i], {
					slidesPerView: 1.2,
					centeredSlides: true,
					navigation: {
						nextEl: ".certificates_next",
						prevEl: ".certificates_prev",
					},
					breakpoints: {
						576: {
							slidesPerView: 3,
						},
					},
					on: {
						init: (s) => setCertificatesSteps(s),
						slideChange: (s) => setCertificatesSteps(s),
					},
				});
				break;
		}
	}
	// Main page flask animation
	const flaskAnimation = document.querySelector("[data-animation-flask]");
	if (flaskAnimation) {
		new ScrollMagic.Scene({
			triggerElement: flaskAnimation,
			duration: 600,
		})
			.setTween(flaskAnimation, {
				rotate: 0,
			})
			.addTo(ScrollMagicController);
		new ScrollMagic.Scene({
			triggerElement: flaskAnimation,
			duration: 550,
		})
			.setTween("[data-animation-flask-fill]", {
				rotate: 0,
				height: "90%",
			})
			.addTo(ScrollMagicController);
	}
	// Main page bottle animation
	const bottleAnimation = document.querySelector("[data-animation-bottle]");
	if (bottleAnimation) {
		new ScrollMagic.Scene({
			triggerElement: bottleAnimation,
			offset: -350,
			duration: bottleAnimation.clientHeight,
		})
			.setTween(bottleAnimation, {
				rotate: 0,
			})
			.addTo(ScrollMagicController);
	}
	// About page big logo animation
	const bigLogoAnimation = document.querySelector(
		"[data-animation-big-logo]"
	);
	const bigLogoAnimationTriger = document.querySelector(
		"[data-animation-big-logo-triger]"
	);
	if (bigLogoAnimation) {
		new ScrollMagic.Scene({
			triggerElement: bigLogoAnimation.parentNode,
			duration: 2000,
			offset: 350,
		})
			.setTween(bigLogoAnimation, {
				bottom: bigLogoAnimationTriger.clientHeight * -2,
				opacity: 0,
			})
			.addTo(ScrollMagicController);
	}
	// About page small logo animation
	const smallLogoAnimation = document.querySelector(
		"[data-animation-small-logo]"
	);
	if (smallLogoAnimation) {
		new ScrollMagic.Scene({
			triggerElement: smallLogoAnimation.parentNode,
			duration: smallLogoAnimation.clientHeight,
		})
			.setTween(smallLogoAnimation, {
				rotate: 0,
			})
			.addTo(ScrollMagicController);
	}
	// AOS scroll animations
	const offset = window.innerWidth < 600 ? 60 : 120;
	AOS.init({
		disable: false,
		startEvent: "DOMContentLoaded",
		initClassName: "aos-init",
		animatedClassName: "aos-animate",
		useClassNames: false,
		disableMutationObserver: false,
		debounceDelay: 50,
		throttleDelay: 99,
		offset: offset,
		delay: 0,
		duration: 800,
		easing: "ease",
		once: true,
		mirror: false,
		anchorPlacement: "top-bottom",
	});
	document.addEventListener("aos:in", ({ detail }) => {
		const count = parseInt(detail.getAttribute("data-count"));
		if (count) {
			const parent = getParentByNode(detail, "LI");
			parent.style.width = `${parent.offsetWidth}px`;
			parent.style.height = `${parent.offsetHeight}px`;
			let step = parseInt(detail.getAttribute("data-step"));
			step = step ? step : 1;
			let i = 0;
			let interval = setInterval(() => {
				i += step;
				detail.innerHTML = i;
				if (i >= count) {
					detail.innerHTML = count;
					parent.removeAttribute("style");
					clearInterval(interval);
				}
			}, detail.getAttribute("data-speed"));
		}
	});
	// Scrollbars
	const scrollbars = Array.from(
		document.querySelectorAll("[data-scrollbar]")
	);
	for (let i in scrollbars) {
		new PerfectScrollbar(scrollbars[i], { wheelSpeed: 0.5 });
	}
	// Modals
	const modalBtns = Array.from(
		document.querySelectorAll("[data-modal-triger]")
	);
	let isModal = false;
	const toggleModal = (target) => {
		if (!isModal) {
			isModal = true;
			document.body.classList.toggle("noscroll");
			if (target.classList.contains("open")) {
				target.classList.remove("open");
				setTimeout(() => {
					target.classList.remove("active");
					isModal = false;
				}, 200);
			} else {
				target.classList.add("active");
				setTimeout(() => {
					target.classList.add("open");
					isModal = false;
				}, 200);
			}
		}
	};
	for (let i in modalBtns) {
		modalBtns[i].addEventListener("click", ({ target }) => {
			target = target.classList.contains("modalbox")
				? target
				: getParentByNode(target, "BUTTON");
			if (target) {
				const triger = target.classList.contains("modalbox")
					? target.getAttribute("data-modal-target")
					: target.getAttribute("data-modal-triger");
				target = document.querySelector(
					`[data-modal-target="${triger}"]`
				);
				if (target) toggleModal(target);
			}
		});
	}
	// Accordeons
	const accordionBtns = Array.from(
		document.querySelectorAll("[data-accordion]")
	);
	for (let i in accordionBtns) {
		accordionBtns[i].addEventListener("click", ({ target }) => {
			target = getParentByNode(target, "BUTTON");
			target.classList.toggle("active");
			if (target.classList.contains("active")) {
				target.nextElementSibling.style.maxHeight = `${target.nextElementSibling.scrollHeight}px`;
			} else {
				target.nextElementSibling.removeAttribute("style");
			}
		});
	}
	// Selectbox
	const selectBtns = Array.from(document.querySelectorAll("[data-select]"));
	for (let i in selectBtns) {
		selectBtns[i].addEventListener("click", ({ target }) => {
			target = getParentByNode(target, "BUTTON");
			if (!target.classList.contains("open")) {
				const active = document.querySelector("[data-select].open");
				if (active) {
					active.classList.remove("open");
					active.nextElementSibling.classList.remove("open");
				}
			}
			target.classList.toggle("open");
			target.nextElementSibling.classList.toggle("open");
		});
	}
	const optionBtns = Array.from(
		document.querySelectorAll("[data-select-value]")
	);
	for (let i in optionBtns) {
		optionBtns[i].addEventListener("click", ({ target }) => {
			target = getParentByNode(target, "BUTTON");
			const box = getParentByClassname(target, "hiddenbox");
			box.classList.remove("open");
			box.previousElementSibling.classList.remove("open");
			box.previousElementSibling.innerHTML = target.innerHTML;
			window.swipers.selectbox.slideTo(
				parseInt(target.getAttribute("data-select-value"))
			);
		});
	}
	// Datepicker
	const datePickers = Array.from(document.querySelectorAll("[datepicker]"));
	for (let i in datePickers) {
		datePickers[i].addEventListener("input", () => {
			datePickers[i].value = "";
		});
		datepicker(datePickers[i], {
			customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
			customMonths: [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь",
			],
			customOverlayMonths: [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь",
			],
			overlayButton: "Применить",
			overlayPlaceholder: "Изменить год ?",
			formatter: (input, date) => {
				input.value = date.toLocaleDateString();
			},
		});
	}
	// Show text
	const textBoxes = Array.from(document.querySelectorAll("[data-textbox]"));
	for (let i in textBoxes) {
		textBoxes[i].addEventListener("mouseover", ({ target }) => {
			target = getParentByNode(target, "LI");
			target = target.querySelector(".text");
			target.style.height = `100%`;
			target.style.paddingTop = `10px`;
		});
		textBoxes[i].addEventListener("mouseout", ({ target }) => {
			target = getParentByNode(target, "LI");
			target = target.querySelector(".text");
			target.style.height = "0";
			target.style.paddingTop = "0";
		});
	}
	// Gallery
	window.lightGalleryInstance = lightGallery(
		document.querySelector("[lightgallery]")
	);
	// Test
	const btn = document.querySelector("[data-test]");
	btn &&
		btn.addEventListener("click", ({ target }) => {
			const list = target.parentNode.previousElementSibling;
			list.innerHTML = list.innerHTML + list.innerHTML;
			window.lightGalleryInstance.refresh();
		});
	// Input masks
	const maskInputs = Array.from(document.querySelectorAll("[data-mask]"));
	const maskHandlers = {
		oncomplete: (e) => setState(e.currentTarget),
		onincomplete: (e) => setState(e.currentTarget),
	};
	for (let i in maskInputs) {
		const mask = maskInputs[i].getAttribute("data-mask");
		switch (mask) {
			case "phone":
				Inputmask({
					...maskHandlers,
					mask: "+7 (999) 999-99-99",
					clearIncomplete: true,
				}).mask(maskInputs[i]);
				break;
		}
	}
	// Forms
	const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
	const textareas = Array.from(document.querySelectorAll("textarea"));
	const fields = inputs.concat(textareas);
	const setState = (target) => {
		target.classList[validation.isNotEmpty(target) ? "add" : "remove"](
			"ready"
		);
		target.classList.remove("error");
	};
	for (let i in fields) {
		fields[i].addEventListener("input", ({ target }) => setState(target));
	}
	const formsValidate = Array.from(document.querySelectorAll("[validate]"));
	let testResponse = true;
	for (let i in formsValidate) {
		formsValidate[i].addEventListener("submit", (event) => {
			event.preventDefault();
			const validations = Array.from(
				formsValidate[i].querySelectorAll("[data-validate]")
			);
			let err = false;
			for (let e in validations) {
				const rule = validations[e].getAttribute("data-validate");
				let check = true;
				switch (rule) {
					case "text":
						check = validation.isNotEmpty(validations[e]);
						validations[e].classList[!check ? "add" : "remove"](
							"error"
						);
						if (!check) err = true;
						break;
					case "number":
						check = validation.isInt(validations[e]);
						validations[e].classList[!check ? "add" : "remove"](
							"error"
						);
						if (!check) err = true;
						break;
				}
			}
			if (!err) {
				const openModal = getParentByClassname(
					formsValidate[i],
					"modal"
				);
				openModal && toggleModal(openModal);
				setTimeout(() => {
					const modal = document.querySelector(
						`[data-modal-target="${
							testResponse ? "feedback_success" : "feedback_error"
						}"]`
					);
					modal && toggleModal(modal);
					testResponse = !testResponse;
				}, 200);
				event.preventDefault();
			} else {
				event.preventDefault();
			}
		});
	}
	// Search
	searchField.addEventListener("focusin", () => {
		searchForm.classList.add("active");
	});
	searchField.addEventListener("focusout", () => {
		searchForm.classList.remove("active");
	});
};

$(function () {
	if ($(".front-news").length) {
		let slideWrapper = $(".front-news__swiper .swiper-wrapper");
		$(".front-news__slide-column").each(function () {
			$(this)
				.find(".front-news__item")
				.each(function () {
					console.log(this);
					slideWrapper.append(
						`<div class="swiper-slide front-news__slide-mob"><div class="front-news__item br">${$(
							this
						).html()}</div></div>`
					);
				});
		});
		const swiper = new Swiper(".front-news__swiper", {
			slidesPerView: 2,
			spaceBetween: 16,

			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: "auto",
				},
			},
			navigation: {
				nextEl: $(".front-news__next")[0],
				prevEl: $(".front-news__prev")[0],
			},
		});
	}
});
