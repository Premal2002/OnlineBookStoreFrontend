import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private router:Router,public hardcodeAuthenticationService:HardcodeAuthenticationService){}
  

  managePublisher(){
    this.router.navigate(['managePublisher']);
  }

  manageBook(){
    this.router.navigate(['manageBook']);
  }

  manageOrders(){
    this.router.navigate(['manageOrder']);
  }

  manageOueries(){
    this.router.navigate(['manageQuery']);
  }

}
