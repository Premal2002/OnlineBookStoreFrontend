import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { Book } from '../../book';
import Swal from 'sweetalert2';
import { Publisher } from '../../publisher';
import { PublisherService } from '../../Services/publisher.service';
import { CustomerService } from '../../Services/customer-service.service';
import { Cart } from '../../cart';

@Component({
  selector: 'app-single-book-info',
  templateUrl: './single-book-info.component.html',
  styleUrl: './single-book-info.component.css',
})
export class SingleBookInfoComponent implements OnInit {
  //to check logged in status
  isLoggedin:boolean = false;
  //pagination
  p: number = 1;
  count: number = 6;

  //
  bId: number;

  book: Book = new Book(0, 0, '', '', '', '', 0, 0, '', 0);

  publisher: Publisher = new Publisher(0, '', '', '', '', false);

  bList: any;

  similarBooks: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private publisherService: PublisherService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    let cID: number = parseInt(sessionStorage.getItem('customerId'));
    if(cID == 0 || cID == null || Number.isNaN(cID)){
      this.isLoggedin = false;
    }else{
        this.isLoggedin = true;
    }
    this.bId = this.route.snapshot.params['bId'];

    this.bookService.getBookById(this.bId).subscribe((data: any) => {
      if (data != null) {
        this.book = data;
        // console.log(this.book);

        this.publisherService
          .getPublisherById(this.book.pId)
          .subscribe((data: any) => {
            if (data != null) {
              this.publisher = data;
              // console.log(this. publisher);
            }
          });

        this.bookService
          .getBooksByCategory(this.book.bCategory, this.book.bId)
          .subscribe((data: any) => {
            if (data != null) {
              this.bList = data;
              this.similarBooks = this.bList.length > 0;
              // console.log(this.bList);
            }
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Book Not Found!',
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
        console.log(custId);
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

  navigateToSingleBookInfo(bId: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['singleBookInfo', bId]);
    });
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/default-book-cover.png'; // Set default image on error
  }
}
