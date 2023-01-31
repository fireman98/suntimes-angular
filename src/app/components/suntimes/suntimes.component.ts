import { saveToLocalStorage, SetLat, SetLng } from './../../stores/settings.actions'
import { selectUseSkyEffect, selectLng, selectLat } from './../../stores/settings.reducer'
import { rootReducer, RootState } from './../../stores/index'
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs'
import SunCalc, { GetSunPositionResult, GetTimesResult } from "suncalc"
import { Component, OnInit, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core'
import { DateTime } from "luxon"
import { formatYearMonthDayToISO } from "@app/utils/LuxonUtility"
import { SkyEffect } from '@app/classes/SkyEffect'
import strftime from "strftime"
import { select, Store } from '@ngrx/store'
import { loadFromLocalStorage } from '@app/stores/settings.actions'

function radians_to_degrees (radians: number) {
  const pi = Math.PI
  return radians * (180 / pi)
}

/**
 * Timespan in ms
 */
function format_timespan (timespan: number) {
  timespan = Math.floor(timespan / 1000)

  const hours = Math.floor(timespan / 3600)
  timespan = timespan % 3600
  const minutes = Math.floor(timespan / 60)
  timespan = timespan % 60
  const seconds = timespan

  let hours_s = String(hours),
    minutes_s = String(minutes),
    seconds_s = String(seconds)

  if (hours < 10) hours_s = "0" + hours
  if (minutes < 10) minutes_s = "0" + minutes
  if (seconds < 10) seconds_s = "0" + seconds

  return `${hours_s}:${minutes_s}:${seconds_s}`
}

enum Modal {
  GeneralSettings = 'GeneralSettings',
  LocationSettings = 'LocationSettings'
}

interface GetTimesResultWithDayLength extends GetTimesResult {
  day_length: number
}

interface SunPosition extends GetSunPositionResult {
  altitude: number,
  azimuth: number
}

@Component({
  selector: 'suntimes',
  templateUrl: './suntimes.component.html',
  styleUrls: ['./suntimes.component.scss']
})
export class SuntimesComponent implements OnInit {

  @Output() setRouteClass = new EventEmitter<string>();

  Modal = Modal
  strftime = strftime
  format_timespan = format_timespan

  useSkyEffect = new BehaviorSubject(true)
  lng = new BehaviorSubject(0)
  lat = new BehaviorSubject(0)

  useSkyEffect$
  lng$
  lat$

  setLat (val: number) {
    this.store.dispatch(new SetLat(val))
  }

  setLng (val: number) {
    this.store.dispatch(new SetLng(val))
  }

  now = new BehaviorSubject<Date>(new Date())
  tickTask: NodeJS.Timer | undefined
  tickInterval

  lastaltitude
  altituderate

  year = new BehaviorSubject<number>(0)
  month = new BehaviorSubject<number>(0)
  day = new BehaviorSubject<number>(0)

  skyEffect

  generalSettingsActive
  locationSettingsActive

  styles

  constructor(private store: Store<RootState>) {

    this.useSkyEffect$ = this.store.pipe(select(selectUseSkyEffect))
    this.lng$ = this.store.pipe(select(selectLng))
    this.lat$ = this.store.pipe(select(selectLat))

    this.useSkyEffect$.subscribe(newVal => {
      this.useSkyEffect.next(newVal)
    })

    this.lng$.subscribe(newVal => {
      this.lng.next(newVal)
    })

    this.lat$.subscribe(newVal => {
      this.lat.next(newVal)
    })


    this.store.dispatch(new loadFromLocalStorage())

    this.tickTask = undefined
    this.tickInterval = 250

    this.lastaltitude = 0
    this.altituderate = 0

    this.currentDayLuxon.subscribe(newVal => this._currentDayLuxon = newVal)
    this.now.subscribe(newVal => {
      if (this.year.value !== newVal.getFullYear()) this.year.next(newVal.getFullYear())
      if (this.month.value !== newVal.getMonth()) this.month.next(newVal.getMonth())
      if (this.day.value !== newVal.getDate()) this.day.next(newVal.getDate())

    })

    this.now.subscribe(newVal => {
      this._minuteOfDay = newVal.getHours() * 60 + newVal.getMinutes()
    })

    const computeSuntimes = ([now, lat, lng]: [ReturnType<typeof this.now.getValue>, ReturnType<typeof this.lat.getValue>, ReturnType<typeof this.lng.getValue>]) => {
      const _now = new Date(now as Date)
      const _times = SunCalc.getTimes(_now, lat, lng)

      return {
        ..._times,
        day_length: _times.sunset.getTime() - _times.sunrise.getTime(),
      }
    }
    this._sunTimes = computeSuntimes([this.now.getValue(), this.lat.getValue(), this.lng.getValue()])
    this.sunTimes = combineLatest([this.now, this.lat, this.lng]).pipe(map((input) => { return this._sunTimes = computeSuntimes(input) }))

    combineLatest([this.now, this.sunTimes]).pipe(map(([now, sunTimes]) => {
      if (!sunTimes.sunrise || !sunTimes.sunset || !now) return this._percentage = 0

      let _sunset = sunTimes.sunset.getTime()
      let _now = now.getTime()

      const _sunrise = sunTimes.sunrise.getTime()

      _now -= _sunrise
      _sunset -= _sunrise

      return this._percentage = (_now / _sunset) * 100
    })).subscribe()

    const computeSunPositionRaw = ([now, lat, lng]: [ReturnType<typeof this.now.getValue>, ReturnType<typeof this.lat.getValue>, ReturnType<typeof this.lng.getValue>]) => {
      return SunCalc.getPosition(now, lat, lng)
    }
    this._sunPositionRaw = computeSunPositionRaw([this.now.value, this.lat.value, this.lng.value])
    this.sunPositionRaw = combineLatest([this.now, this.lat, this.lng]).pipe(map((input) => {
      return this._sunPositionRaw = computeSunPositionRaw(input)
    }))

    this.sunPositionRaw.subscribe(newVal => {
      this.altituderate = radians_to_degrees(
        ((newVal.altitude - this.lastaltitude) / this.tickInterval) * 60000 * 5
      ) //one min
      this.lastaltitude = newVal.altitude
    })

    const computeSunPosition = (sunPositionRaw: typeof this._sunPositionRaw) => {
      const _position = sunPositionRaw
      return {
        ..._position,
        altitude: radians_to_degrees(_position.altitude),
        azimuth: radians_to_degrees(_position.azimuth) + 180,
      }
    }
    this._sunPosition = computeSunPosition(this._sunPositionRaw)
    this.sunPositionRaw.subscribe(newVal => {
      this._sunPosition = computeSunPosition(newVal)
    })

    combineLatest([this.lng, this.lat]).subscribe(() => {
      this.store.dispatch(new saveToLocalStorage())
    })

    // Maybe observable or getter / setter
    this.skyEffect = new SkyEffect({})

    this.generalSettingsActive = false
    this.locationSettingsActive = false

    this.styles = {
      backgroundSunCurrent: "#ffffff",
      backgroundSunNext: "#ffffff",
      foregroundSun: "#000000",
      backgroundSunPrimary: "#ffffff",
      opacitySunNext: 0,
    }

    this.tick = this.tick.bind(this)

  }

  currentDayLuxon = combineLatest([this.year, this.month, this.day]).pipe(map(([year, month, day]) => {
    return DateTime.fromISO(formatYearMonthDayToISO(year, month, day))

  }))
  _currentDayLuxon: DateTime = DateTime.now()

  _minuteOfDay: number = 0

  openModal (modal?: Modal) {
    this.generalSettingsActive = this.locationSettingsActive = false

    switch (modal) {
      case Modal.GeneralSettings:
        this.generalSettingsActive = true
        break
      case Modal.LocationSettings:
        this.locationSettingsActive = true
        break
    }
  }

  sunTimes: Observable<GetTimesResultWithDayLength>
  _sunTimes: GetTimesResultWithDayLength
  _percentage: number = 0
  sunPositionRaw: Observable<GetSunPositionResult>
  _sunPositionRaw: GetSunPositionResult
  _sunPosition: SunPosition


  get skyEffectUpdater () {
    if (!this.useSkyEffect.value)
      return

    return {
      altitude: Number(this._sunPosition?.altitude),
      direction: Boolean(this._percentage < 50)
    }
  }

  get backgroundColor () {
    if (!this.useSkyEffect.value)
      return { current: "#ffffff", next: "#ffffff", nextOpacity: 0 }

    return this.skyEffect.getLinearGradient()
  }

  // TODO: fix
  get foregroundColor () {
    if (!this.useSkyEffect.value)
      return "black"

    return this._sunPosition.altitude || 0 > 10 ? "black" : "white"
  }

  get styleForWrapper () {
    return {
      "--background-sun-current": this.styles.backgroundSunCurrent,
      "--background-sun-next": this.styles.backgroundSunNext,
      "--foreground-sun": this.styles.foregroundSun,
      "--background-sun-primary": this.styles.backgroundSunPrimary,
      "--opacity-sun-next": this.styles.opacitySunNext,
    }
  }

  watchBackgroundColor (newVal: typeof this.backgroundColor) {
    this.styles.backgroundSunCurrent = newVal.current
    this.styles.backgroundSunNext = newVal.next
    this.styles.backgroundSunPrimary =
      !this.useSkyEffect ? "white" : this._sunPosition?.altitude || 0 > 10 ? "white" : "black"
    this.styles.opacitySunNext = newVal.nextOpacity
  }

  watchForegroundColor (newVal: typeof this.foregroundColor) {
    this.styles.foregroundSun = newVal
  }

  /**
   * Tick clock
   */
  tick () {
    this.now.next(new Date())
  }

  // Geolocate
  geolocate () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(new SetLat(position.coords.latitude))
      this.store.dispatch(new SetLng(position.coords.longitude))
    })
  }


  //Start tick task
  startTick () {
    if (this.tickTask) return

    this.tickTask = setInterval(this.tick, this.tickInterval)
  }
  // Stop tick task
  stopTick () {
    clearInterval(this.tickTask)
    this.tickTask = undefined
  }

  oldBackgroundColor: typeof this.backgroundColor | undefined
  oldForegroundColor: typeof this.foregroundColor | undefined
  oldSkyEffectUpdater: typeof this.skyEffectUpdater | undefined
  ngDoCheck () {
    if (this.oldBackgroundColor !== this.backgroundColor) {
      this.watchBackgroundColor(this.backgroundColor)
    }
    this.oldBackgroundColor = this.backgroundColor
    if (this.oldForegroundColor !== this.foregroundColor) {
      this.watchForegroundColor(this.foregroundColor)
    }
    this.oldForegroundColor = this.foregroundColor

    if (this.oldSkyEffectUpdater !== this.skyEffectUpdater && this.skyEffectUpdater) {
      this.skyEffect.altitude = this.skyEffectUpdater.altitude
      this.skyEffect.direction = this.skyEffectUpdater.direction
    }
    this.oldSkyEffectUpdater = this.skyEffectUpdater


  }

  ngOnInit (): void {
    this.startTick()
  }

  ngOnDestroy () {
    this.stopTick()
  }

}
