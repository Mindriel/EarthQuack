import server from './server'
import { transferEarthquakeData, updateDb } from './transferFunctions'
import {PORT, SERVICE_START_DATE} from './consts'
import { tomorrowsDate } from './helpers'

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);

    transferEarthquakeData(SERVICE_START_DATE, tomorrowsDate())
        .then(data => updateDb(data))
        .then(_ => {
            console.log('--> DB update done.')
        })
});
