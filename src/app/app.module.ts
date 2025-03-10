import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublisherComponent } from './Components/publisher/publisher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerLoginComponent } from './Components/customer-login/customer-login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegisterCustomerComponent } from './Components/register-customer/register-customer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PublisherLoginComponent } from './Components/publisher-login/publisher-login.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ForgotPubPasswordComponent } from './Components/forgot-pub-password/forgot-pub-password.component';
import { CommonNavbarComponent } from './Common/common-navbar/common-navbar.component';
import { FooterComponent } from './Common/footer/footer.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ManagePublisherComponent } from './Components/manage-publisher/manage-publisher.component';
import { PublisherDashboardComponent } from './Components/publisher-dashboard/publisher-dashboard.component';
import { PublishBookComponent } from './Components/publish-book/publish-book.component';
import { ViewPublishedBooksComponent } from './Components/view-published-books/view-published-books.component';
import { SingleBookInfoComponent } from './Components/single-book-info/single-book-info.component';
import { CustomerCartComponent } from './Components/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from './Components/customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './Components/customer-profile/customer-profile.component';
import { AboutPageComponent } from './Components/about-page/about-page.component';
import { ContactPageComponent } from './Components/contact-page/contact-page.component';
import { ManageBooksComponent } from './Components/manage-books/manage-books.component';
import { ManageOrdersComponent } from './Components/manage-orders/manage-orders.component';
import { ManageQueriesComponent } from './Components/manage-queries/manage-queries.component';
import { NgxPaginationModule } from 'ngx-pagination';

  
@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    CustomerLoginComponent,
    DashboardComponent,
    RegisterCustomerComponent,
    PublisherLoginComponent,
    AdminLoginComponent,
    ForgotPasswordComponent,
    ForgotPubPasswordComponent,
    CommonNavbarComponent,
    FooterComponent,
    AdminDashboardComponent,
    ManagePublisherComponent,
    PublisherDashboardComponent,
    PublishBookComponent,
    ViewPublishedBooksComponent,
    SingleBookInfoComponent,
    CustomerCartComponent,
    CustomerOrdersComponent,
    CustomerProfileComponent,
    AboutPageComponent,
    ContactPageComponent,
    ManageBooksComponent,
    ManageOrdersComponent,
    ManageQueriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
