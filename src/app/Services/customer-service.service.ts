import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { Customer } from '../customer';
import { Cart } from '../cart';
import { Order } from '../order';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }
  //register customer
  public registerCustomer(customer : Customer){
    return this.httpClient.post(`${baseurl}/api/customer/`,customer);
  }

  //find customer by email
  public findCustomerByEmail(email : String){
    return this.httpClient.get(`${baseurl}/api/customer/getByEmail/${email}`);
  }

  //find customer by id
  public findCustomerById(cId : number){
    return this.httpClient.get(`${baseurl}/api/customer/${cId}`);
  }

  //update customer
  public updateCustomer(cId:number,customer : Customer){
    return this.httpClient.put(`${baseurl}/api/customer/${cId}`,customer);
  }

  //add to cart
  public addToCart(cart : Cart){
    return this.httpClient.post(`${baseurl}/api/cart/`,cart);
  }

  //get all cart for admin
  public getAllCart(){
    return this.httpClient.get(`${baseurl}/api/cart/`);
  }

  //get cart for each customer
  public getCartByCustomerId(custId:number){
    return this.httpClient.get(`${baseurl}/api/cart/${custId}`);
  }

  //delete cart of customer
  public deleteCartByCustomerId(custId:number){
    return this.httpClient.delete(`${baseurl}/api/cart/${custId}`);
  }

  //remove item from cart
  public removeCartItem(cId:number){
    return this.httpClient.delete(`${baseurl}/api/cart/deleteCartById/${cId}`);
  }

  //get cart for each customer
  public searchBook(bTitle:string){
    return this.httpClient.get(`${baseurl}/api/book/searchBook/${bTitle}`);
  }

  //create razorpay order
  public createRazorpayOrder(bPRice : number){
    return this.httpClient.get(`${baseurl}/api/customer/createRazorpayOrder/${bPRice}`);
  }

  //save order
  public saveOrder(order : Order){
    return this.httpClient.post(`${baseurl}/api/order/`,order);
  }

  //get all orders
  //get all cart for admin
  public getAllOrders(){
    return this.httpClient.get(`${baseurl}/api/order/`);
  }

  public getBookSoldCountByBId(bId:number){
    return this.httpClient.get(`${baseurl}/api/book/getBookSoldByBId/${bId}`);
  }

  public getBookSoldCountByPId(pId:number){
    return this.httpClient.get(`${baseurl}/api/book/getBookSoldByPId/${pId}`);
  }

  public updateBooksSold(bId:number,count:number){
    return this.httpClient.put(`${baseurl}/api/book/updateBookSold/${bId}/${count}`,count);
  }

  public updateBooksStatus(bId:number,bStatus:string){
    return this.httpClient.put(`${baseurl}/api/book/updateBookStatus/${bId}/${bStatus}`,bStatus);
  }

  public getOrdersByCId(cId:number){
    return this.httpClient.get(`${baseurl}/api/order/getOrdersByCId/${cId}`);
  }


  //contact us
  public saveContactUs(contact : Contact){
    return this.httpClient.post(`${baseurl}/api/contact/`,contact);
  }

  public getAllContactUs(){
    return this.httpClient.get(`${baseurl}/api/contact/`);
  }

  public findContactUsById(contact_id : number){
    return this.httpClient.get(`${baseurl}/api/contact/${contact_id}`);
  }

  


  //admin functions

  public getOrdersByDelivered(isDelivered:boolean){
    return this.httpClient.get(`${baseurl}/api/order/getOrdersByDelivered/${isDelivered}`);
  }

  public getOrdersByDate(orderDate:Date){
    return this.httpClient.get(`${baseurl}/api/order/getOrdersByDate/${orderDate}`);
  }

  public getOrdersByDates(orderDate1:Date,orderDate2:Date){
    return this.httpClient.get(`${baseurl}/api/order/getOrdersByDates/${orderDate1}/${orderDate2}`);
  }

  public updateorderStatus(oId:number,isDeliverd:boolean){
    return this.httpClient.put(`${baseurl}/api/order/${oId}/${isDeliverd}`,isDeliverd);
  }

  //update
  public updateContactUs(contact_id:number,isResolved:boolean){
    return this.httpClient.put(`${baseurl}/api/contact/${contact_id}/${isResolved}`,isResolved);
  }

  public findContactUsByStatus(isResolved : boolean){
    return this.httpClient.get(`${baseurl}/api/contact/getContactUsByStatus/${isResolved}`);
  }


}
