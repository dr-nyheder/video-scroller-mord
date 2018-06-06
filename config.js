let config = {
    local: {
        DEBUGGING:true,
        ASSETS_PATH:JSON.stringify('assets/'),
        SCROLL_IMAGE_PATH:JSON.stringify('http://localhost:8888/mobil-web/video-scroller-mord/grafik/images/')
    },
    staging: {
        DEBUGGING:true,
        ASSETS_PATH:JSON.stringify('https://www.dr.dk/tjenester/visuel/staging/video-scroller-mord/assets/'),
        SCROLL_IMAGE_PATH:JSON.stringify('https://downol.dr.dk/download/nyheder/2018/mord-scroller/images/')
    },
    deploy: {
        DEBUGGING:false,
        ASSETS_PATH:JSON.stringify('https://www.dr.dk/nyheder/htm/grafik/2018/video-scroller-mord/assets/'),
        SCROLL_IMAGE_PATH:JSON.stringify('https://downol.dr.dk/download/nyheder/2018/mord-scroller/images/')
    }
}
module.exports = config;