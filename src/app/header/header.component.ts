import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../AppService';
import { SharedService } from '../service/shared.service';
import 'rxjs/add/operator/debounceTime';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {
	searchTerm: FormControl = new FormControl();
	Stocks = [];
	searchResult = [];
	constructor(private service: AppService, private _myService: SharedService) {
		this.searchTerm.valueChanges.debounceTime(400).subscribe((data) => {
			this.service.search_word(data).subscribe((response) => {
				this.searchResult = this.remove_duplicates(response);
			});
		});
	}
	Add(item) {
		this._myService.selectedSymbol = item.split(':')[1];
		var filter = this._myService.Stocks.filter(function(t) {
			return t['CompanyKey'] === item.split(':')[1];
		});

		if (filter.length == 0) {
			this.service.get_quote();
		} else {
			alert('Data Already added');
		}
	}
	remove_duplicates(arr) {
		let obj = {};
		for (let i = 0; i < arr.length; i++) {
			obj[arr[i]] = true;
		}
		arr = [];
		for (let key in obj) {
			arr.push(key);
		}
		return arr;
	}
}
