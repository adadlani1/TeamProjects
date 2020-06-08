import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Breadcrumb} from './breadcrumb';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  // variable stores all router events that take place and maps it to a function
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  // takes in the url and the breadcrumb option from the routing module
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    // If no routeConfig is available we are on the root path
    const label = route.routeConfig ? route.routeConfig.data.breadcrumb : '';
    const path = route.routeConfig ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time

    const nextUrl = this.GetPreviousURL();
    const breadcrumb = {
      label,
      url: nextUrl,
    };

    const newBreadcrumb = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumb);
    }
    return newBreadcrumb;
  }

  GetPreviousURL() {
    const urlSplit =  this.router.url.split('/');
    if (urlSplit[urlSplit.length - 2] === 'issues') {
      return urlSplit[1] + '/' + urlSplit[2];
    } else {
      return urlSplit[1];
    }
  }
}
