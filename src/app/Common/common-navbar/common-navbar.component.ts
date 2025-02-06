import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import { CustomerService } from '../../Services/customer-service.service';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrl: './common-navbar.component.css'
})
export class CommonNavbarComponent {
  @Input() publisherNav:Boolean;
  @Input() customerNav:Boolean;
  @Input() adminNav:Boolean;

  cId : number = parseInt(sessionStorage.getItem("customerId"));
  cName : string = sessionStorage.getItem("customerName");

  dropdownOpen: boolean = false;

  searchQuery : string =""
 
  constructor(private router:Router,public hardcodeAuthenticationService:HardcodeAuthenticationService,customerService:CustomerService){}
  logoutAdmin(){
    this.hardcodeAuthenticationService.logoutAdmin();
    this.router.navigate(['adminLogin']);
  }

  logoutPublisher(){
    this.hardcodeAuthenticationService.logoutPublisher();
    this.router.navigate(['publisherLogin']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    this.hardcodeAuthenticationService.logoutCustomer();
    this.router.navigate(['']);
  }

  searchBook(searchQuery:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['dashboard',searchQuery]);
    }); 
  }

  logoClick(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['dashboard',this.cId]);
    });
  }

  goToHomePage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['dashboard',this.cId]);
    });
  }
}
