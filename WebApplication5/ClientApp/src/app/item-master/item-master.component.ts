import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { debug } from 'util';


@Component({
  selector: 'app-itemMaster',
  templateUrl: './item-master.component.html'
})

export class ItemMasterComponent {

  public CategoryModel = {
    CategoryId: "",
    ItemName: ""
  };
  public category: Category[];
  public item: Item[];
  private _http: HttpClient;
  _baseUrl: string;
  count: number = 0;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {

    http.get<Category[]>(apiUrl + 'values/GetCategory').subscribe(result => {
      this.category = result;
      console.log(this.category);
    }, error => console.error(error));
    this._baseUrl = apiUrl;
    this._http = http;
    this.CategoryModel = {
      CategoryId: "",
      ItemName: ""
    }
    http.get<Item[]>(apiUrl + 'values/GetItemMaster').subscribe(result => {
      this.item = result;
      console.log(this.item);
    }, error => console.error(error));
  }

  Save() {
    for (let items of this.item) {
      if (this.CategoryModel.ItemName == items.ItemName) {
        this.count = this.count + 1;
      }
    }
    if (this.count !== 0) {
      this.count = 0;
      alert("Item Name Already Exists.")
    }
    else {
      this._http.post<Item>(this._baseUrl + 'values/SaveItemMaster', this.CategoryModel).subscribe(result => {
        alert("Saved Successfully");
      }, error => console.error(error));
    }
  }
}

interface Item {
  ItemName: string;
  CategoryID: number;
}
interface Category {
  CategoryId: number;
  CategoryName: string;
}
