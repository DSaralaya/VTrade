import { Component, Inject } from '@angular/core';
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
	constructor(public dialogRef: MatDialogRef<SidebarComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private shared: SharedService) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	buyClick(): void {
		this.shared.orderBook.push(this.data);
		this.dialogRef.close();
	}
}
