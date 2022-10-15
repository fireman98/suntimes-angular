import { TestBed } from '@angular/core/testing'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeViewComponent } from './views/home-view/home-view.component'
import { TimesViewComponent } from './views/times-view/times-view.component'
import { AboutViewComponent } from './views/about-view/about-view.component'

// TODO dynamic load
const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'times/sun', component: TimesViewComponent },
  { path: 'about', component: AboutViewComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
