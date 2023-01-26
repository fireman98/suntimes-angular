import { Action, createSelector } from '@ngrx/store'
import { ActionTypes, SetLat, SetLng, SetUseSkyEffect } from './settings.actions'
import { RootState } from "./index"

export interface SettingsState {
    useSkyEffect: boolean,
    lng: number,
    lat: number
}

export const initialState: SettingsState = {
    useSkyEffect: true,
    lng: 0,
    lat: 0
}

export function settingsReducer (state = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.SaveToLocalStorage:
            return state

        case ActionTypes.LoadFromLocalStorage:
            return state

        case ActionTypes.Reset:
            return initialState

        case ActionTypes.SetLat:
            return {
                ...state,
                lat: (action as SetLat).payload
            }

        case ActionTypes.SetLng:
            return {
                ...state,
                lng: (action as SetLng).payload
            }

        case ActionTypes.SetUseSkyEffect:
            return {
                ...state,
                useSkyEffect: (action as SetUseSkyEffect).payload
            }

        default:
            return state
    }
}

export const selectSettings = (state: RootState) => state.settings

export const selectUseSkyEffect = createSelector(
    selectSettings,
    (state: SettingsState) => state.useSkyEffect
)

export const selectLng = createSelector(
    selectSettings,
    (state: SettingsState) => state.lng
)

export const selectLat = createSelector(
    selectSettings,
    (state: SettingsState) => state.lat
)