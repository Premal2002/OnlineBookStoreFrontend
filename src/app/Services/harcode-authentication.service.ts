import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Publisher } from '../publisher';
import { baseurl } from '../baseURL';

@Injectable({
  providedIn: 'root'
})
export class HardcodeAuthenticationService {

  constructor(private http:HttpClient) { }

  //login

 public isCustomerLoggedIn(){
  let customer=sessionStorage.getItem('customerEmail')
  return !(customer==null)
}
public isAdminLoggedIn(){
  let user=sessionStorage.getItem('authenticateAdmin')
  return !(user==null)
}

public isPublisherLoggedIn(){
  let user=sessionStorage.getItem('publisherId')
  return !(user==null)
}
//logout
// logout(){
//   sessionStorage.removeItem('accountId');
// }

//logout admin
logoutAdmin(){
  sessionStorage.removeItem('authenticateAdmin');
}

logoutPublisher(){
  sessionStorage.removeItem('publisherName');
  sessionStorage.removeItem('publisherEmail');
  sessionStorage.removeItem('publisherId');
}

logoutCustomer(){
  sessionStorage.removeItem('customerName');
  sessionStorage.removeItem('customerEmail');
  sessionStorage.removeItem('customerId');
}

  // customer login api
  authenticate(customer:Customer){
    console.log(customer.email);
    console.log(customer.password);
  return this.http.post(`${baseurl}/api/customer/loginCustomer`,customer);
  }

  //publisher login api
  authenticatePublisher(publisher:Publisher){
    console.log(publisher.email);
    console.log(publisher.password);
  return this.http.post(`${baseurl}/api/publisher/loginPublisher`,publisher);
  }

  adminauthenticate(username:string,password:string)
  {
    if((username.trim()==="prem07") && (password.trim()==="prem@2024")){
      sessionStorage.setItem('authenticateAdmin',username)
      return true;
    }
    else
    {
      return false;
    }
  }
  
}
