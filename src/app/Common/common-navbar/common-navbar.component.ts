import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import { CustomerService } from '../../Services/customer-service.service';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css'],
})
export class CommonNavbarComponent {
  @Input() publisherNav: boolean;
  @Input() customerNav: boolean;
  @Input() adminNav: boolean;

  cId: number = parseInt(sessionStorage.getItem("customerId"));
  cName: string = sessionStorage.getItem("customerName");

  dropdownOpen: boolean = false;
  searchQuery: string = "";

  @HostBinding('class.fade-in') fadeIn = true;  // Add animation on load

  constructor(
    private router: Router,
    public hardcodeAuthenticationService: HardcodeAuthenticationService,
    private customerService: CustomerService
  ) {}

  logoutAdmin() {
    this.hardcodeAuthenticationService.logoutAdmin();
    this.router.navigate(['adminLogin']);
  }

  logoutPublisher() {
    this.hardcodeAuthenticationService.logoutPublisher();
    this.router.navigate(['publisherLogin']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.hardcodeAuthenticationService.logoutCustomer();
    this.router.navigate(['']);
  }

  searchBook(searchQuery: string) {
    this.addAnimation();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard', searchQuery]);
    });
  }

  logoClick() {
    this.addAnimation();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard', this.cId]);
    });
  }

  goToHomePage() {
    this.addAnimation();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard', this.cId]);
    });
  }

  addAnimation() {
    this.fadeIn = false;
    setTimeout(() => {
      this.fadeIn = true;
    }, 100);
  }
}
