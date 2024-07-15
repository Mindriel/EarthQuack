import { EARTHQUAKE_QUERY_URL } from './consts'
import fs from "fs/promises";

interface UsgsResponse {    // for version 1.14.1
    type: string
    metadata: {
        status: number
        count: number
    }
    features: [{
        type: string
        properties: {
            place: string   // Point of interest 1
            time: number    // Point of interest 2
        }
        geometry: {}
        id: string          // Point of interest 3
    }]
    bbox: []
}

export function transferEarthquakeData(starttime:string, endtime:string, format='geojson') {
    const url = EARTHQUAKE_QUERY_URL
        + `?format=${format}`
        + `&starttime=${starttime}`
        + `&endtime=${endtime}`

    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            return json as UsgsResponse
        })
}

export function updateDb(data: UsgsResponse) {
    return fs.writeFile('./data.json', JSON.stringify(data, null, 2))
}
