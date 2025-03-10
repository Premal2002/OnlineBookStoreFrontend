import { Component, Input, HostBinding } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import { CustomerService } from '../../Services/customer-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css'],
})
export class CommonNavbarComponent {
  @Input() publisherNav: boolean;
  @Input() customerNav: boolean;
  @Input() adminNav: boolean;
  @Input() fromCustomerLogin: boolean;

  cId: number = parseInt(sessionStorage.getItem('customerId'));
  pId: number = parseInt(sessionStorage.getItem('publisherId'));
  cName: string = sessionStorage.getItem('customerName');
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  searchQuery: string = '';
  navOwner: string = 'customer';

  @HostBinding('class.fade-in') fadeIn = true; // Add animation on load

  constructor(
    private router: Router,
    public hardcodeAuthenticationService: HardcodeAuthenticationService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    if (this.customerNav) {
      this.navOwner = 'customer';
    } else if (this.publisherNav) {
      this.navOwner = 'publisher';
    } else {
      this.navOwner = 'admin';
    }
    console.log(this.cName);
    if (this.cName != null) {
      this.isLoggedIn = true;
    }
  }

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
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

  searchBook(searchQuery: string) {
    this.addAnimation();
    this.router
      .navigateByUrl('customerLogin', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['dashboard', searchQuery]);
      });
  }

  logoClick() {
    this.addAnimation();
    if (this.fromCustomerLogin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Customer not Logged-In',
      });
      this.router.navigate(['customerLogin']);
    } else {
      this.router
        .navigateByUrl('customerLogin', { skipLocationChange: true })
        .then(() => {
          if (this.navOwner == 'customer')
            this.router.navigate(['dashboard', this.cId]);
          else if (this.navOwner == 'publisher')
            this.router.navigate(['publisherDashboard', this.pId]);
          else this.router.navigate(['adminDashboard']);
        });
    }
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
