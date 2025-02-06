import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer-service.service';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent implements OnInit{
  oList:any;

  isOList : boolean = false;

  constructor(private customerService:CustomerService,private router : Router){}

  ngOnInit(): void {
      var cId : number = parseInt(sessionStorage.getItem("customerId"));

      this.customerService.getOrdersByCId(cId).subscribe((data:any)=>{
        if(data.length>0){
          this.oList=data;
          this.isOList=true;
        }
      });

  }
  
  goToCart(){
    this.router.navigate(['customerCart']);
  }
  
}

