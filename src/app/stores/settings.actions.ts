import { Action } from '@ngrx/store'

export enum ActionTypes {
    SaveToLocalStorage = '[Settings Component] saveToLocalStorage',
    LoadFromLocalStorage = '[Settings Component] loadFromLocalStorage',
    Reset = '[Settings Component] reset',
    SetLng = '[Settings Component] setLng',
    SetLat = '[Settings Component] setLat',
    SetUseSkyEffect = '[Settings Component] setUseSkyEffect'
}

export class saveToLocalStorage implements Action {
    readonly type = ActionTypes.SaveToLocalStorage;
}

export class loadFromLocalStorage implements Action {
    readonly type = ActionTypes.LoadFromLocalStorage;
}

export class reset implements Action {
    readonly type = ActionTypes.Reset;
}

export class SetLng implements Action {
    readonly type = ActionTypes.SetLng;

    constructor(public payload: number) {

    }
}

export class SetLat implements Action {
    readonly type = ActionTypes.SetLat;

    constructor(public payload: number) {

    }
}

export class SetUseSkyEffect implements Action {
    readonly type = ActionTypes.SetUseSkyEffect;

    constructor(public payload: boolean) {

    }
}