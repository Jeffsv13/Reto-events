import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { MyPurchasesComponent } from './customer/my-purchases/my-purchases.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';
import { isCustomer, isLoggedIn } from './shared/guards/auth.guard';
import { SalesComponent } from './admin/sales/sales.component';
import { EventsComponent } from './admin/events/events.component';
import { GenresComponent } from './admin/genres/genres.component';
import { ReportsComponent } from './admin/reports/reports.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'event-detail',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: 'event-detail/:id',
        pathMatch:'full',
        component: EventDetailComponent
    },
    {
        path: 'customer',
        pathMatch: 'prefix',
        component: CustomerComponent,
        canActivate: [isLoggedIn, isCustomer],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'my-purchases',
          },
           {
            path: 'my-purchases',
            component: MyPurchasesComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
        ],
      },
      {
        path: 'admin',
        pathMatch: 'prefix',
        component: AdminComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'sales',
          },
          {
            path: 'sales',
            component: SalesComponent,
          },
          { path: 'events', component: EventsComponent },
          { path: 'genres', component: GenresComponent },
          { path: 'reports', component: ReportsComponent },
        ],
      },
];
