import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Email} from "../../email";
import Swal from 'sweetalert2';
import { OtpService } from '../../Services/otp.service';

import { Customer } from '../../customer';
import { CustomerService } from '../../Services/customer-service.service';
import { Router } from '@angular/router';


@Component({
 selector: 'app-forgot-password',
 templateUrl: './forgot-password.component.html',
 styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
 forgotPasswordForm: FormGroup = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  otp: ['', Validators.required]
});

email : Email = new Email("","","");

customer : Customer = new Customer(0,"","","","","");

 otpSent = false;
 timer: any;
 timerValue = 150; // 5 minutes in seconds
 otp:any=null;
 enterdOtp:number=0;

 constructor(private router: Router,private formBuilder: FormBuilder,private otpService : OtpService,private customerService : CustomerService) { 
 
 }

 ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
 }

 generateRandomOTP() {
  return Math.floor(100000 + Math.random() * 900000);
 }
 

 sendOtp(): void {
    // Implement OTP sending logic here
    
    this.customerService.findCustomerByEmail(this.forgotPasswordForm.get('email')?.value).subscribe((data:any)=>{
      if(data!=null){
        this.customer = data;
        this.otp = this.generateRandomOTP();
        // console.log(this.otp);
        this.otpSent = true;
        this.startTimer();
        this.email.setTo= this.forgotPasswordForm.get('email')?.value;
        this.email.setSubject = "Books Haven OTP(One Time Password)";
        this.email.setText = "Dear valued customer,\n\nThank you for choosing Books Haven! Your one-time OTP (One-Time Password) for accessing our online bookstore is: " + this.otp + ". Please use this OTP to complete your transaction securely.\n\nIf you did not request this OTP, please ignore this message.\n\nHappy reading!\n\nSincerely,\nThe Books Haven Team";
  
        this.otpService.sendOTP(this.email).subscribe((data:any)=>{
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Customer with this email not registered!!!',
        });
      }  

    });

    
    
 }

 startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--;
      } else {
        clearInterval(this.timer);
        this.timerValue = 150; // Reset timer value
        this.otp=null;
      }
    }, 1000);
 }

 resendOtp(): void {
    // Implement resend OTP logic here
    this.sendOtp();
 }

 resetPassword(): void {

    // Implement password reset logic here
    this.enterdOtp = this.forgotPasswordForm.get('otp')?.value;
    if(this.otp != this.enterdOtp){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong OTP!',
      }); 
    }else{
      this.customer.password=this.forgotPasswordForm.get('password')?.value;
      this.customerService.updateCustomer(this.customer.cust_id,this.customer).subscribe((data:any)=>{
        if(data!=null){
          console.log(data);
          Swal.fire({
            title: 'Your Password updated successfully.',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['']);
        }
      });
      
    }
 }
}
