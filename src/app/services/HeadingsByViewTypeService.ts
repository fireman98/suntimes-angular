import { Injectable } from "@angular/core"
import { SuntimesViewType } from "@app/interfaces/Suntimes"
import { BehaviorSubject, map, Observable } from "rxjs"

const sunViewHeadings = ["date", "dawn", "sunrise", "sunset", "dusk"]
const otherHeadings: Array<string> = ["date", "moonrise"]

@Injectable({
    providedIn: "platform"
})

export default class HeadingsByViewTypeService {

    constructor() {

    }

    setup (viewType: Observable<SuntimesViewType>) {
        const headings = viewType.pipe(map((viewType) => {
            return viewType === SuntimesViewType.SUN ? sunViewHeadings : otherHeadings
        }))
        let _headings = new BehaviorSubject(otherHeadings)

        headings.subscribe((newVal) => _headings.next(newVal))

        return {
            headings,
            _headings
        }
    }

}