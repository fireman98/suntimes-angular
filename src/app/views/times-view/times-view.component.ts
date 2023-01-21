import { BehaviorSubject, map } from 'rxjs'
import { SuntimesViewType } from './../../interfaces/Suntimes'
import { Component, OnInit } from '@angular/core'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-times-view',
  templateUrl: './times-view.component.html',
  styleUrls: ['./times-view.component.scss']
})
export class TimesViewComponent implements OnInit {

  from = new BehaviorSubject(DateTime.now().startOf("month"))
  viewType = SuntimesViewType.SUN

  to = this.from.pipe(map((newVal => {
    return newVal.endOf("month")
  })))

  monthName = this.from.pipe(map(newVal => {
    return newVal.toFormat("LLLL")
  }))

  constructor() {
    this.to.subscribe(newVal => this._to = newVal)
    this.monthName.subscribe(newVal => this._monthName = newVal)
  }

  _to: DateTime = this.from.value.endOf("month")
  _monthName: string = this.from.value.toFormat("LLLL")

  ngOnInit (): void {
  }

}
