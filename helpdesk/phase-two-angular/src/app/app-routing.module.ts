import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {OperatorDashboardComponent} from './operator-dashboard/operator-dashboard.component';
import {ExistingIssuesComponent} from './existing-issues/existing-issues.component';
import {SpecialistDashboardComponent} from './specialist-dashboard/specialist-dashboard.component';
import {NewIssueComponent} from './new-issue/new-issue.component';
import {AuthGuard} from './_guard/auth.guard';
import {IssueFormComponent} from './issue-form/issue-form.component';
import {AnalysisComponent} from "./analysis/analysis.component";
import {UnauthorisedErrorComponent} from "./unauthorised-error/unauthorised-error.component";


const routes: Routes =
  [
    { path: 'issue/:id',
      component: IssueFormComponent,
      canActivate: [AuthGuard],
      data: {breadcrumb: 'Issue'}
    },
    {
      path: 'operator-dashboard',
      component: OperatorDashboardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'Operator Dashboard'
      },
      children:
        [
          {
            path: 'new-issue',
            component: NewIssueComponent,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: 'New Issue'
            }
          },
          {
            path: 'existing-issue',
            component: ExistingIssuesComponent,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: 'Existing Issues'
            },
            children: [
              {
                path: 'issues/:id',
                component: IssueFormComponent,
                canActivate: [AuthGuard],
                data: {
                  breadcrumb: 'Issue'
                }
              }
            ]
          }
        ]
    },
    {
      path: 'specialist-dashboard',
      component: SpecialistDashboardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'Specialist Dashboard'
      },
      children: [
        {
          path: 'issue/:id',
          component: IssueFormComponent,
          canActivate: [AuthGuard],
          data: {
            breadcrumb: 'Issue'
          }
        }
      ]
    },
    {
      path: 'analyst',
      component: AnalysisComponent,
      data: {
        breadcrumb: 'Analyst'
      }
    },
    {
      path: '',
      component: LoginComponent,
      data: {
        breadcrumb: 'Login'
      }
    },
    {
      path: '401',
      component: UnauthorisedErrorComponent,
      data: {
        breadcrumb: '401 Error'
      }
    },
     {path: '**', redirectTo: ''}
  ];

@NgModule({
  /*import the routes mentioned above and to see the navigations*/
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
