import { settingsReducer, SettingsState } from "./settings.reducer"

export interface RootState {
    settings: SettingsState,
}

export const rootReducer =
    { settings: settingsReducer }
