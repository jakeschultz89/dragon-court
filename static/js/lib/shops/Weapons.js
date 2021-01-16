class Weapons {
	name = 'Ye Aulde Smithery';
	blurb = '';
	region = 'town';
	
	constructor(){
		this.blurb = DC.Shop.generateBlurb('weapons');
	}
	
	build(){
		var data = {
			'type': 'weapons',
			'transactions': true,
			'identifyBtn': true,
			'polishBtn': false,
			'infoBtn': false,
			'items': true,
			'title': this.name,
			'blurb': this.blurb,
			'region': this.region
		};
		
		Socket.emit('shop-init', data);
	}
}