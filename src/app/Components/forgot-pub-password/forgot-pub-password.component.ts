import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Email} from "../../email";
import Swal from 'sweetalert2';
import { OtpService } from '../../Services/otp.service';

import { Router } from '@angular/router';
import { Publisher } from '../../publisher';
import { PublisherService } from '../../Services/publisher.service';

@Component({
  selector: 'app-forgot-pub-password',
  templateUrl: './forgot-pub-password.component.html',
  styleUrl: './forgot-pub-password.component.css'
})
export class ForgotPubPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = this.formBuilder.group({
   email: ['', [Validators.required, Validators.email]],
   otp: ['', Validators.required]
 });
 
 email : Email = new Email("","","");
 
 publisher : Publisher = new Publisher(0,"","","","",false);
 
  otpSent = false;
  timer: any;
  timerValue = 150; // 5 minutes in seconds
  otp:any=null;
  enterdOtp:number=0;
 
  constructor(private router: Router,private formBuilder: FormBuilder,private otpService : OtpService,private publisherService : PublisherService) { 
  
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
     
     this.publisherService.findPublisherByEmail(this.forgotPasswordForm.get('email')?.value).subscribe((data:any)=>{
       if(data!=null){
         this.publisher = data;
         this.otp = this.generateRandomOTP();
        //  console.log(this.otp);
         this.otpSent = true;
         this.startTimer();
         this.email.setTo= this.forgotPasswordForm.get('email')?.value;
         this.email.setSubject = "Online Book Store OTP";
         this.email.setText = "Your one time OTP is : "+ this.otp;
   
         this.otpService.sendOTP(this.email).subscribe((data:any)=>{
         });
       }else{
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'publisher with this email not registered!!!',
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
       this.publisher.password=this.forgotPasswordForm.get('password')?.value;
       this.publisherService.updatePublisher(this.publisher,this.publisher.pId).subscribe((data:any)=>{
         if(data!=null){
           Swal.fire({
             title: 'Your Password updated successfully.',
             icon: 'success',
             confirmButtonText: 'Okay'
           });
           this.router.navigate(['publisherLogin']);
         }
       });
       
     }
  }
 }
 
