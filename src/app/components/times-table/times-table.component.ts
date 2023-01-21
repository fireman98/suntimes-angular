import { SuntimesViewType } from './../../interfaces/Suntimes'
import { DateTime } from 'luxon'
import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import HeadingsByViewTypeService from '@app/services/HeadingsByViewTypeService'

@Component({
  selector: 'times-table',
  templateUrl: './times-table.component.html',
  styleUrls: ['./times-table.component.scss']
})
export class TimesTableComponent implements OnInit {

  @Input() set from (from: DateTime) {
    if (this.from$.value.valueOf() === from.valueOf())
      return
    this.from$.next(from)
  }
  from$ = new BehaviorSubject(DateTime.now())
  @Input() set to (to: DateTime) {
    if (this.to$.value.valueOf() === to.valueOf())
      return
    this.to$.next(to)
  }
  to$ = new BehaviorSubject(DateTime.now())

  @Input() set viewType (viewType: SuntimesViewType) {
    this.viewType$.next(viewType)
  }
  viewType$ = new BehaviorSubject(SuntimesViewType.SUN)

  headings
  _headings

  constructor(headingsByViewTypeService: HeadingsByViewTypeService) {
    const days = combineLatest([this.from$, this.to$]).pipe(map(([from, to]) => {
      const days = to.plus({ days: 1 }).diff(from, "day").days

      return Array.from({ length: days }, (v, i) =>
        from.plus({ days: i })
      )
    }))

    days.subscribe((newVal) => {
      this._days = newVal
    })

    const { headings, _headings } = headingsByViewTypeService.setup(this.viewType$)
    this.headings = headings
    this._headings = _headings
  }

  _days: DateTime[] = []

  ngOnInit (): void {
  }

}
