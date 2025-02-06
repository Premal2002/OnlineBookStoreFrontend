import { Component, OnInit } from '@angular/core';
import { Book } from '../../book';
import { BookService } from '../../Services/book.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.component.html',
  styleUrl: './publish-book.component.css'
})
export class PublishBookComponent implements OnInit {
  getPid : any = sessionStorage.getItem("publisherId");
  pId : number = 0;

  book : Book = new Book(0,0,"","","","available",0,5,"",0);
  
  constructor(private bookService : BookService,private router:Router){}

  ngOnInit(): void {
    if(this.getPid!=null){
      this.pId = parseInt(this.getPid);
      this.book.pId = this.pId;
    }
    
   } 
   

   onSubmit(){
    // console.log(this.book);
    
    this.bookService.saveBook(this.book).subscribe(
      (data:any)=>{
        Swal.fire({
        title: 'Your Book Published Successfully',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
        // console.log(data);
        this.router.navigate(['publisherDashboard',this.pId]);
      },
      (error) => {
        if (error.status === 500) {
          Swal.fire({
            title: 'Book with this name is already published.',
            text: 'Please use different book name',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }
    );
   }
}
