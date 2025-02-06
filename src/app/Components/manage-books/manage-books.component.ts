import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import Swal from 'sweetalert2';
import { PublisherService } from '../../Services/publisher.service';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer-service.service';
import { Email } from '../../email';
import { OtpService } from '../../Services/otp.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.css'
})
export class ManageBooksComponent implements OnInit {
  //pagination
  p:number=1;
  count : number = 5;

  getPid : any = sessionStorage.getItem("publisherId");
  pId : number = 0;
  book : Book = new Book(0,0,"","","","",0,0,"",0);

  email : Email = new Email("","","");

  bookList : any;

  filterByIdValue:number =0;
  filterByCategoryValue : string = "";
  filterByStatusValue : string ="";

  constructor(private publisherService:PublisherService,private mailSendService : OtpService ,private bookService : BookService,private router:Router){}

  ngOnInit(): void {
    if(this.getPid!=null){
      this.pId = parseInt(this.getPid);
    }
      this.bookService.getAllBooks().subscribe((data)=>{
        // console.log(data);
        this.bookList = data;
      });
  }

  deleteBook(bId:number,pId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        var reson : string = prompt("Enter reson for removing the book");
        // console.log(reson);

        this.publisherService.getPublisherById(pId).subscribe((data:any)=>{
          if(data != null){
            this.email.setTo= data.email;
            this.email.setSubject = "Book Removal Reason";
            this.email.setText = "This mesaage is to inform you that your book with id  : "+ bId + " is removed for reason '"+ reson +"'";

            this.mailSendService.sendOTP(this.email).subscribe((data:any)=>{});
          }
        });

       
        // User confirmed, perform the action
        // Add your code here to perform the action

        this.bookService.deleteBook(bId).subscribe((data)=>{
          // console.log(data);
          Swal.fire({
            title: 'Book Removed Successfully.',
            icon: 'info',
            confirmButtonText: 'Okay'
          }); 
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['manageBook']);
          });
        });
      }
    });
  }

  filterById(){
    this.bookService.getBookById(this.filterByIdValue).subscribe((data:any)=>{
      if(data!=null){
        var book : Book =data as Book;
        this.bookList = [];
        this.bookList[0] = book;
        // console.log(this.bookList);
      }
    });
  }

  filterByCategory(){
    this.bookService.findBooksByCategory(this.filterByCategoryValue).subscribe((data:any)=>{
      if(data!=null){
        this.bookList = data;
        // console.log(this.bookList);
      }
    });
  }

  filterByStatus(){
    this.bookService.findBooksByStatus(this.filterByStatusValue).subscribe((data:any)=>{
      if(data!=null){
        this.bookList = data;
      }
    });
  }
}
