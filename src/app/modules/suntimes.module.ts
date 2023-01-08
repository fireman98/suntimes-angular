import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { CommonModule } from '@angular/common'

import { SuntimesComponent } from '@app/components/suntimes/suntimes.component'
import { GeneralSettingsComponent } from '@app/components/general-settings/general-settings.component'
import { TimeSelectorComponent } from '@app/components/time-selector/time-selector.component'
import { LocationSettingsComponent } from '@app/components/location-settings/location-settings.component'
import { SunGraphComponent } from './../components/sun-graph/sun-graph.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        SuntimesComponent,
        GeneralSettingsComponent,
        TimeSelectorComponent,
        LocationSettingsComponent,
        SunGraphComponent
    ],
    exports: [
        SuntimesComponent
    ]
})

export class SuntimesModule { }
