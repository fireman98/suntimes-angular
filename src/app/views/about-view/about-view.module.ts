import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutViewRoutingModule } from './about-view-routing.module';
import { AboutViewComponent } from './about-view.component';


@NgModule({
  declarations: [
    AboutViewComponent
  ],
  imports: [
    CommonModule,
    AboutViewRoutingModule
  ]
})
export class AboutViewModule { }
