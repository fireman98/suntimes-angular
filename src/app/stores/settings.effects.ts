import { Injectable } from "@angular/core"
import { Actions, Effect } from "@ngrx/effects"
import { ofType } from "@ngrx/effects/src"
import { Store } from "@ngrx/store"
import localforage from "localforage"
import { map, pipe, withLatestFrom } from "rxjs"
import { ActionTypes } from "./settings.actions"

const db = localforage.createInstance({
    name: "storage"
})

@Injectable()
export class SettingsEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    /*@Effect()
    saveToLocalStorage$ = this.actions$
        .pipe(
            ofType(ActionTypes.SaveToLocalStorage),
            withLatestFrom(this.store.select('settings'))
                .map(async () => {
                    await db.setItem('useSkyEffect', state.useSkyEffect)
                    await db.setItem('lng', state.lng)
                    await db.setItem('lat', state.lat)
                })
        )*/


}