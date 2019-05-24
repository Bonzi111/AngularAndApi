import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { debug } from 'util';


@Component({
  selector: 'app-itemOrder',
  templateUrl: './item-order.component.html'
})

export class ItemOrderComponent {

  public ItemOrderModel = {
    CustomerId:0,
    ItemId:0,
    TotalAmount:0,
    ItemOrderQuantity:0
  }; 
  public customer: Customer[];
  public item: ItemDetails[];
  private _http: HttpClient;
  _baseUrl: string;
  ItemRateList: any;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {

    http.get<Customer[]>(apiUrl + 'values/GetCustomer').subscribe(result => {
      this.customer = result;
      console.log(this.customer);
    }, error => console.error(error));

    http.get<ItemDetails[]>(apiUrl + 'values/GetItemMaster').subscribe(result => {
      this.item = result;
      console.log(this.item);
    }, error => console.error(error));

    this._baseUrl = apiUrl;
    this._http = http;
    this.ItemOrderModel = {
      CustomerId:0,
      ItemId:0,
      TotalAmount:0,
      ItemOrderQuantity:0
    }
  }
  ngOnInit(): void {
    this._http.get<any>(this._baseUrl + 'values/GetItemRateList').subscribe(result => {
      this.ItemRateList = result;
      console.log(this.ItemRateList);
    }, error => console.error(error));
  }
  getPrice(itemID) {
    if (this.ItemOrderModel.ItemOrderQuantity == 0) {
      this.ItemOrderModel.TotalAmount = 0;
    }
    else {
      var result = this.ItemRateList[itemID];
      this.ItemOrderModel.TotalAmount = parseFloat((result * this.ItemOrderModel.ItemOrderQuantity).toFixed(2));
    }
  }
  save() {
    this._http.post<ItemOrdered>(this._baseUrl + 'values/SaveItemOrder', this.ItemOrderModel).subscribe(result => {
      alert("success");
    }, error => console.error(error));
  }
}

interface ItemOrdered {
  CustomerId: number,
  ItemId: number,
  TotalAmount: number,
  ItemOrderQuantity: number
}
interface ItemDetails {
  ItemName: string;
  CategoryID: number;
  ItemId: number;
}
interface Customer {
  CustomerEmail: string;
  CustomerName: string;
}
