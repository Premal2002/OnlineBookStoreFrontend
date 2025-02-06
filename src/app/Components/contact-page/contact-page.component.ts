import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer-service.service';
import { Contact } from '../../contact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent implements OnInit {

  contact : Contact = new Contact(0,"","","",true);

  cName : string = sessionStorage.getItem("customerName");

  cEmail : string = sessionStorage.getItem("customerEmail");

  constructor(private router:Router,private customerService:CustomerService){}

  ngOnInit(): void {
      this.contact.contact_name=this.cName;
      this.contact.contact_email=this.cEmail;
  }

  onSubmit(){
    this.customerService.saveContactUs(this.contact).subscribe((data:any)=>{
      // console.log(data);
      if(data!=null){
        Swal.fire({
          icon: 'info',
          title: 'Contact Us',
          text: 'We will get back to you!',
        });
        this.router.navigate(['dashboard',parseInt(sessionStorage.getItem("customerId"))]);
      }
    });
  }
}
