import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Email } from '../../email';
import { OtpService } from '../../Services/otp.service';

@Component({
  selector: 'app-manage-queries',
  templateUrl: './manage-queries.component.html',
  styleUrl: './manage-queries.component.css'
})
export class ManageQueriesComponent implements OnInit {
  //pagination
  p:number=1;
  count : number = 5;

  filterByIsActiveValue : boolean;

  email : Email = new Email("","","");

  contactList : any;

  constructor(private mailSendService : OtpService,private customerService:CustomerService,private router:Router){}

  ngOnInit(): void {
    this.customerService.getAllContactUs().subscribe((data:any)=>{
      if(data!=null){
        this.contactList = data;
      }
    });
  }

  filterByIsActive(filterByIsActiveValue:boolean){
    this.customerService.findContactUsByStatus(filterByIsActiveValue).subscribe((data:any)=>{
      this.contactList = data;
    });
  }

  resolve(contactId:number,isResolve:boolean,cName:string){
    if(isResolve == true){
      Swal.fire({
        icon: 'info',
        title: 'Query already resolved',
      });
    }else{
      Swal.fire({
        title: 'Are you sure this query is resolved?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, resolve it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.customerService.updateContactUs(contactId,true).subscribe((data:any)=>{
            if(data!=null){
              this.email.setTo= data.contact_email;
            this.email.setSubject = "Update on Your Query";
            this.email.setText = `Dear ${cName},\nYour query has been resolved or will be resolved anytome now by our team. Thank you for reaching out!\n\nBest regards,\nkadam Premal\n[Books Haven]`;

            this.mailSendService.sendOTP(this.email).subscribe((data:any)=>{});
              Swal.fire({
                icon: 'success',
                title: 'Query Processed successfully',
              });
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['manageQuery']);
              });
            }
          });
        }
    });
  }
}

}
