import { SuntimesViewType } from './../../interfaces/Suntimes'
import { Component, OnInit } from '@angular/core'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-times-view',
  templateUrl: './times-view.component.html',
  styleUrls: ['./times-view.component.scss']
})
export class TimesViewComponent implements OnInit {

  from = DateTime.now().startOf("month")
  viewType = SuntimesViewType.SUN

  get to () {
    return this.from.endOf("month")
  }

  get monthName () {
    return this.from.toFormat("LLLL")
  }

  constructor() { }

  ngOnInit (): void {
  }

}
