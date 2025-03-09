import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from '../../Services/harcode-authentication.service';
import { BookService } from '../../Services/book.service';
import Swal from 'sweetalert2';
import { Book } from '../../book';
import { Cart } from '../../cart';
import { CustomerService } from '../../Services/customer-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  //Logged in check
  isLoggedin: boolean = false;

  firstName: any = sessionStorage.getItem('customerName');

  //Book List
  bList: any;

  currentCategory: string = 'All Books';

  //pagination
  p: number = 1;
  count: number = 6;
  query: any;

  constructor(
    public hardcodeAuthenticationService: HardcodeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.params['cID'];
    if (
      this.query == 0 ||
      this.query == null ||
      !this.containsOnlyNumbers(this.query)
    ) {
      this.isLoggedin = false;
    } else {
      this.isLoggedin = true;
    }
    //Below code is used to get changes in url parameters at run time
    // this.route.paramMap.subscribe(params => {
    //   this.query = params.get('cID') || '';
    //   console.log('Updated Search Query:', this.query);

    //   // Reload your component's data based on the new search query
    //     this.load();
    // });
    this.load();
  }

  ngAfterViewInit(): void {}

  load() {
    if (this.containsOnlyNumbers(this.query) == false && this.query != 'NaN') {
      this.customerService.searchBook(this.query).subscribe((data: any) => {
        if (data.length > 0) {
          this.bList = data;
          console;
          // for(let book of this.bList){
          this.currentCategory = 'You searched : ' + this.bList[0].bTitle;
          //   break;
          // }
        } else {
          let cId: number = parseInt(sessionStorage.getItem('customerId'));
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Book not found!',
          }).then(() => {
            this.router
            .navigateByUrl('customerLogin', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['dashboard', cId]);
            });
          });
        }
      });
    } else {
      //get all books
      this.bookService.getAllBooks().subscribe((data: any) => {
        if (data != null) {
          this.bList = data;
          // console.log(typeof data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There are no books in store!',
          });
        }
      });
    }
  }

  containsOnlyNumbers(input: string): boolean {
    // Regular expression to match only numbers
    const regex = /^[0-9]+$/;

    // Test if the input string matches the regular expression
    return regex.test(input);
  }

  allBooksCat() {
    this.bookService.getAllBooks().subscribe((data: any) => {
      // console.log(data);
      if (data != null) {
        this.bList = data;
        this.currentCategory = 'All Books';
        this.router.navigate([
          'dashboard',
          sessionStorage.getItem('customerId'),
        ]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There are no books in store!',
        });
      }
    });
  }

  findOtherCat(bCategory: string) {
    this.bookService.findBooksByCategory(bCategory).subscribe((data: any) => {
      if (data.length > 0) {
        this.bList = data;
        this.currentCategory = bCategory;
        this.p = 1;
        this.router.navigate([
          'dashboard',
          sessionStorage.getItem('customerId'),
        ]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There are no books available of this category!',
        });
      }
    });
  }

  addToCart(
    bId: number,
    bTitle: string,
    bDesc: string,
    bPrice: number,
    bImgPath: string,
    bStatus: string
  ) {
    if (!this.isLoggedin) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please Login First',
      });
      this.router.navigate(['customerLogin']);
    } else {
      if (bStatus === 'available') {
        let custId: number = parseInt(sessionStorage.getItem('customerId'));
        // console.log(custId);
        var cart: Cart = new Cart(0, 0, 0, '', '', 0, '');
        cart.bId = bId;
        cart.custId = custId;
        cart.bTitle = bTitle;
        cart.bDesc = bDesc;
        cart.bPrice = bPrice;
        cart.bImgPath = bImgPath;

        this.customerService.addToCart(cart).subscribe((data: any) => {
          if (data != null) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Book added to cart',
            });
            this.router.navigate(['customerCart']);
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'This book is out of stock',
        });
      }
    }
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/default-book-cover.png'; // Set default image on error
  }

  // refreshPage(){
  //   this.load();
  // }
  getCategoryClass(category: string): string {
    switch (category.toLowerCase()) {
      case 'fiction':
        return 'fiction';
      case 'non-fiction':
        return 'non-fiction';
      case 'childrens':
        return 'childrens';
      case 'education':
        return 'education';
      case 'manga':
        return 'manga';
      case 'music':
        return 'music';
      case 'all books':
        return 'all-books';
      default:
        return '';
    }
  }

  getBackgroundClass(category: string): string {
    switch (category?.toLowerCase()) {
      case 'fiction':
        return 'bg-fiction';
      case 'non-fiction':
        return 'bg-non-fiction';
      case 'childrens':
        return 'bg-childrens';
      case 'education':
        return 'bg-education';
      case 'manga':
        return 'bg-manga'; // Red-Yellow Gradient
      case 'music':
        return 'bg-music';
      case 'all books':
        return 'bg-all-books';
      default:
        return ''; // No background change for unknown categories
    }
  }
}
