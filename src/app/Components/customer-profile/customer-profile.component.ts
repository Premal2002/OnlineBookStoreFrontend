import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit{
  customer = new Customer(0,"","","","","");

  constructor(private router:Router,private customerService : CustomerService){}

  ngOnInit(): void {
    this.customerService.findCustomerById(parseInt(sessionStorage.getItem("customerId"))).subscribe((data:any)=>{
      if(data!=null){
        this.customer = data;
      }
    });
  }

  isEditingName = false;
  isEditingAddress = false;
  isEditingContact = false;
  isEditingEmail = false;

  toggleEditing(field: string): void {
    switch (field) {
      case 'name':
        this.isEditingName = !this.isEditingName;
        break;
      case 'address':
        this.isEditingAddress = !this.isEditingAddress;
        break;
      case 'contact':
        this.isEditingContact = !this.isEditingContact;
        break;
      case 'email':
        this.isEditingEmail = !this.isEditingEmail;
        break;
      default:
        break;
    }
  }

  saveProfile(customer:Customer){
    this.customerService.updateCustomer(parseInt(sessionStorage.getItem("customerId")),customer).subscribe((data:any)=>{
      if(data!=null){
        Swal.fire({
          title: 'Profile Updated.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['customerProfile']);
        });
      }
    });
  }
}
