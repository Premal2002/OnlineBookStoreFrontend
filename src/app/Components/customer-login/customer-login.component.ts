import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import {Customer} from "../../customer";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent implements OnInit {
  email : string = sessionStorage.getItem('customerEmail');
  password : string = sessionStorage.getItem('customerPass');
  customer = new Customer(0,"","","",this.email,this.password);
  
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void { }



  handlelogin() {  
    this.hardcodeAuthenticationService.authenticate(this.customer).subscribe
      (Response => {
        var customer1 = Response as Customer;
        if(this.customer.email=="" || this.customer.password==""){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your email or password is empty!',
          }); 
        }
        else if (Response == null || this.customer.password != customer1.password) { 
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email or password is incorrect!',
        }); }
        else {
          Swal.fire({
            title: 'Login successful.',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          // this.accountId = Object.values(Response)[0];
          // console.log(Response);
          sessionStorage.removeItem('customerPass');
          sessionStorage.setItem('customerName', customer1.customer_name);
          sessionStorage.setItem('customerEmail', this.customer.email);
          sessionStorage.setItem('customerId',customer1.cust_id.toString());
          this.router.navigate(['dashboard', this.customer.cust_id]);

        }
      })

  }

  createacc() {
    console.log(this.createacc)
    this.router.navigate(['createaccount']);
  }

  forgotpass() {
    this.router.navigate(['forgotPassword'])
  }

  publisherLogin(){
    this.router.navigate(['publisherLogin']);
  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (this.passwordVisible) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
  }

}