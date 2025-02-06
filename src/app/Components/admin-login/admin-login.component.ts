import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
username:string="";
password:string="";

constructor(private router:Router,public hardcodeAuthenticationService:HardcodeAuthenticationService){}

  handlelogin(){
    if(this.hardcodeAuthenticationService.adminauthenticate(this.username,this.password)){
      Swal.fire({
        title: 'Login successful.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
      this.router.navigate(['adminDashboard']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials!',
      });
    }
}

}
