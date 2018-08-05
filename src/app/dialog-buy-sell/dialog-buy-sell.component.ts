import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SharedService } from '../service/shared.service';

export interface DialogData {
	stockName: string;
	stockCode: string;
	action: string;
	tradeType: string;
	quantity: number;
	price: number;
	triggerPrice: number;
	currentPrice: number;
}
@Component({
	selector: 'app-dialog-buy-sell',
	templateUrl: './dialog-buy-sell.component.html',
	styleUrls: [ './dialog-buy-sell.component.css' ]
})
export class DialogBuySellComponent {
	tradeTypes = [ 'MIS', 'CNC' ];
	tradeOption = [ 'BO', 'CO' ];
	order: any = {};
	constructor(private _myService: SharedService, public dialogRef: MatDialogRef<SidebarComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private shared: SharedService) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
	buyClick(): void {
		if (this.data['LimitPrice'] == this.data['LastTradedPrice']) {
			this.shared.orderBook.push(this.data);
		} else {
			var data = this.data;
			var fil = this.shared.limitBook.filter(function(t) {
				return t['CompanyKey'] == data['CompanyKey'];
			});
			if (fil.length == 0) {
				this.shared.limitBook.push(this.data);
			} else {
				fil[0] = this.data;
				localStorage.setItem('limitBook', JSON.stringify(this._myService.limitBook));
			}
		}
		this.dialogRef.close();
	}
}
