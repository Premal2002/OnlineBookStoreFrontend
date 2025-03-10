import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { UserdataService } from 'src/app/service/data/userdata.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
  animations: [
    trigger('categoryChange', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ])
    ]),
    trigger('booksAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger('150ms', [
            animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit,AfterViewInit {
  
  firstName: any=sessionStorage.getItem("customerName");

  //Book List
  bList : any;
  
  currentCategory : string = "All Books";


  //pagination
  p:number=1;
  count : number = 6;

  

  constructor( public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router,private bookService : BookService,private customerService : CustomerService) { }
  
  ngOnInit(): void { 
    this.load();  
  }

  ngAfterViewInit(): void {
    
  }

  load() {
    let query = this.route.snapshot.params['cID'];
    if (!this.containsOnlyNumbers(query)) {
      this.customerService.searchBook(query).subscribe((data: any) => {
        if (data.length > 0) {
          this.bList = data;
          this.currentCategory = "You searched : "+this.bList[0].bTitle;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Books not found!',
          });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['dashboard', sessionStorage.getItem("customerId")]);
          });
        }
      });
    } else {
      // Load all books
      this.bookService.getAllBooks().subscribe((data: any) => {
        if (data != null) {
          this.bList = data;
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
    if (data != null) {
      this.bList = [];
      setTimeout(() => {
        this.bList = data;
        this.currentCategory = "All Books";
        this.router.navigate(['dashboard', sessionStorage.getItem("customerId")]);
      }, 300); // Delay for smooth transition
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
      this.bList = [];
      setTimeout(() => {
        this.bList = data;
        this.currentCategory = bCategory;
        this.router.navigate(['dashboard', sessionStorage.getItem("customerId")]);
      }, 300); // Delay for smooth transition
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are no books available in this category!',
      });
    }
  });
}


  addToCart(bId:number,bTitle:string,bDesc:string,bPrice:number,bImgPath:string,bStatus:string){
    if(bStatus==="available"){
    let custId : number = parseInt(sessionStorage.getItem("customerId"));
    // console.log(custId);
    var cart : Cart=new Cart(0,0,0,"","",0,"");
    cart.bId=bId;
    cart.custId=custId;
    cart.bTitle=bTitle;
    cart.bDesc=bDesc;
    cart.bPrice=bPrice;
    cart.bImgPath=bImgPath;

    this.customerService.addToCart(cart).subscribe((data:any)=>{
      if(data!=null){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book added to cart',
        });
        this.router.navigate(['customerCart']);
      }
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: 'This book is out of stock',
    });
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
      case "fiction":
        return "fiction";
      case "non-fiction":
        return "non-fiction";
      case "childrens":
        return "childrens";
      case "educational":
        return "educational";
      case "manga":
        return "manga";
      case "music":
        return "music";
      case "all books":
        return "all-books";
      default:
        return "";
    }
  }
  

  getBackgroundClass(category: string): string {
    switch (category?.toLowerCase()) {
      case "fiction":
        return "bg-fiction";
      case "non-fiction":
        return "bg-non-fiction";
      case "childrens":
        return "bg-childrens";
      case "educational":
        return "bg-educational";
      case "manga":
        return "bg-manga"; // Red-Yellow Gradient
      case "music":
        return "bg-music";
      case "all books":
        return "bg-all-books";
      default:
        return ""; // No background change for unknown categories
    }
  }
  


}





