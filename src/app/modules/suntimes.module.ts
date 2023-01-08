import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { CommonModule } from '@angular/common'

import { SuntimesComponent } from '@app/components/suntimes/suntimes.component'
import { GeneralSettingsComponent } from '@app/components/general-settings/general-settings.component'
import { TimeSelectorComponent } from '@app/components/time-selector/time-selector.component'
import { LocationSettingsComponent } from '@app/components/location-settings/location-settings.component'
import { SungraphModule } from './sun-graph.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SungraphModule
    ],
    declarations: [
        SuntimesComponent,
        GeneralSettingsComponent,
        TimeSelectorComponent,
        LocationSettingsComponent,
    ],
    exports: [
        SuntimesComponent
    ]
})

export class SuntimesModule { }
