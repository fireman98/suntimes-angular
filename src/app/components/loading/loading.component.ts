import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'loading-component',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    constructor() {

    }

    ngOnInit (): void {
        console.log("Loading...")
    }

    ngOnDestroyed (): void {
        console.log("loaded")
    }

}