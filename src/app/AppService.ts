import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Window } from '../../node_modules/@types/selenium-webdriver';

@Injectable()
export class AppService {
	url: string;
	constructor(private http: Http) {
		this.url = 'https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=';
	}

	search_word(term) {
		return this.http.get(this.url + term).map((res) => {
			var result = JSON.parse(res['_body']).items;
			return result.map((item) => {
				return item.name + ':' + item.symbol.split('.')[0];
			});
		});
	}
}
