import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-itemInventory',
  templateUrl: './item-inventory.component.html'
})

export class ItemInventoryComponent {
  public ItemModel = {
    ItemId: "",
    ItemRate: "",
    ItemQuantity:""
  };
  public item: ItemDetails[];
  private _http: HttpClient;
  _baseUrl: string;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<ItemDetails[]>(apiUrl + 'values/GetItemMaster').subscribe(result => {
      this.item = result;
      console.log(this.item);
    }, error => console.error(error));

    this._baseUrl = apiUrl;
    this._http = http;
    this.ItemModel = {
      ItemId: "",
      ItemRate: "",
      ItemQuantity: ""
    }
  }

  Save() {
    this._http.post<ItemInventory>(this._baseUrl + 'values/SaveItemInventory', this.ItemModel).subscribe(result => {
      alert("success");
    }, error => console.error(error));
  }
}

interface ItemDetails {
  ItemName: string;
  CategoryID: number;
  ItemId: number;
}
interface ItemInventory {
  ItemId: number;
  ItemRate: number;
  ItemQuantity: number;
}
