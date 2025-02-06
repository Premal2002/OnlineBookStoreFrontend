import { Component } from '@angular/core';
import { PublisherService } from '../../Services/publisher.service';
import { Router } from '@angular/router';
import { Publisher } from '../../publisher';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-publisher',
  templateUrl: './manage-publisher.component.html',
  styleUrl: './manage-publisher.component.css'
})
export class ManagePublisherComponent {
  //pagination
  p:number=1;
  count : number = 6;

  constructor(private publisherService : PublisherService,private router : Router){}
  activePublisherList : any;
  nonActivePublisherList : any;
  publisher : Publisher = new Publisher(0,"","","","",false);

  ngOnInit(): void {
      this.publisherService.getActivePublishers().subscribe((data:any)=>{
        this.activePublisherList = data;
      });

      this.publisherService.getNonActivePublishers().subscribe((data:any)=>{
        this.nonActivePublisherList = data;
      });
  }

  activatePublisher(pId:number,pName:string,pCountry:string,email:string,password:string){
    this.publisher.pId=pId;
    this.publisher.pName = pName;
    this.publisher.email = email;
    this.publisher.password = password;
    this.publisher.pCountry = pCountry;
    this.publisher.pStatus=true;
    
    this.publisherService.updatePublisher(this.publisher,pId).subscribe((data:any)=>{
      if(data!=null){
        Swal.fire({
          title: 'Publisher Activation Successful.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['managePublisher']);
        });

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Occured!',
        });
      }
    });
  }

  deactivatePublisher(pId:number,pName:string,pCountry:string,email:string,password:string){
    this.publisher.pId=pId;
    this.publisher.pName = pName;
    this.publisher.email = email;
    this.publisher.password = password;
    this.publisher.pCountry = pCountry;
    this.publisher.pStatus=false;
    
    this.publisherService.updatePublisher(this.publisher,pId).subscribe((data:any)=>{
      if(data!=null){
        Swal.fire({
          title: 'Publisher Deactivation Successful.',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['managePublisher']);
        });
          
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Occured!',
        });
      }
    });
  }
}
