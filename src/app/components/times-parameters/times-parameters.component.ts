import { BehaviorSubject } from 'rxjs'
import { SuntimesViewType } from './../../interfaces/Suntimes'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DateTime } from 'luxon'

@Component({
  selector: 'times-parameters',
  templateUrl: './times-parameters.component.html',
  styleUrls: ['./times-parameters.component.scss']
})
export class TimesParametersComponent implements OnInit {

  @Input() from = DateTime.now()
  @Input() viewType = SuntimesViewType.SUN

  @Output() fromChange = new EventEmitter<DateTime>()
  @Output() viewTypeChange = new EventEmitter<SuntimesViewType>()

  readonly SuntimesViewTypeValues = Object.values(SuntimesViewType)

  get fromAsISODate () {
    return this.from.toISODate()
  }

  set fromAsISODate (val) {
    this.fromChange.emit(DateTime.fromISO(val).startOf('month'))
  }

  goLeft () {
    this.fromAsISODate = this.from.plus({ month: -1 }).toISODate()
  }

  goRight () {
    this.fromAsISODate = this.from.plus({ month: 1 }).toISODate()
  }

  updateViewType (event: Event) {
    this.viewTypeChange.emit((event.target as HTMLInputElement).value as SuntimesViewType)
  }

  constructor() { }

  ngOnInit (): void {
  }

}
