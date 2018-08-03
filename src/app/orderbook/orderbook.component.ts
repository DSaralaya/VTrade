import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { interval } from 'rxjs';
import { AppService } from '../AppService';

@Component({
	selector: 'app-orderbook',
	templateUrl: './orderbook.component.html',
	styleUrls: [ './orderbook.component.css' ]
})
export class OrderbookComponent  implements OnInit  {
	total:any;
	exttotal:any;
	constructor(public appService:AppService,private shared: SharedService) {}

	ngOnInit(){
		interval(30000).subscribe(x => {
		this.appService.orderbook_quote();
		setTimeout(() => {
			this.gettotal();
		}, 400);
	  });
	  this.gettotal();
	}
	gettotal(){
		this.total=0;
		this.shared.orderBook.forEach(element => {
			this.total +=parseFloat(this.getpl(element.Quantity,element.LastTradedPrice,element.LTP));
		});

	}
	extgettotal(){
		this.exttotal=0;
		this.shared.exitedBook.forEach(element => {
			this.exttotal +=parseFloat(this.getpl(element.Quantity,element.LastTradedPrice,element.LTP));
		});

	}

	getpl(quantity,num1, num2) {
		var numm= (parseFloat(num1) - parseFloat(num2)).toFixed(2);
		return (parseInt(quantity)*(parseFloat(numm))).toFixed(2);
	}
	exit(index){
		this.shared.exitedBook.push(this.shared.orderBook[index]);
		this.shared.orderBook.splice(index, 1);
		this.gettotal();
		this.extgettotal();
		localStorage.setItem("exitedBook", JSON.stringify(this.shared.exitedBook));
		localStorage.setItem("orderBook", JSON.stringify(this.shared.orderBook));
	}

	clear(index){
		this.shared.exitedBook.splice(index, 1);
		this.extgettotal();
		localStorage.setItem("exitedBook", JSON.stringify(this.shared.exitedBook));
	}
}
