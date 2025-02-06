import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../../cart';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer-service.service';
import { Book } from '../../book';
import { BookService } from '../../Services/book.service';
import { PublisherService } from '../../Services/publisher.service';
import { Publisher } from '../../publisher';
import { Order } from '../../order';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit {
  cartList : any;

  isCartEmpty : boolean = false;

  noOfItems:number;
  grandTotal : number=0;

  

  constructor(private cdr: ChangeDetectorRef,public router:Router,public customerService : CustomerService,private bookService:BookService){
    
    
  }

  ngOnInit(): void {
     let custId : number = parseInt(sessionStorage.getItem("customerId"));
      this.customerService.getCartByCustomerId(custId).subscribe((data:any)=>{
        if(data.length>0){
          this.cartList = data;
          this.isCartEmpty= true;
          this.noOfItems = this.cartList.length;

          for(let cart of this.cartList){
            this.grandTotal += cart.bPrice;
          }
        }
      })
  }

  removeFromCart(cId:number){
    this.customerService.removeCartItem(cId).subscribe((data:any)=>{
      if(data!=null){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['customerCart']);
        });
      }
    });
  }
  
  

  checkOut(total:number,cartList:any,noOfItems:number,customerService:CustomerService,router:Router){
    this.customerService.createRazorpayOrder(total).subscribe((data:any)=>{
        (window as any).paymentStart(data);
        
        function myFunction(data:any) {
          // console.log(total);
          var order : Order = new Order(0,"","","",new Date(),0,0,[],[],[],[],0,false);
          order.razorpayOrderId= data.razorpay_order_id;
          order.razorpayPaymentId = data.razorpay_payment_id;
          order.razorpaySignature = data.razorpay_signature;
          order.orderAmount = total;
          order.cId = parseInt(sessionStorage.getItem("customerId"));
          for (let i = 0; i < cartList.length; i++) {
            let cart = cartList[i];
            order.bId[i] = cart.bId;
            order.bTitle[i] = cart.bTitle;
            order.bPrice[i] = cart.bPrice;
            order.bImgpath[i] = cart.bImgPath;
          }
          order.bCount = noOfItems;
          customerService.saveOrder(order).subscribe((data:any)=>{
            // console.log(data);
            if(data!=null){
              Swal.fire({
              title: 'Order Placed.',
              icon: 'success',
              confirmButtonText: 'Okay'
              });
              customerService.deleteCartByCustomerId(order.cId).subscribe((data:any)=>{});
              for (let i = 0; i < cartList.length; i++) {
                let cart = cartList[i];
                customerService.getBookSoldCountByBId(cart.bId).subscribe((data:any)=>{
                  customerService.updateBooksSold(cart.bId,data+1).subscribe((data:any)=>{
                    if(data.booksSold==data.bQuantity){
                      customerService.updateBooksStatus(cart.bId,"Out of Stock").subscribe((data:any)=>{});
                    }
                  });
                });
              }
              router.navigate(['dashboard',order.cId]);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Order not placed!',
              });
            }
          });
        }
        (window as any).myFunction = myFunction;
      
    });

    
  }

  
  seeBooks(){
    var cId : number = parseInt(sessionStorage.getItem("customerId"));

    this.router.navigate(['dashboard',cId]);
  }
  

   
}

// Expose the function to the global scope
  

