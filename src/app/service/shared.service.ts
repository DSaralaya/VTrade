import { Injectable } from '@angular/core';

interface Stocks {
	LastTradedPrice: string;
	CompanyKey: string;
	Volume: string;
	PercentageDiff: string;
	FiftyTwoWeekHigh: string;
	FiftyTwoWeekLow: string;
	LastTradedTime: string;
	ChangePercent: string;
	Change: string;
	MarketCap: string;
	High: string;
	Low: string;
	PrevClose: string;
	Action?: string;
	LimitPrice?: string;
	LTP?: string;
}

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	Stocks: Stocks[] = [
		{
			CompanyKey: 'ASHOKLEY',
			LastTradedPrice: '120.05',
			Volume: '2,905,256',
			PercentageDiff: '1.09',
			FiftyTwoWeekHigh: '167.50',
			FiftyTwoWeekLow: '98.80',
			LastTradedTime: '02 Aug,15:52:14',
			ChangePercent: '1.09',
			Change: '1.30',
			MarketCap: '35,238.28',
			High: '121.20',
			Low: '116.40',
			PrevClose: '118.75'
		},
		{
			CompanyKey: 'TATASTEEL',
			LastTradedPrice: '260.95',
			Volume: '1,001,648',
			PercentageDiff: '-1.51',
			FiftyTwoWeekHigh: '483.00',
			FiftyTwoWeekLow: '266.00',
			LastTradedTime: '02 Aug,15:59:25',
			ChangePercent: '-1.51',
			Change: '-4.00',
			MarketCap: '75,344.09',
			High: '266.10',
			Low: '258.90',
			PrevClose: '264.95'
		}
	];
	selectedSymbol = '';
	orderBook = [];
	constructor() {}
}
