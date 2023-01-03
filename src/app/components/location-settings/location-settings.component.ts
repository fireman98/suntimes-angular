import GeocodeService from '@app/services/GeocodeService'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'location-settings',
  templateUrl: './location-settings.component.html',
  styleUrls: ['./location-settings.component.scss']
})
export class LocationSettingsComponent implements OnInit {

  @Input() lat = 0
  @Input() lng = 0

  @Output() latChange = new EventEmitter<number>()
  @Output() lngChange = new EventEmitter<number>()
  @Output() geolocate = new EventEmitter<void>()


  constructor(private geocodeService: GeocodeService) { }

  get Lat () {
    return this.lat
  }

  set Lat (val) {
    this.latChange.emit(val)
  }

  get Lng () {
    return this.lng
  }

  set Lng (val) {
    this.lngChange.emit(val)
  }

  address = ""
  addressDisplay = ""

  /**
    * Geocode address, if successful save coordinates to lat and lng
    */
  async geocodeAndSave () {
    try {
      this.addressDisplay = "..."
      const place = await this.geocodeService.geocode(this.address)
      this.Lat = Number(place.lat)
      this.Lng = Number(place.lon)
      this.addressDisplay = place.display_name
    } catch (err) {
      this.addressDisplay = "Not found"
    }
  }

  ngOnInit (): void {
  }

}
