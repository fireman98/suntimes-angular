import { Injectable } from "@angular/core"
import { NominatimPlace } from "@app/interfaces/Suntimes"
import axios from "axios"

const assembleGeocodeURLFromAddress = (address: string) => {

    return encodeURI(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
}

@Injectable({
    providedIn: "platform"
})
export default class GeocodeService {

    constructor() {

    }

    async geocode (address: string): Promise<NominatimPlace> {
        try {
            const res = await axios.get<NominatimPlace[]>(assembleGeocodeURLFromAddress(address))

            if (!res.data.length)
                throw new Error("Not found")

            const place = res.data[0]
            return place

        } catch (err) {
            console.error("geocode failed :(")
            throw new Error("Error")
        }
    }
}