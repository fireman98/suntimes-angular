import { selectSettings } from './settings.reducer'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject, Injectable } from "@angular/core"
import { select, Store } from "@ngrx/store"
import localforage from "localforage"
import { map, switchMap } from "rxjs"
import { ActionTypes, doneLoadFromLocalStorage, saveToLocalStorage } from "./settings.actions"

const db = localforage.createInstance({
    name: "storage"
})

@Injectable()
export class SettingsEffects {
    private actions$ = inject(Actions)
    private store = inject(Store)

    constructor(
    ) { }

    saveToLocalStorage$ = createEffect(() => this.actions$
        .pipe(
            ofType(ActionTypes.SaveToLocalStorage),
            switchMap(() => {
                return this.store.pipe(
                    select(selectSettings),
                    map(async state => {
                        await db.setItem('useSkyEffect', state.useSkyEffect)
                        await db.setItem('lng', state.lng)
                        await db.setItem('lat', state.lat)
                    })
                )
            })
        ), { dispatch: false });

    loadFromLocalStorage$ = createEffect(() => this.actions$
        .pipe(
            ofType(ActionTypes.LoadFromLocalStorage),
            switchMap(async () => {
                const useSkyEffect = await db.getItem<boolean>('useSkyEffect') ?? true
                const lng = await db.getItem<number>('lng') ?? 0
                const lat = await db.getItem<number>('lat') ?? 0
                return new doneLoadFromLocalStorage({ lng, lat, useSkyEffect })
            })
        ));

    reset$ = createEffect(() => this.actions$
        .pipe(
            ofType(ActionTypes.Reset),
            map(() => new saveToLocalStorage())
        ))
}