document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

	const svgWrapper = document.querySelector(".svg-wrapper");
	const quotesWrapper = document.querySelector(".quotes-wrapper");

	let mainTl = gsap.timeline({
		paused: true,
	});

	// Add animations and line drawings to the GSAP timeline
	mainTl
		.add(quotesAnimation())
		.add(animation1(), ">")
		.call(lineDraw1, [], "<")
		.add(animation2(), "<")
		.call(lineDraw2, [], "<");

	// Create scroll trigger for the timeline
	createScrollTrigger(svgWrapper, mainTl);
});

// Function to create ScrollTrigger
const createScrollTrigger = (trigger, timeline) => {
	ScrollTrigger.create({
		trigger: trigger,
		start: "top 50%",
		markers: true,
		onEnter: () => {
			timeline.play();
			console.log("onEnter");
		},
		onEnterBack: () => {
			timeline.reverse();
			console.log("onEnterBack");
		},
		onLeaveBack: () => {
			timeline.pause(0);
			console.log("onLeaveBack");
		},
	});
};

const quotesAnimation = () => {
	const quoteOne = document.querySelector(".quote-one");
	const quoteTwo = document.querySelector(".quote-two");
	const splitOne = new SplitType(quoteOne, {
		type: "lines, words, chars",
	});
	const splitTwo = new SplitType(quoteTwo, {
		type: "lines, words, chars",
	});
	// Select individual quotes

	// Create a GSAP timeline
	let tl = gsap.timeline({});

	// Animate characters for the first quote
	tl.from(splitOne.chars, {
		opacity: 0.1,
		yPercent: -100,
		skewX: -10,
		duration: 0.5,
		ease: "expo.out",
		stagger: { each: 0.025 },
	});

	// Add animation for the second quote after the first one
	tl.from(
		splitTwo.chars,
		{
			opacity: 0.1,
			yPercent: -100,
			skewX: -10,
			duration: 0.5,
			ease: "expo.out",
			stagger: { each: 0.025 },
		},
		"<"
	);

	return tl;
};

// Circle animation 1
const animation1 = () => {
	const circleOne = document.querySelector(".circleOne");
	const pathOne = document.querySelector(".pathOne");
	let tl = gsap.timeline({
		defaults: { duration: 1, ease: "sine.inOut" },
	});
	tl.from(circleOne, {
		motionPath: {
			path: pathOne,
			align: pathOne,
			autoRotate: true,
			alignOrigin: [0.5, 0.5],
		},
	});

	return tl;
};

const lineDraw1 = () => {
	const pathOne = document.querySelector(".pathOne");
	const pathLength = pathOne.getTotalLength();
	const reversedStart = -pathLength;

	pathOne.style.strokeDasharray = pathLength;
	pathOne.style.strokeDashoffset = 0;
	anime({
		targets: pathOne,
		strokeDashoffset: [reversedStart, 0],
		easing: "easeInOutSine",
		duration: 1000,
	});
};

// Circle animation 2
const animation2 = () => {
	const pathTwo = document.querySelector(".pathTwo");
	const circleTwo = document.querySelector(".circleTwo");
	let tl = gsap.timeline({
		defaults: { duration: 1, ease: "sine.inOut" },
	});
	tl.to(circleTwo, {
		motionPath: {
			path: pathTwo,
			align: pathTwo,
			autoRotate: true,
			alignOrigin: [0.5, 0.5],
		},
	});

	return tl;
};

// Line draw for pathTwo using anime.js
const lineDraw2 = () => {
	const pathTwo = document.querySelector(".pathTwo");
	anime({
		targets: pathTwo,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: "easeInOutSine",
		duration: 1000,
		direction: "normal",
	});
};
