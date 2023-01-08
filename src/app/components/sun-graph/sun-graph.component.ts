import { DateTime } from 'luxon'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { ActiveElement, CategoryScale, Chart, Decimation, Filler, LinearScale, LineController, LineElement, PointElement, ScriptableLineSegmentContext, Tooltip, ChartConfiguration } from 'chart.js'
import { getSunPathForDay } from '@app/classes/SuntimesUtility'
import { debounce, formatTime } from '@app/helpers/General'
import { BehaviorSubject, combineLatest, forkJoin, map } from 'rxjs'

Chart.register(LinearScale, LineController, CategoryScale, PointElement, LineElement, Filler, Tooltip, Decimation)

@Component({
  selector: 'sun-graph',
  templateUrl: './sun-graph.component.html',
  styleUrls: ['./sun-graph.component.scss']
})
export class SunGraphComponent implements OnInit {

  @Input() set date (date: DateTime) {
    if (this.date$.value.valueOf() !== date.valueOf())
      this.date$.next(date)
  }
  date$ = new BehaviorSubject<DateTime>(DateTime.now())
  @Input() set activePoint (activePoint: number) {
    if (this.activePoint$.value !== activePoint)
      this.activePoint$.next(activePoint)
  }
  activePoint$ = new BehaviorSubject<number>(0)
  @Input() set labelColor (labelColor: string) {
    this.labelColor$.next(labelColor)
  }
  labelColor$ = new BehaviorSubject<string>("#ffffff")
  @Input() set animate (animate: boolean) {
    if (this.animate$.value !== animate)
      this.animate$.next(animate)
  }
  animate$ = new BehaviorSubject<boolean>(true)

  lng = new BehaviorSubject<number>(0)
  lat = new BehaviorSubject<number>(0)

  constructor() {
    // TODO
    // const settingsStore = useSettingsStore()
    // const { lng, lat } = storeToRefs(settingsStore)

  }

  dayData = combineLatest([this.date$, this.lng, this.lat]).pipe(map(([date, lng, lat]) => getSunPathForDay(date, lat, lng)))
  _dayData: ReturnType<typeof getSunPathForDay> | undefined

  labelsForChart: Array<string> = []
  altitudes: Array<{ x: number, y: number }> = []

  chart: Chart | null = null


  readonly config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.labelsForChart,
      datasets: [
        {
          label: 'Sun',
          data: this.altitudes,
          tension: 0,
          backgroundColor: 'rgba(255, 201, 78, 0.4)',
          borderColor: [
            '#FFC94E',
          ],
          borderWidth: 5,
          pointRadius: (element: any) => {
            return [this.activePoint$.value].includes(element.index) ? 8 : 0
          },
          segment: {
            borderColor: (element: ScriptableLineSegmentContext) => {
              return element.p0.parsed.x > (this.activePoint$.value || 0) ? 'rgba(2, 1, 85, 0.4)' : 'rgba(255, 201, 78, 0.4)'
            },
            backgroundColor: (element: ScriptableLineSegmentContext) => {
              return element.p0.parsed.y < 0 ? 'rgba(2, 1, 85, 0.4)' : 'rgba(255, 201, 78, 0.4)'
            },
            //borderDash: ctx => skipped(ctx, [6, 6]),
          },
          pointHoverRadius: 12,
          fill: true,
          spanGaps: true,
        },
      ]
    },
    options: {
      animation: this.animate$.value ? undefined : false,
      parsing: false,

      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        /*decimation: {
            enabled: false,
            algorithm: 'min-max',
        },*/
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
          mode: "index",
          callbacks: {
            label: (input) => {
              return `Altitude ${input.parsed.y.toFixed(2)} \n Azimuth ${this._dayData?.[input.parsed.x].azimuth.toFixed(2)}`
            }
          }
        }
      },
      scales: {
        y: {
          min: -90,
          max: 90,

          ticks: {
            color: this.labelColor,
          }
        },

        x: {
          ticks: {
            color: this.labelColor,
          }
        }


      },
      responsive: true
    },
  }

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>

  updateChart = debounce(() => {
    if (!this.chart)
      return

    this.chart.update()
  }, 500)

  ngOnInit (): void {
    this.dayData.subscribe(newVal => {
      this._dayData = newVal
      for (let i = 0; i < newVal.length; i++) {
        this.labelsForChart[i] = formatTime(newVal[i].time)
        this.altitudes[i] = { x: i, y: newVal[i].altitude }
      }
      this.updateChart()
    })

    this.labelColor$.subscribe(newVal => { // Update label colors
      if (!this.chart)
        return

      const xTicks = this.chart.options.scales?.['x']?.ticks
      const yTicks = this.chart.options.scales?.['y']?.ticks

      if (xTicks)
        xTicks.color = newVal
      if (yTicks)
        yTicks.color = newVal

      this.updateChart()
    })

    combineLatest([this.activePoint$, this.animate$]).pipe(map(([activePoint, animate]) => {
      this.config.options!.animation = animate ? undefined : false;
      (this.config as any).data.datasets[0].pointRadius = (element: ActiveElement) => {
        return [activePoint].includes(element.index) ? 8 : 0
      }

      (this.config as any).data.datasets[0].segment.borderColor = (element: any) => {
        return element.p0.parsed.x > (activePoint || 0) ? 'rgba(2, 1, 85, 0.4)' : 'rgba(255, 201, 78, 0.4)'
      }

      (this.config as any).options.plugins.tooltip.callbacks.label = (input: any) => {
        return `Altitude ${input.parsed.y.toFixed(2)} \n Azimuth ${this._dayData?.[input.parsed.x].azimuth.toFixed(2)}`
      }

    }))
  }

  ngAfterViewInit () {
    this.activePoint$.subscribe(newVal => {
      if (this.chart)
        this.updateChart()
      else
        this.chart = new Chart(this.canvas.nativeElement, this.config)
    })


  }
}
