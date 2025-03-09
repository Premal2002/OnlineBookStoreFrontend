import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../publisher';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publisher-login',
  templateUrl: './publisher-login.component.html',
  styleUrl: './publisher-login.component.css'
})
export class PublisherLoginComponent implements OnInit{
  email : string = sessionStorage.getItem('publisherEmail');
  // password : string = sessionStorage.getItem('publisherPass');
  publisher : Publisher = new Publisher(0,"",this.email,"","",false);

  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void { }

  handlelogin() { 
    // console.log(this.publisher);
    this.hardcodeAuthenticationService.authenticatePublisher(this.publisher).subscribe
      (Response => {
        console.log(Response);
        var publisher1 = Response as Publisher;
        if (Response == null || this.publisher.password != publisher1.password) { 
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email or password is incorrect!',
        }); }
        else if(publisher1.pStatus==false) {
          Swal.fire({
            icon: 'warning',
            title: 'Account not verified Yet',
            text: 'Please wait till your accont get verified  !',
          });
        }
        else{
          Swal.fire({
            title: 'Login successful.',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          // this.accountId = Object.values(Response)[0];
         
          sessionStorage.setItem('publisherName', publisher1.pName);
          sessionStorage.setItem('publisherEmail', publisher1.email);
          sessionStorage.setItem('publisherId', publisher1.pId.toString());

          this.router.navigate(['publisherDashboard', publisher1.pId]);

        }
      })

  }

  forgotpass(){
    this.router.navigate(['forgotPubPass']);
  }

  publisherRegister(){
    this.router.navigate(['registerPublisher']);
  }

  customerLogin(){
    this.router.navigate(['customerLogin']);
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
