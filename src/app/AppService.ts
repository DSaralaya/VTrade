import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SharedService } from 'src/app/service/shared.service';

@Injectable()
export class AppService {
	url: string;
	constructor(private http: Http, public _myService: SharedService) {
		this.url = 'http://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=';
	}

	// search_word(term) {
	// 	if (term != '') {
	// 		return this.http.get(this.url + term).map((res) => {
	// 			var result = JSON.parse(res['_body']).items;
	// 			return result.map((item) => {
	// 				return item.name + ':' + item.symbol.split('.')[0];
	// 			});
	// 		});
	// 	}
	// }
	search_word(term) {
		
		if (term != '') {
			return this.http.get('/assets/data.json').map((res: any) => {
				debugger;
				var result = JSON.parse(res['_body']);
				var array = Object.keys(result).map(function (key) {
					return { value: key, code: result[key] };
				});
				var filter = array.filter(function (t) {
					return t.value.toLowerCase().startsWith(term.toLowerCase());
				});
				return filter.map((item) => {
					return item['code'] + ':' + item['value'];
				});
			});
		}
	}


	get_quote() {
		this.http.get('https://money.rediff.com/money1/currentstatus.php?companycode=' + this._myService.selectedSymbol).subscribe((res) => {
			var result = JSON.parse(res['_body']);
			if (result) {
				var obj = {};
				obj['CompanyKey'] = this._myService.selectedSymbol;
				this._myService.Stocks.push(this.AssginQuotes(obj, result));
				console.log(this._myService.Stocks);
			}
		});
	}

	watchlist_quote() {
		var lst = '';
		if (this._myService.Stocks.length > 0) {
			for (let item of this._myService.Stocks) {
				lst += '|' + item.CompanyKey;
			}
			this.http.get('http://portfolio.rediff.com/company-status?company-list=' + lst).subscribe((res) => {
				var result = JSON.parse(res['_body'])[1];
				for (let item of this._myService.Stocks) {
					var fil = result.filter(function(t) {
						return t['CompanyKey'] == item.CompanyKey;
					});
					if (fil.length > 0) {
						item = this.AssginQuotes(item, fil[0]);
					}
				}
				localStorage.setItem('stockList', JSON.stringify(this._myService.Stocks));
			});
		}
	}

	orderbook_quote() {
		var lst = '';
		var count = 0;
		if (this._myService.orderBook.length > 0) {
			for (let item of this._myService.orderBook) {
				lst += '|' + item.CompanyKey;
			}
			this.http.get('http://portfolio.rediff.com/company-status?company-list=' + lst).subscribe((res) => {
				var result = JSON.parse(res['_body'])[1];
				for (let item of this._myService.orderBook) {
					var fil = result.filter(function(t) {
						return t['CompanyKey'] == item.CompanyKey;
					});
					if (fil.length > 0) {
						item = this.AssginQuotes(item, fil[0]);
					}
					if (!isNaN(parseFloat(item['Target'])) && item['Action']=='Buy' && !isNaN(parseFloat(item['LastTradedPrice'])) && (parseFloat(item['Target']) <= parseFloat(item['LastTradedPrice']) || parseFloat(item['Stoploss']) >= parseFloat(item['LastTradedPrice']))) {
						item['LTP'] = fil[0]['LastTradedPrice'].replace(',','');
						this._myService.exitedBook.push(item);
						this._myService.orderBook.splice(count, 1);
						localStorage.setItem('exitedBook', JSON.stringify(this._myService.exitedBook));
					} else if (!isNaN(parseFloat(item['Target'])) && item['Action']=='Sell' && !isNaN(parseFloat(item['LastTradedPrice'])) && (parseFloat(item['Target']) >= parseFloat(item['LastTradedPrice']) || parseFloat(item['Stoploss']) <= parseFloat(item['LastTradedPrice']))) {
						item['LTP'] = fil[0]['LastTradedPrice'].replace(',','');
						this._myService.exitedBook.push(item);
						this._myService.orderBook.splice(count, 1);
						localStorage.setItem('exitedBook', JSON.stringify(this._myService.exitedBook));
					}
					count++;
				}
				localStorage.setItem('orderBook', JSON.stringify(this._myService.orderBook));
			});
		}
	}

	order_quote() {
		var lst = '';
		var count = 0;
		if (this._myService.limitBook.length > 0) {
			for (let item of this._myService.limitBook) {
				lst += '|' + item.CompanyKey;
			}
			this.http.get('http://portfolio.rediff.com/company-status?company-list=' + lst).subscribe((res) => {
				var result = JSON.parse(res['_body'])[1];

				for (let item of this._myService.limitBook) {
					var fil = result.filter(function(t) {
						return t['CompanyKey'] == item.CompanyKey;
					});
					if (fil.length > 0) {
						item = this.AssginQuotes(item, fil[0]);
					}
					if (parseFloat(item['LimitPrice']) == parseFloat(item['LastTradedPrice']) || (item.Action == 'Buy' && parseFloat(item['LimitPrice']) > parseFloat(item['LastTradedPrice'])) || (item.Action == 'Sell' && parseFloat(item['LimitPrice']) < parseFloat(item['LastTradedPrice']))) {
						item['LTP'] = fil[0]['LastTradedPrice'].replace(',','');;
						var ress=this._myService.orderBook.filter(function(t){
                            return t['CompanyKey']==item['CompanyKey'];
						});
						//average price
						if(ress.length>0){
							item['Quantity'] =(parseInt(item['Quantity'])+ parseInt(ress[0]['Quantity']));
							item['LimitPrice'] =(((parseFloat(item['LimitPrice'])+ parseFloat(fil[0]['LastTradedPrice'].replace(',',''))))/2).toFixed(2);
							item['LTP'] =(((parseFloat(item['LimitPrice'])+ parseFloat(fil[0]['LastTradedPrice'].replace(',',''))))/2).toFixed(2);
						}
						this._myService.orderBook.push(item);
						this._myService.limitBook.splice(count, 1);
						localStorage.setItem('orderBook', JSON.stringify(this._myService.orderBook));
					}
					count++;
				}
				localStorage.setItem('limitBook', JSON.stringify(this._myService.limitBook));
			});
		}
	}

	private AssginQuotes(item, arry) {
		item['LastTradedPrice'] = arry['LastTradedPrice'].replace(',','');
		item['Volume'] = arry['Volume'].replace(',','');;
		item['PercentageDiff'] = arry['PercentageDiff'];
		item['FiftyTwoWeekHigh'] = arry['FiftyTwoWeekLow'].replace(',','');
		item['FiftyTwoWeekHigh'] = arry['FiftyTwoWeekHigh'].replace(',','');
		item['LastTradedTime'] = arry['LastTradedTime'];
		item['PrevClose'] = arry['PrevClose'];
		item['High'] = arry['High'].replace(',','');
		item['Low'] = arry['Low'].replace(',','');
		item['Change'] = arry['Change'];
		return item;
	}
}
