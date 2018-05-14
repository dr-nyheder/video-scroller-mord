require('../styles/styles.scss');
import DomGenerator from './components/videoscroll/domgenerator';
import Audio from './components/videoscroll/audio';
import ImageVideo from './components/videoscroll/imagevideo';
import ScrollControl from './components/videoscroll/scrollcontrol';
import Configs from './components/videoscroll/configs';
import {create, select} from './utils/trix-utils';
import ScrollMagic from 'scrollmagic';

let oContainer,
    audio,
    vid,
    videoBreakpoint = 500,
    videoSize = 'small',
    videoSetup;

const config = Configs.content();

function init() {

    console.log('INIT CALLED');

    const contentName = oContainer.dataset.contentname;
    //const au = new Audio();
    const scroller = new ScrollControl();

    const dg = new DomGenerator();

    dg.build(config[contentName].file, function(scenes) {
        scroller.setupScroll(vid, scenes);
        //au.initAudio();
    });

}
function getVideo() {
    oContainer = select('#outerContainer');
    const minister = oContainer.dataset.contentname;

    videoSetup = {
        frameCount : parseInt(config[minister].frameCount),
        frameRate : parseInt(config[minister].frameRate),
        pathNames : config[minister].pathNames
    }
    videoSetup.videoDuration = videoSetup.frameCount / videoSetup.frameRate;

    if (window.innerWidth > videoBreakpoint) {
        videoSetup.videoSize = 'large';
    } else {
        videoSetup.videoSize = 'small';
    }

    vid = new ImageVideo(videoSetup);
    vid.loadImages(onImageLoad);
    //vid.events.addEventListener('imagesloaded', onImageLoad);

}
function onImageLoad() {
    console.log('image load')
    init();
}
function ready(){
    console.log('ready');
     setTimeout(function() {
        getVideo();
    }, 10)
}   

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}