import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesViewRoutingModule } from './times-view-routing.module';
import { TimesViewComponent } from './times-view.component';


@NgModule({
  declarations: [
    TimesViewComponent
  ],
  imports: [
    CommonModule,
    TimesViewRoutingModule
  ]
})
export class TimesViewModule { }
