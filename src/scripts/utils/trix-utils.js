function create (type, parent, classname){
    // Genbruges til at bygge elementer i DOM strukturen
    var el = document.createElement(type);
    if(classname != undefined){
        if(classname.constructor === Array){
            classname.forEach(function(item){
                el.classList.add(item);
            })
        }else if (classname.constructor === String){
            el.classList.add(classname);
        }
    }
    if(parent){
        parent.appendChild(el);
    }
    return el;
}
function select (s, e = document){
    // Shortcut to select dom elements
    return e.querySelector(s);
}
function selectAll (s, e = document){
    // Shortcut to select dom elements
    return e.querySelectorAll(s);
}
function linearInterpolate(norm, min, max){
    return (max - min) * norm + min;
}
function normalize(value, min, max){
    return (value - min) / (max - min);
}
function clamp (value, min, max){
    if(value > max) value = max;
    if(value < min) value = min;
    return value;
}

function fetchFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = httpRequest.responseText;
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function isTouchSupported() {
    let msTouchEnabled = window.navigator.msMaxTouchPoints;
    let generalTouchEnabled = "ontouchstart" in document.createElement("div");
    if (msTouchEnabled || generalTouchEnabled) {
        //console.log('touch supported');
        return true;
    }
    return false;
}
function prepath(){
    return '';
}

function isIE(){
    if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))
    {
        return true;
    }
    return false;
}

function addThousandsSeperators(x) {
        var parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
    let easeInOutSine = (t, b, c, d) =>{
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
let easeOutIn = (t, b, c, d) =>{
    if ((t /= d/2)<1) return c/2 * (Math.sin(Math.PI*t/2) ) + b;
    return -c/2 * (Math.cos(Math.PI*--t/2)-2) + b;      
}
let easeInSine =(t, b, c, d) =>{
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
let easeOutSine =(t, b, c, d) =>{
    return c * Math.sin(t/d * (Math.PI/2)) + b;
}

let assetPath = 'assets/data/';
let iconPath = 'assets/images/';
// let assetPath = '//www.dr.dk/tjenester/visuel/staging/angela-merkel-scroller/assets/';
// let assetPath = '//www.dr.dk/nyheder/htm/grafik/2017/angela-merkel-scroller/assets/';

// let imagePath = 'assets/images/';
// let imagePath = 'http://localhost:8888/mobil-web/video-scroller-mord/grafik/images/';
let imagePath = 'https://downol.dr.dk/download/nyheder/2018/mord-scroller/images/';

export {assetPath, imagePath, iconPath, create, select, selectAll, linearInterpolate, normalize, clamp, fetchFile, isTouchSupported, prepath, isIE, addThousandsSeperators, easeInOutSine, easeOutIn, easeInSine, easeOutSine  }