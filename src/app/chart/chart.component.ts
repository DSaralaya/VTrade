import { Component, OnInit } from '@angular/core';

declare const TradingView: any;
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: [ './chart.component.css' ]
})
export class ChartComponent {
	symbol: string;
	loadchart(symbol) {
		new TradingView.widget({
			container_id: 'technical-analysis',
			width: 1000,
			height: 610,
			symbol: 'NSE:' + symbol,
			timezone: 'Asia/Kolkata',
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
