import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare const TradingView: any;
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: [ './chart.component.css' ]
})
export class ChartComponent  {
	symbol: string;
	constructor(public router: Router, private route: ActivatedRoute){
		this.router.routeReuseStrategy.shouldReuseRoute = function() {
			return false;
		};
	}

	ngAfterViewInit(){
		debugger;
		const symbol = this.route.snapshot.params['id'];
		//this.loadchart(symbol)
		new TradingView.widget({
            "width": 980,
            "height": 610,
            "symbol": "NSE:​TATASTEEL",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "Light",
            "style": "1",
            "locale": "in",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true
          
        });
		// new TradingView.widget({
		// 	"width": 980,
		// 	"height": 610,
		// 	"symbol": 'NSE:'+symbol,
		// 	"interval": "D",
		// 	"timezone": "Etc/UTC",
		// 	"theme": "Light",
		// 	"style": "1",
		// 	"locale": "en",
		// 	"toolbar_bg": "#f1f3f6",
		// 	"enable_publishing": false,
		// 	"allow_symbol_change": true,
		// 	"hideideas": true
		//   });
	}

	
	loadchart(symbol) {
		new TradingView.widget({
			container_id: 'technical-analysis',
			width: 1000,
			height: 610,
			symbol: 'NSE:' + symbol,
			timezone: 'Asia/Kolkata',
			has_intraday: true,
			supported_resolutions: [ '1', '3', '5', '15', '30', '60', '120', '240', 'D' ],
			theme: 'Light',
			interval: '60',
			style: '1',
			hide_side_toolbar: false,
			allow_symbol_change: false,
			save_image: false,
			hideideas: true
		});
	}
}
