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

	search_word(term) {
		return this.http.get(this.url + term).map((res) => {
			var result = JSON.parse(res['_body']).items;
			return result.map((item) => {
				return item.name + ':' + item.symbol.split('.')[0];
			});
		});
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

	multi_quote() {
		var lst = '';
		for (let item of this._myService.Stocks) {
			lst += '|' + item.CompanyKey;
		}
		lst = lst.substring(1);
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
		});
	}

	private AssginQuotes(item, arry) {
		item['LastTradedPrice'] = arry['LastTradedPrice'];
		item['Volume'] = arry['Volume'];
		item['PercentageDiff'] = arry['PercentageDiff'];
		item['FiftyTwoWeekHigh'] = arry['FiftyTwoWeekLow'];
		item['FiftyTwoWeekHigh'] = arry['FiftyTwoWeekHigh'];
		item['LastTradedTime'] = arry['LastTradedTime'];
		item['PrevClose'] = arry['PrevClose'];
		item['High'] = arry['High'];
		item['High'] = arry['High'];
		item['Change'] = arry['Change'];
		return item;
	}
}
