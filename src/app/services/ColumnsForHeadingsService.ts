import { GetTimesResultLuxon } from './../classes/SuntimesUtility'
import SunCalc from 'suncalc'
import { DateTime } from 'luxon'
import { Injectable } from "@angular/core"
import { SuntimesViewType } from "@app/interfaces/Suntimes"
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs"
import SuntimesUtility from '@app/classes/SuntimesUtility'
import { formatTime } from '@app/utils/LuxonUtility'


@Injectable({
    providedIn: "platform"
})

export default class ColumnsForHeadingsService {

    lng = new BehaviorSubject(0)
    lat = new BehaviorSubject(0)

    constructor() {
        /*
        TODO
          const settingsStore = useSettingsStore()
           const { lng, lat } = storeToRefs(settingsStore)
        */
    }

    setup (headings: BehaviorSubject<string[]>, date: BehaviorSubject<DateTime>) {
        const _ISODate = new BehaviorSubject(date.value.toISODate())
        const ISODate = date.subscribe((newVal) => {
            _ISODate.next(newVal.toISODate())
        })

        const computeTimesResult = ([date, lat, lng]: [DateTime, number, number]) => {
            return SuntimesUtility.transformGetTimesResultDatesToLuxon(
                SunCalc.getTimes(date.toJSDate(), lat, lng)
            )
        }
        const timesResult = combineLatest([date, this.lat, this.lng]).pipe(map(([date, lat, lng]) => {
            return computeTimesResult([date, lat, lng])
        }))

        const _timesResult = new BehaviorSubject<GetTimesResultLuxon>(computeTimesResult([date.value, this.lat.value, this.lng.value]))
        timesResult.subscribe((newVal) => {
            _timesResult.next(newVal)
        })

        const columns = combineLatest([headings, _ISODate, timesResult]).pipe(map(([headings, _ISODate, timesResult]) =>
            headings.map(x => {
                switch (x) {
                    case "date":
                        return _ISODate
                    case "sunrise":
                        return formatTime(timesResult.sunrise)

                    case "sunset":
                        return formatTime(timesResult.sunset)

                    case "dusk":
                        return formatTime(timesResult.dusk)

                    case "dawn":
                        return formatTime(timesResult.dawn)


                    default:
                        return ""
                }

            })
        ))
        const _columns = new BehaviorSubject<string[]>([])
        columns.subscribe(newVal => {
            _columns.next(newVal)
        })

        return {
            _ISODate,
            timesResult,
            _timesResult,
            columns,
            _columns
        }
    }

}