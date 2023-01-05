import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebaron = new EventEmitter<void>()

  lastScrollTop = 0
  hidden = false
  ontop = true

  constructor() {
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  scrollHandler () {
    this.hidden = this.lastScrollTop < document.documentElement.scrollTop
    this.ontop = !document.documentElement.scrollTop
    this.lastScrollTop = document.documentElement.scrollTop
  }

  ngOnInit (): void {
    window.addEventListener("scroll", this.scrollHandler, { passive: true })
  }

  ngOnDestroyed (): void {
    window.removeEventListener("scroll", this.scrollHandler)
  }

}
