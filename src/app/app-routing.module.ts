import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscriber } from 'rxjs';
import { PublisherComponent } from './Components/publisher/publisher.component';
import { CustomerLoginComponent } from './Components/customer-login/customer-login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegisterCustomerComponent } from './Components/register-customer/register-customer.component';
import { PublisherLoginComponent } from './Components/publisher-login/publisher-login.component';
import { RouteguardService } from './Services/routeguard.service';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ForgotPubPasswordComponent } from './Components/forgot-pub-password/forgot-pub-password.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminRouteGuardService } from './Services/admin-route-guard.service';
import { ManagePublisherComponent } from './Components/manage-publisher/manage-publisher.component';
import { PublisherDashboardComponent } from './Components/publisher-dashboard/publisher-dashboard.component';
import { PublisherRouteGuardService } from './Services/publisher-route-guard.service';
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




const routes: Routes = [{path:"" , component:CustomerLoginComponent},
  {path:"registerPublisher",component:PublisherComponent},
  {path:"dashboard/:cID",component:DashboardComponent,canActivate:[RouteguardService]},
  {path:"createaccount",component:RegisterCustomerComponent},
  {path:"publisherLogin",component:PublisherLoginComponent},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"forgotPubPass",component:ForgotPubPasswordComponent},
  {path:"adminLogin",component:AdminLoginComponent},
  {path:"adminDashboard",component:AdminDashboardComponent,canActivate:[AdminRouteGuardService]},
  {path:"publisherDashboard/:pId",component:PublisherDashboardComponent,canActivate:[PublisherRouteGuardService]},
  {path:"publishBook/:pId",component:PublishBookComponent,canActivate:[PublisherRouteGuardService]},
  {path:"viewPublishedBooks",component:ViewPublishedBooksComponent,canActivate:[PublisherRouteGuardService]},
  {path:"singleBookInfo/:bId",component:SingleBookInfoComponent,canActivate:[RouteguardService]},
  {path:"customerCart",component:CustomerCartComponent,canActivate:[RouteguardService]},
  {path:"customerOrders",component:CustomerOrdersComponent,canActivate:[RouteguardService]},
  {path:"customerProfile",component:CustomerProfileComponent,canActivate:[RouteguardService]},
  {path:"aboutPage",component:AboutPageComponent,canActivate:[RouteguardService]},
  {path:"contactPage",component:ContactPageComponent,canActivate:[RouteguardService]},
  {path:"managePublisher",component:ManagePublisherComponent,canActivate:[AdminRouteGuardService]},
  {path:"manageBook",component:ManageBooksComponent,canActivate:[AdminRouteGuardService]},
  {path:"manageOrder",component:ManageOrdersComponent,canActivate:[AdminRouteGuardService]},
  {path:"manageQuery",component:ManageQueriesComponent,canActivate:[AdminRouteGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
