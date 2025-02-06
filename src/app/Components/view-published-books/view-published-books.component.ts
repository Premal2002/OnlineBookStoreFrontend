import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import { PublisherService } from '../../Services/publisher.service';
import { BookService } from '../../Services/book.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer-service.service';

@Component({
  selector: 'app-view-published-books',
  templateUrl: './view-published-books.component.html',
  styleUrl: './view-published-books.component.css'
})
export class ViewPublishedBooksComponent implements OnInit {

  //pagination
  p:number=1;
  count : number = 5;

  getPid : any = sessionStorage.getItem("publisherId");
  pId : number = 0;
  book : Book = new Book(0,0,"","","","",0,0,"",0);

  bookList : any;

  constructor(private customerService:CustomerService,private publisherService:PublisherService,private bookService : BookService,private router:Router){}

  ngOnInit(): void {
    if(this.getPid!=null){
      this.pId = parseInt(this.getPid);
    }
      this.publisherService.getBooksByPublisher(this.pId).subscribe((data)=>{
        // console.log(data);
        this.bookList = data;
      });
  }

  deleteBook(bId:number){
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
            this.router.navigate(['viewPublishedBooks']);
          });
        });
      }
    });

    
  }

  modifyBook(book:Book,bId:number){
    this.bookService.updateBook(book,bId).subscribe((data)=>{
      // console.log(data);
       let book1 : Book = data as Book;
      if(data!=null){
        if(book1.bQuantity>book1.booksSold){
          this.customerService.updateBooksStatus(book1.bId,"available").subscribe((data:any)=>{});
        }
        Swal.fire({
          title: 'Book Modified Successfully.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['viewPublishedBooks']);
        });
      }
    });
  }


}
