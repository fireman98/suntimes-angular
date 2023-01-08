import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { SunGraphComponent } from './../components/sun-graph/sun-graph.component'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SunGraphComponent
    ],
    exports: [
        SunGraphComponent
    ]
})

export class SungraphModule { }
