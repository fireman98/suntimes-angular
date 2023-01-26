import { rootReducer } from './stores/index'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { settingsReducer } from './stores/settings.reducer'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SettingsEffects } from './stores/settings.effects'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([SettingsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
