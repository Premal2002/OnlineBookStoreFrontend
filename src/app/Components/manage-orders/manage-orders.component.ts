import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';
import { CustomerService } from '../../Services/customer-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent implements OnInit {
  //pagination
  p:number=1;
  count : number = 5;

  filterByDeliveredValue : boolean;

  startDateValue : Date;

  endDateValue : Date;
  
  orderList : any;

  constructor(private router:Router,private customerService : CustomerService){}

  ngOnInit(): void {
    this.customerService.getAllOrders().subscribe((data:any)=>{
      this.orderList = data;
      // console.log(this.orderList);

      // console.log(this.filterByDeliveredValue,this.startDateValue,this.endDateValue)
    });
  }

  filterByDelivered(filterByDelivered:boolean){
    this.customerService.getOrdersByDelivered(filterByDelivered).subscribe((data:any)=>{
      this.orderList = data;
    });
  }

  filterByDates(){
    if(this.startDateValue==undefined){
      Swal.fire({
        icon: 'warning',
        title: 'Please select start date',
      });
    }else if(this.endDateValue==undefined){
      Swal.fire({
        icon: 'warning',
        title: 'Please select end date',
      });
    }else{
      this.customerService.getOrdersByDates(this.startDateValue,this.endDateValue).subscribe((data:any)=>{
        this.orderList = data;
      });
    }
  }

  processOrder(oId : number,isDelieverd : boolean){
      if(isDelieverd == true){
        Swal.fire({
          icon: 'info',
          title: 'Order already processed',
        });
      }else{

        Swal.fire({
          title: 'Are you sure This order is delivered?',
          text: 'This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, process it!',
          cancelButtonText: 'No, cancel!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.customerService.updateorderStatus(oId,true).subscribe((data:any)=>{
              if(data!=null){
                Swal.fire({
                  icon: 'success',
                  title: 'Order Processed successfully',
                });
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate(['manageOrder']);
                });
              }
            });
          }
        });


        
      }
  }
}
