import { TestBed } from '@angular/core/testing'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', title: 'home', loadChildren: () => import("./views/home-view/home-view.module").then(m => m.HomeViewModule) },
  { path: 'times/sun', title: 'timesData', loadChildren: () => import("./views/times-view/times-view.module").then(m => m.TimesViewModule) },
  { path: 'about', title: 'about', loadChildren: () => import("./views/about-view/about-view.module").then(m => m.AboutViewModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
