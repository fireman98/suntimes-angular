import { SuntimesModule } from '@app/modules/suntimes.module'
import { HomeViewRoutingModule } from './home-view-routing.module'
import { NgModule } from '@angular/core'

import { HomeViewComponent } from './home-view.component'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    HomeViewRoutingModule,
    SuntimesModule
  ],
  declarations: [
    HomeViewComponent,
  ]
})

export class HomeViewModule { }
