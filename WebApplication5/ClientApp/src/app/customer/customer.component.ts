import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})

export class CustomerComponent {
  public CustomerModel = {
    CustomerName: "",
    CustomerEmail: ""
  };
  public customer: CustomerDetails[];
  private _http: HttpClient;
  _baseUrl: string;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<CustomerDetails[]>(apiUrl + 'values/GetCustomer').subscribe(result => {
      this.customer = result;
      console.log(this.customer);
    }, error => console.error(error));

    this._baseUrl = apiUrl;
    this._http = http;
    this.CustomerModel = {
      CustomerName: "",
      CustomerEmail: ""
    }
  }

  Save() {
    this._http.get<CustomerDetails[]>('http://localhost:56910/api/Values/GetCustomer').subscribe(result => { //to get
      this.customer = result;

      var customerExist;
      console.clear();
      console.log(this.customer);
      this.customer.map((x) => {
        if (this.CustomerModel.CustomerEmail == x['customerEmail']) {
          customerExist = true;
        }
      });
      if (customerExist == true) {
        alert("Item already exists");
      }
      else {
        this._http.post<CustomerDetails>(this._baseUrl + 'values/SaveCustomer', this.CustomerModel).subscribe(result => {
          alert("Saved Successfully");
        }, error => console.error(error));
      }
    }, error => console.error(error));
  }
}

interface CustomerDetails {
  CustomerName: string;
  CustomerEmail: string;
}
