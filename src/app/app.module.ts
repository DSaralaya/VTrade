import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatListModule, MatCardModule, MatTableModule, MatToolbarModule, MatDialogModule, MatButtonModule, MatRadioModule, MatTabsModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { AppService } from './AppService';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { ChartComponent } from './chart/chart.component';
import { ShContextMenuModule } from 'ng2-right-click-menu';
import { DialogBuySellComponent } from './dialog-buy-sell/dialog-buy-sell.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';

const appRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'chart/:id',
		component: ChartComponent
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];
@NgModule({
	declarations: [ AppComponent, SidebarComponent, HeaderComponent, OrderbookComponent, ChartComponent, DialogBuySellComponent, HomeComponent, OrdersComponent ],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatCardModule,
		MatTableModule,
		MatToolbarModule,
		MatDialogModule,
		MatButtonModule,
		MatTabsModule,
		ShContextMenuModule,
		MatRadioModule
	],
	providers: [ AppService ],
	bootstrap: [ AppComponent ],
	entryComponents: [ DialogBuySellComponent ]
})
export class AppModule {}
