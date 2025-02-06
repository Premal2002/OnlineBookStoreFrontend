import { Component,AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { BookService } from '../../Services/book.service';
import { PublisherService } from '../../Services/publisher.service';
import { CustomerService } from '../../Services/customer-service.service';
import 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-publisher-dashboard',
  templateUrl: './publisher-dashboard.component.html',
  styleUrl: './publisher-dashboard.component.css'
})
export class PublisherDashboardComponent implements  OnInit{
  getPid : any = sessionStorage.getItem("publisherId");
  pId : number = 0;
  bCount : any =0;

  bSoldCount = 0;
  pName:String = sessionStorage.getItem("publisherName");
  
  
  constructor(private cdRef: ChangeDetectorRef,private bookService:BookService,private publisherService:PublisherService,private customerService : CustomerService){}

  ngOnInit(): void {
    if(this.getPid!=null){
      this.pId = parseInt(this.getPid);
    }

    this.publisherService.getBookCountByPublisher(this.pId).subscribe((data)=>{
      // console.log(data);
      this.bCount = data;
      this.customerService.getBookSoldCountByPId(parseInt(sessionStorage.getItem("publisherId"))).subscribe((data:any)=>{
        this.bSoldCount=data;
        this.createChart();
      });
    });

    
    
   } 

   createChart(): void {
    console.log(this.bCount);
    // Get the canvas element
    var ctx = document.getElementById('bookGraph') as HTMLCanvasElement;
  
    // Create the chart
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Published Books vs Sold Books'],
        datasets: [{
          label: 'Published Books',
          data: [this.bCount],
          backgroundColor: 'rgba(255, 99, 132, 0.7)', // Solid pink color for published books
          borderColor: 'rgba(255, 99, 132, 1)', // Pink border color
          borderWidth: 1
        }, {
          label: 'Sold Books',
          data: [this.bSoldCount],
          backgroundColor: 'rgba(54, 162, 235, 0.7)', // Solid blue color for sold books
          borderColor: 'rgba(54, 162, 235, 1)', // Blue border color
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
              font: {
                size: 14 // Adjust legend font size
              }
            }
          },
          title: {
            display: true,
            text: 'Book Sales Overview',
            font: {
              size: 20 // Adjust title font size
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            font: {
              size: 14 // Adjust data label font size
            }
          }
        }
      }
    });
  }

  
}
