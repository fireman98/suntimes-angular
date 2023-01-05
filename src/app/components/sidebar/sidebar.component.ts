import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { Route, Router } from '@angular/router'

@Component({
  selector: 'page-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() active = false

  @Output() sidebaroff = new EventEmitter()

  //Define additional routes that not belong to the application
  additional_routes = [
    {
      name: "Github",
      path: "https://github.com/fireman98/suntimes-angular",
    },
  ]

  // TODO: active link color
  constructor(private router: Router) {
  }

  getTitle (route: Route) {
    if (!(typeof route === "object" && route !== null)) return "Invalid input"

    if (route.data && typeof route.data['title'] === 'string' && route.data['title']) return route.data['title']

    if (route.title) return route.title

    if (route.path) return route.path

    return ""
  }

  get routes () {
    return this.router.config
  }

  ngOnInit (): void {
  }

}
