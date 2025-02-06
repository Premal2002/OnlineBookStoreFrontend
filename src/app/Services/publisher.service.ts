import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../baseURL';
import { Publisher } from '../publisher';
@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  constructor(private httpClient : HttpClient) { }
  public registerPublisher(publisher : Publisher){
    return this.httpClient.post(`${baseurl}/api/publisher/`,publisher);
  }

  public getAllPublishers(){
    return this.httpClient.get(`${baseurl}/api/publisher/`);
  }

  //get books by publisher
  public getBooksByPublisher(pId:number){
    return this.httpClient.get(`${baseurl}/api/book/getBooksByPublisher/${pId}`);
  }

  public getBookCountByPublisher(pId:number){
    return this.httpClient.get(`${baseurl}/api/book/getBookCountByPublisher/${pId}`);
  }

  public getPublisherById(pId:number){
    return this.httpClient.get(`${baseurl}/api/publisher/${pId}`);
  }

  public updatePublisher(publisher : Publisher,pId:number){
    return this.httpClient.put(`${baseurl}/api/publisher/${pId}`,publisher);
  }

  public deletePublisher(pId:number){
    return this.httpClient.delete(`${baseurl}/api/publisher/${pId}`);
  }

  //find customer by email
  public findPublisherByEmail(email : String){
    return this.httpClient.get(`${baseurl}/api/publisher/getPubByEmail/${email}`);
  }

  public getActivePublishers(){
    return this.httpClient.get(`${baseurl}/api/publisher/getActivePublishers`);
  }

  public getNonActivePublishers(){
    return this.httpClient.get(`${baseurl}/api/publisher/getNonActivePublishers`);
  }

}
