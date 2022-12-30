import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesViewComponent } from './times-view.component';

const routes: Routes = [{ path: '', component: TimesViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesViewRoutingModule { }
