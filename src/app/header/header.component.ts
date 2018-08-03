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
				this.searchResult = response;
			});
		});
	}
	Add(item) {
		this._myService.selectedSymbol = item.split(':')[1];
		console.log(this._myService.selectedSymbol);
		this.service.get_quote();
	}
}
