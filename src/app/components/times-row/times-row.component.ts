import { SuntimesViewType } from './../../interfaces/Suntimes'
import { BehaviorSubject } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
import { DateTime } from 'luxon'
import ColumnsForHeadingsService from '@app/services/ColumnsForHeadingsService'

@Component({
  selector: '[times-row]',
  templateUrl: './times-row.component.html',
  styleUrls: ['./times-row.component.scss'],
  host: { 'class': 'times-row' }
})
export class TimesRowComponent implements OnInit {

  @Input() set date (date: DateTime) {
    if (this.date$.value.valueOf() === date.valueOf())
      return
    this.date$.next(date)
  }
  date$ = new BehaviorSubject(DateTime.now())

  @Input() viewType = SuntimesViewType.SUN

  @Input() set headings (headings: Array<string>) {
    this.headings$.next(headings)
  }
  headings$ = new BehaviorSubject<Array<string>>([])

  isOpened = false

  toggleIsOpened () {
    this.isOpened = !this.isOpened
  }

  constructor(columnsForHeadingsService: ColumnsForHeadingsService) {
    const { _columns } = columnsForHeadingsService.setup(this.headings$, this.date$)
    this._columns = _columns
  }

  _columns: BehaviorSubject<string[]>

  ngOnInit (): void {
  }

}
