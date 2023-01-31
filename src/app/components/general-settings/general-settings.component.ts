import { loadFromLocalStorage, reset, saveToLocalStorage, SetUseSkyEffect } from './../../stores/settings.actions'
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { RootState } from '@app/stores'
import { selectUseSkyEffect } from '@app/stores/settings.reducer'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  @Output() close = new EventEmitter<void>()

  useSkyEffect$

  setUseSkyEffect (val: boolean) {
    this.store.dispatch(new SetUseSkyEffect(val))
  }

  constructor(private store: Store<RootState>) {
    this.useSkyEffect$ = this.store.pipe(select(selectUseSkyEffect))
  }

  load () {
    this.store.dispatch(new loadFromLocalStorage())
    this.close.emit()
  }

  resetDefaults () {
    this.store.dispatch(new reset())
    this.close.emit()
  }

  save () {
    this.store.dispatch(new saveToLocalStorage())
    this.close.emit()
  }

  ngOnInit (): void {
  }

  async ngOnDestroy () {
    await this.load()
  }

}
