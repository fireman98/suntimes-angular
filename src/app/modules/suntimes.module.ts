import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'

import { SuntimesComponent } from '@app/components/suntimes/suntimes.component'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SuntimesComponent
    ],
    exports: [
        SuntimesComponent
    ]
})

export class SuntimesModule { }
