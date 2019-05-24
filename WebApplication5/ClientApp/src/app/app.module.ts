import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { ItemInventoryComponent } from './item-inventory/item-inventory.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemOrderComponent } from './item-order/item-order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ItemMasterComponent,
    ItemInventoryComponent,
    CustomerComponent,
    ItemOrderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'item-master', component: ItemMasterComponent },
      { path: 'item-inventory', component: ItemInventoryComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'item-order', component: ItemOrderComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
