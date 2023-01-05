import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'suntimes-angular';
  sidebarActive = false
  routeClass = ""

  constructor() {
    // TODO
    //const settingsStore = useSettingsStore()

    //settingsStore.loadFromLocalStorage()

    this.unfocusButtonIfnotKeyboard = this.unfocusButtonIfnotKeyboard.bind(this)
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
