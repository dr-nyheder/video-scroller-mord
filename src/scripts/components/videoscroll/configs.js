export default class Configs{
	contructor(){

	}
	static content(){
		return {
			'Merkel': {
				frameCount: 690,
				frameRate: 15,
				file: 'merkel.json',
				pathNames:{
					mobilePath:'merkel-mobil/',
					mobileFileName:'merkel-mobil-00000',
					desktopPath:'merkel-desktop/',
					desktopFileName:'merkel-desktop-00000'
				}
			}
		}
	}
}