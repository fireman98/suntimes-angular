import SunCalc from "suncalc"
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { DateTime } from "luxon"
import { formatYearMonthDayToISO } from "@app/utils/LuxonUtility"
import { SkyEffect } from '@app/classes/SkyEffect'
import strftime from "strftime"

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

  useSkyEffect: boolean
  lng: number
  lat: number

  now: Date
  tickTask: NodeJS.Timer | undefined
  tickInterval

  lastaltitude
  altituderate

  year = 0
  month = 0
  day = 0

  skyEffect

  generalSettingsActive
  locationSettingsActive

  styles

  constructor() {

    //const settingsStore = useSettingsStore() TODO: store
    //const { useSkyEffect, lng, lat } = storeToRefs(settingsStore)

    //settingsStore.loadFromLocalStorage()

    this.useSkyEffect = true
    this.lng = 0
    this.lat = 0

    this.now = new Date()
    this.tickTask = undefined
    this.tickInterval = 250

    this.lastaltitude = 0
    this.altituderate = 0

    this.year = 0
    this.month = 0
    this.day = 0

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

  get currentDayLuxon () {
    return DateTime.fromISO(formatYearMonthDayToISO(this.year, this.month, this.day))
  }

  get minuteOfDay () {
    return this.now.getHours() * 60 + this.now.getMinutes()
  }

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

  get sunTimes () {
    const _now = new Date(this.now as Date)
    const _times = SunCalc.getTimes(_now, this.lat, this.lng)

    return {
      ..._times,
      day_length: _times.sunset.getTime() - _times.sunrise.getTime(),
    }
  }

  get percentage () {
    if (!this.sunTimes.sunrise || !this.sunTimes.sunset || !this.now) return 0

    let _sunset = this.sunTimes.sunset.getTime(),
      _now = this.now.getTime()

    const _sunrise = this.sunTimes.sunrise.getTime()

    _now -= _sunrise
    _sunset -= _sunrise

    return (_now / _sunset) * 100
  }

  get sunPositionRaw () {
    return SunCalc.getPosition(this.now, this.lat, this.lng)
  }
  // TODO: sunPositionRaw Watch

  get sunPosition () {
    const _position = this.sunPositionRaw
    return {
      ..._position,
      altitude: radians_to_degrees(_position.altitude),
      azimuth: radians_to_degrees(_position.azimuth) + 180,
    }
  }

  // TODO: watchEffect skyEffect

  get backgroundColor () {
    if (!this.useSkyEffect)
      return { current: "#ffffff", next: "#ffffff", nextOpacity: 0 }

    return this.skyEffect.getLinearGradient()
  }

  get foregroundColor () {
    if (!this.useSkyEffect)
      return "black"

    return this.sunPosition.altitude > 10 ? "black" : "white"
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

  // TODO: watch backgroundColor
  // TODO: watch foregroundColor

  /**
   * Tick clock
   */
  tick () {
    this.now = new Date()
  }

  // Geolocate
  geolocate () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
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


  ngOnInit (): void {
    this.startTick()
  }

  ngOnDestroy () {
    this.stopTick()
  }

}
