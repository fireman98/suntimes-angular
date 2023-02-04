import { RootState } from '@app/stores'
import { Component } from '@angular/core'
import { loadFromLocalStorage } from './stores/settings.actions'
import { Store } from '@ngrx/store'
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'suntimes-angular';
  sidebarActive = false
  routeClass = ""

  showLoadingComponent = false
  showErrorComponent = false

  constructor(private store: Store<RootState>, private router: Router) {
    this.store.dispatch(new loadFromLocalStorage())

    this.unfocusButtonIfnotKeyboard = this.unfocusButtonIfnotKeyboard.bind(this)

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingComponent = true
        this.showErrorComponent = false
      }

      if (routerEvent instanceof NavigationError) {
        this.showErrorComponent = true
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.showLoadingComponent = false
      }
    })
  }

  unfocusButtonIfnotKeyboard () {
    //Blur active element if clicked or touched, but not if interacted by keyboard or accessibility tools
    const focused = document.activeElement

    if (!focused || !(focused instanceof HTMLElement)) return

    const tagnames = ["button"]
    if (!tagnames.includes(focused.tagName.toLowerCase())) return

    focused.blur()
  }

  ngOnInit (): void {
    window.addEventListener("mouseup", this.unfocusButtonIfnotKeyboard)
    window.addEventListener("touchend", this.unfocusButtonIfnotKeyboard)
  }

  ngOnDestroyed (): void {
    window.removeEventListener("mouseup", this.unfocusButtonIfnotKeyboard)
    window.removeEventListener("touchend", this.unfocusButtonIfnotKeyboard)

  }

  setRouteClass (className: string) {
    this.routeClass = className
  }
}
