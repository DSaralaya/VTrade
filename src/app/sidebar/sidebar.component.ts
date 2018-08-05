import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { SharedService } from '../service/shared.service';
import { MatDialog } from '@angular/material';
import { DialogBuySellComponent } from '../dialog-buy-sell/dialog-buy-sell.component';
import { Observable, interval } from '../../../node_modules/rxjs';
import { AppService } from '../AppService';

@Component({
	providers: [ ChartComponent ],
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {
	items = [ { label: 'Buy' }, { label: 'Sell' } ];
	constructor(public appService: AppService, public _myService: SharedService, private chart: ChartComponent, public dialog: MatDialog) {}

	ngOnInit() {
		interval(30000).subscribe((x) => {
			this.appService.watchlist_quote();
		});
	}

	selectSymbol(item) {
		//this.chart.loadchart(item['CompanyKey']);
	}
	remove(index) {
		console.log(index);
		this._myService.Stocks.splice(index, 1);
	}

	onClick(action, stock) {
		stock.Action = action;
		stock.LimitPrice = stock.LastTradedPrice;
		stock.LTP = stock.LastTradedPrice;
		let dialogRef = this.dialog.open(DialogBuySellComponent, {
			width: '600px',
			data: stock
		});
	}
}
