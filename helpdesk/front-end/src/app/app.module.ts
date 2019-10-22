import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {MatToolbarModule} from '@angular/material/typings/esm5/toolbar';
import {MatIconModule} from '@angular/material/typings/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent, DashboardHeaderComponent, DashboardComponent, DashboardComponent, LoginComponent]
})
export class AppModule { }
