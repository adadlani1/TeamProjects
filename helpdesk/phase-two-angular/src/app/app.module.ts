import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NewIssueFooterComponent } from './new-issue-footer/new-issue-footer.component';
import { LoginErrorMessageComponent } from './login-error-message/login-error-message.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ProblemTypeTreeComponent } from './problem-type-tree/problem-type-tree.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatTreeModule, MatButtonModule} from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';


import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';
import { OperatorDashboardButtonComponent } from './operator-dashboard-button/operator-dashboard-button.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SpecialistReferralComponent } from './modals/specialist-referral/specialist-referral.component';
// tslint:disable-next-line:max-line-length
import { SpecialistInfoForReferralComponent } from './modals/specialist-referral/specialist-info-for-referral/specialist-info-for-referral.component';

import { ExistingIssuesComponent } from './existing-issues/existing-issues.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { IndividualAnalysisComponent } from './individual-analysis/individual-analysis.component';

import { ProblemTreeComponent } from './issue-form/problem-tree/problem-tree.component';
import { AccordionComponent } from './accordion/accordion.component';
import { SpecialistIssueDescComponent } from './specialist-issue-desc/specialist-issue-desc.component';
import { AccordionNewIssueComponent } from './accordion-new-issue/accordion-new-issue.component';
import { NewIssueContentComponent } from './new-issue-content/new-issue-content.component';
import { SpecialistDashboardComponent } from './specialist-dashboard/specialist-dashboard.component';
import {NewIssueComponent} from './new-issue/new-issue.component';
import {IssueFormComponent} from './issue-form/issue-form.component';
import { NotificationsComponent } from './navbar/notifications/notifications.component';
import {PushNotificationsModule} from 'ng-push';
import { ProblemSolvedComponent } from './modals/problem-solved/problem-solved.component';
import {AuthGuard} from './_guard/auth.guard';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { SimilarIssueComponent } from './modals/similar-issue/similar-issue.component';
import {ExistingIssuesModule} from './existing-issues/existing-issues.module'
import {AuthInterceptor} from "./_intercepts/auth-interceptor";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import { DownloadRawDataComponent } from './analysis/download-raw-data/download-raw-data.component';
import { GraphsComponent } from './analysis/graphs/graphs.component';
import { GraphsOverallComponent } from './analysis/graphs-overall/graphs-overall.component';
import {AppService} from "./_services/app.service";
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';
import { UnauthorisedErrorComponent } from './unauthorised-error/unauthorised-error.component';
import { SimilarIssueFormComponent } from './modals/similar-issue-form/similar-issue-form.component';
import { DisplaySimilarIssueComponent } from './modals/display-similar-issue/display-similar-issue.component';
import { SaveConfirmationComponent } from './modals/save-confirmation/save-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProblemTypeTreeComponent,
    BreadcrumbComponent,
    NewIssueFooterComponent,
    LoginErrorMessageComponent,
    OperatorDashboardComponent,
    OperatorDashboardButtonComponent,
    LoginComponent,
    SpecialistReferralComponent,
    SpecialistInfoForReferralComponent,
    ExistingIssuesComponent,
    AnalysisComponent,
    IndividualAnalysisComponent,
    NewIssueComponent,
    IssueFormComponent,
    ProblemTreeComponent,
    AccordionComponent,
    SpecialistIssueDescComponent,
    AccordionNewIssueComponent,
    NewIssueContentComponent,
    SpecialistDashboardComponent,
    NewIssueComponent,
    IssueFormComponent,
    NotificationsComponent,
    ProblemSolvedComponent,
    SimilarIssueComponent,
    DownloadRawDataComponent,
    GraphsComponent,
    GraphsOverallComponent,
    SpinnerLoadingComponent,
    UnauthorisedErrorComponent,
    SimilarIssueFormComponent,
    DisplaySimilarIssueComponent,
    SaveConfirmationComponent

  ],
    imports: [
        BrowserModule,
        PushNotificationsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        MatTreeModule,
        ChartsModule,
        MatButtonModule,
        MatIconModule,
        NgxEchartsModule,
        NgbModule,
        ReactiveFormsModule,
        PushNotificationsModule,
        NgbModule,
        MatExpansionModule,
        MatInputModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatCardModule,
        ExistingIssuesModule,
    ],
  providers: [AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AppService],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerLoadingComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
