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
    
  }

  Save() {
    this._http.get<Item[]>('http://localhost:56910/api/Values/GetItemMaster').subscribe(result => { //to get
      this.item = result;

      var itemExist;
      console.clear();
      console.log(this.item);
      this.item.map((x) => {
        if (this.CategoryModel.ItemName == x['itemName']) {
          itemExist = true;
        }
      });
      if (itemExist == true) {
        alert("Item already exists");
      }
      else {
        this._http.post<Item>(this._baseUrl + 'values/SaveItemMaster', this.CategoryModel).subscribe(result => {
          alert("Saved Successfully");
        }, error => console.error(error));
      }
    }, error => console.error(error));
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
