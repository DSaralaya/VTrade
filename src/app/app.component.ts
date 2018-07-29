import { Component } from '@angular/core';
import { AppService } from './AppService';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { SharedService } from './service/shared.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	constructor(public _myService: SharedService) {}
}
