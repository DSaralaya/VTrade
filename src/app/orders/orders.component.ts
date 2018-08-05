import { Component, OnInit } from '@angular/core';
import { AppService } from '../AppService';
import { SharedService } from '../service/shared.service';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogBuySellComponent } from '../dialog-buy-sell/dialog-buy-sell.component';
@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: [ './orders.component.css' ]
})
export class OrdersComponent implements OnInit {
	constructor(public appService: AppService, private shared: SharedService, public dialog: MatDialog) {}

	ngOnInit() {
		interval(10000).subscribe((x) => {
			this.appService.order_quote();
		});
	}

	modify(stock) {
		let dialogRef = this.dialog.open(DialogBuySellComponent, {
			width: '600px',
			data: stock
		});
	}
}
