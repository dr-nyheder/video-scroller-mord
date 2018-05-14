import {create, select, normalize, clamp, easeOutIn} from '../../utils/trix-utils';
import ScrollDevices from './scrolldevices';

import ScrollMagic from 'scrollmagic';

export default class ScrollControl{
	constructor(){
	}
	setupScroll(video, scenes){
		this.video = video;
		this.scenes = scenes;
		this.videoBreakpoint = 500,

		this.savedWidth = window.innerWidth;

		let oContainer = select('#outerContainer');
		const sContainer = select('#videoScrollContainer');
		window.addEventListener('resize', this.checkSizeChange.bind(this));
		//this.checkSizeChange();

		const controller = new ScrollMagic.Controller({
			container: oContainer,
			refreshInterval: 0
		});

		let scrollrate = ScrollDevices.scrollrate();
		this.scrollduration = this.video.setup.videoDuration * scrollrate;

		for (let i = 0, l = scenes.length; i < l; i++) {

			let element = scenes[i];
			element.style.display = 'block';
			let sceneTime = parseFloat(element.dataset.time) * scrollrate
			let sceneDuration = parseFloat(element.dataset.duration) * scrollrate;
			let sceneStart = sceneTime - ( sceneDuration / 2 );
			// console.log(sceneTime, sceneDuration, sceneStart);
			//let sceneEnd = sceneTime + ( sceneDuration / 2 );

			let sc = new ScrollMagic.Scene({
				duration: sceneDuration,
				offset: sceneStart,

			})
			.on('progress', (e) => {
/*				console.log(e.scrollDirection);
				if(e.scrollDirectio == "REVERSE"){
					e.preventDefault();
				}
*/				animateText(e, element);

			})
			.addTo(controller);
		}

		let animateText = (e, el)=>{
			let maxMove = 24;
			let fadeInStop = 0.2;
			let fadeOutStart = 0.8;
			let opacity = 1;

			if(this.video.setup.videoSize == 'small') maxMove = 40;
			if(el.classList.contains('header-scene')){
				maxMove = 18;
				fadeInStop = 0;
			};

			let position = easeOutIn(e.progress, 0, maxMove, 1);

			if(e.progress<fadeInStop) opacity = normalize(e.progress, 0, fadeInStop);
			if(e.progress>fadeOutStart) opacity = normalize(e.progress, 1, fadeOutStart);
			
			el.style.transform = 'translateY('+-position+'vw)';
			el.style.opacity = opacity.toFixed(3);

		}

/*		let endScene = new ScrollMagic.Scene({
			duration: window.innerHeight * 0.75,
			offset: this.scrollduration
		}).addTo(controller);
*/
		let counter = new ScrollMagic.Scene({
			duration: this.scrollduration
		}).addTo(controller);

		counter.on("update", (ev) => {
			this.setTime(ev.scrollPos);
		});

		let indicator = create('div', sContainer);
		indicator.style.position = 'absolute';
		indicator.style.height = (window.innerHeight * 0.5) + 'px';
		indicator.style.width = '10px';
		indicator.style.right = '0%';
		indicator.style.top = this.scrollduration + (window.innerHeight * 0.5) + 'px';

	}
	setTime(pos) {
		if (isNaN(pos)) pos = 0;
		let norm = normalize(pos, 0, this.scrollduration);
		let scrollTime = (this.video.setup.frameCount * norm);
		this.video.setVideoTime(scrollTime);

	}
	checkSizeChange() {
		console.log('size change');

		let newWidth = window.innerWidth;
		if (newWidth > this.savedWidth && newWidth > this.videoBreakpoint && this.video.setup.videoSize === 'small') {
			console.log('go large');
			this.video.setup.videoSize = 'large';
			this.video.loadImages();
		} else if (newWidth < this.savedWidth && newWidth < this.videoBreakpoint && this.video.setup.videoSize === 'large') {
			console.log('go small');
			this.video.setup.videoSize = 'small';
			this.video.loadImages();
		}
		this.savedWidth = newWidth;
	}

}