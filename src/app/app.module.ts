import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeViewComponent } from './views/home-view/home-view.component';
import { TimesViewComponent } from './views/times-view/times-view.component';
import { AboutViewComponent } from './views/about-view/about-view.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    TimesViewComponent,
    AboutViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
