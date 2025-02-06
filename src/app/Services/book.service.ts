import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient : HttpClient) { }

  public saveBook(book : Book){
    return this.httpClient.post(`${baseurl}/api/book/`,book);
  }

  //get all books
  public getAllBooks(){
    return this.httpClient.get(`${baseurl}/api/book/`);
  }

  public getBookById(bId:number){
    return this.httpClient.get(`${baseurl}/api/book/${bId}`);
  }

  //getBooksByCategory witout that book (similar books display)
  public getBooksByCategory(bCategory:string,bId:number){
    return this.httpClient.get(`${baseurl}/api/book/getBooksByCategory/${bCategory}/${bId}`);
  }

  public findBooksByCategory(bCategory:string){
    return this.httpClient.get(`${baseurl}/api/book/findBooksByCategory/${bCategory}`);
  }

  public findBooksByStatus(bStatus:string){
    return this.httpClient.get(`${baseurl}/api/book/findBooksByStatus/${bStatus}`);
  }

  public updateBook(book : Book,bId:number){
    return this.httpClient.put(`${baseurl}/api/book/${bId}`,book);
  }

  public deleteBook(bId:number){
    return this.httpClient.delete(`${baseurl}/api/book/${bId}`);
  }

}
