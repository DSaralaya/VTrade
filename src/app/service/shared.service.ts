import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	Stocks = [ 'TATASTEEL:TATASTEEL', 'ASHOK LEYLAND:ASHOKLEY' ];
	selectedSymbol = '';
	orderBook = [];
	constructor() {}
}
