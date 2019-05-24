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
    this._http.post<CustomerDetails>(this._baseUrl + 'values/SaveCustomer', this.CustomerModel).subscribe(result => {
      alert("success");
    }, error => console.error(error));
  }
}

interface CustomerDetails {
  CustomerName: string;
  CustomerEmail: string;
}
