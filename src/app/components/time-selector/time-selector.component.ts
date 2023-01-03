import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgModel } from '@angular/forms'

class Period {
  name
  rangeMax
  rangeMin
  step
  getValue //Function; If parameter is number => return a date, else if parameter is undefined return number
  label

  constructor(
    name: string,
    rangeMax: number | (() => number),
    rangeMin: number | (() => number),
    step: number,
    getValue: (val?: any) => any,
    label: string
  ) {
    this.name = name
    this.rangeMax = rangeMax
    this.rangeMin = rangeMin
    this.step = step
    this.getValue = getValue
    this.label = label
  }
}

function days_of_a_year (year: number) {
  return isLeapYear(year) ? 366 : 365
}

function isLeapYear (year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

function dayOfYear (date: Date) {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const mn = date.getMonth()
  const dn = date.getDate()
  let dayOfYear = dayCount[mn] + dn
  if (mn > 1 && isLeapYear(date.getFullYear())) dayOfYear++
  return dayOfYear
}


@Component({
  selector: 'time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent implements OnInit {

  @Input() time: Date = new Date()

  @Output()
  timeChange = new EventEmitter<Date>();

  @Output() stopTick = new EventEmitter<void>()
  @Output() goNow = new EventEmitter<void>()


  constructor() { }

  get _time () {
    return this.time
  }

  set _time (val) {
    this.stopTick.emit()
    this.timeChange.emit(val)
  }

  periods: Period[] = [
    new Period(
      "year",
      () => {
        return days_of_a_year(this._time.getFullYear())
      },
      1,
      86400000,
      (val) => {
        val = Number(val)
        if (!isNaN(val)) {
          const tmpDate = new Date(this._time)
          tmpDate.setUTCMonth(0)
          tmpDate.setUTCDate(0)
          return new Date(tmpDate.getTime() + this.activePeriod.step * val)
        } else {
          return dayOfYear(this._time)
        }
      },
      "Év"
    ),

    new Period(
      "day",
      1439,
      0,
      3600000,
      (val) => {
        val = Number(val)
        if (!isNaN(val)) {
          const hours = Math.floor(val / 60)
          const minutes = val % 60
          const tmpDate = new Date(this._time)
          tmpDate.setHours(hours)
          tmpDate.setMinutes(minutes)
          return new Date(tmpDate)
        } else {
          return this._time.getHours() * 60 + this._time.getMinutes()
        }
      },
      "Nap"
    ),

    new Period(
      "hour",
      59,
      0,
      60000,
      (val) => {
        val = Number(val)
        if (!isNaN(val)) {
          const tmpDate = new Date(this._time)
          tmpDate.setMinutes(val)
          return new Date(tmpDate)
        } else {
          return this._time.getMinutes()
        }
      },
      "Óra"
    ),
  ]

  activePeriod = this.periods[1]

  get rangeValue () {
    return this.activePeriod.getValue()
  }

  set rangeValue (val) {
    this._time = this.activePeriod.getValue(val)
  }

  goLeft () {
    this.time = new Date(this._time.getTime() - this.activePeriod.step)
  }

  goRight () {
    this._time = new Date(this._time.getTime() + this.activePeriod.step)
  }

  get rangeMin () {
    return typeof this.activePeriod.rangeMin === 'function' ? this.activePeriod.rangeMin() : this.activePeriod.rangeMin
  }

  get rangeMax () {
    return typeof this.activePeriod.rangeMax === 'function'
      ? this.activePeriod.rangeMax()
      : this.activePeriod.rangeMax
  }

  ngOnInit (): void {
  }

}
