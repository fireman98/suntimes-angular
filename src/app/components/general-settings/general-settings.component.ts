import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  @Output() close = new EventEmitter<void>()

  useSkyEffect = true

  constructor() {
    //const settingsStore = useSettingsStore() TODO: store
    //const { useSkyEffect } = storeToRefs(settingsStore)
  }

  load () {
    // await settingsStore.loadFromLocalStorage()
    this.close.emit()
  }

  async resetDefaults () {
    //settingsStore.reset()
    this.close.emit()
  }

  async save () {
    //await settingsStore.saveToLocalStorage()
    this.close.emit()
  }

  ngOnInit (): void {
  }

  async ngOnDestroy () {
    await this.load()
  }

}
