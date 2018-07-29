import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { SharedService } from '../service/shared.service';
import { MatDialog } from '@angular/material';
import { DialogBuySellComponent } from '../dialog-buy-sell/dialog-buy-sell.component';

@Component({
	providers: [ ChartComponent ],
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent {
	items = [ { label: 'Buy' }, { label: 'Sell' } ];
	constructor(public _myService: SharedService, private chart: ChartComponent, public dialog: MatDialog) {}

	selectSymbol(item) {
		this.chart.loadchart(item.split(':')[1]);
	}

	onClick(action, stock) {
		let dialogRef = this.dialog.open(DialogBuySellComponent, {
			width: '600px',
			data: { action: action, stockName: stock.split(':')[0], stockCode: stock.split(':')[1] }
		});
	}
}
