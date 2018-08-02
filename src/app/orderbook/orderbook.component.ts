import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'app-orderbook',
	templateUrl: './orderbook.component.html',
	styleUrls: [ './orderbook.component.css' ]
})
export class OrderbookComponent {
	constructor(private shared: SharedService) {}

	getpl(num1, num2) {
		return parseFloat(num1) - parseFloat(num2);
	}
}
