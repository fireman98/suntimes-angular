import { TimesTableComponent } from './../../components/times-table/times-table.component'
import { TimesParametersComponent } from './../../components/times-parameters/times-parameters.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TimesViewRoutingModule } from './times-view-routing.module'
import { TimesViewComponent } from './times-view.component'
import { FormsModule } from '@angular/forms'
import { TimesRowComponent } from '@app/components/times-row/times-row.component'
import { SungraphModule } from '@app/modules/sun-graph.module'
import { KeepAliveIf } from '@app/directives/keep-alive/keep-alive-if.directive'


@NgModule({
  declarations: [
    TimesViewComponent,
    TimesParametersComponent,
    TimesTableComponent,
    TimesRowComponent,
    KeepAliveIf,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimesViewRoutingModule,
    SungraphModule

  ]
})
export class TimesViewModule { }
