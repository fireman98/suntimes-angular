import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})

export class HomeViewComponent implements OnInit {

  constructor() { }

  setRouteClass (value: String) {
    throw new Error("Not implemented")
    return value
  }

  ngOnInit (): void {
  }

}
