# EarthQuack

## Schema
See [schema.ts](./schema.ts).

For **Earthquake.id** just use the identifier returned from _earthquake.usgs.gov_.

On one side the bare minimum would be to keep **Earthquake** type as **{id, date, countryOrUsaState}**.  
The task does not mention what data to return to the caller. Pretty much an **ID** would be enough.  
But this seems pointless from a front-end perspective.  
The properties **place** and **time** returned from _earthquake.usgs.gov_ are a minimum I as a human would want to know about an earthquake - a bit more location than just a country and a bit more precision than a date.
Tough to say without knowing more about the use cases.

Bear in mind that the getter takes a date, not a **time** and a country/state not a full **place** description as returned from _earthquake.usgs.gov_.

I count deleting an entity as an operation of editing the details of an earthquake.
Hence, to mutations, not one.

GraphQL does not allow to return nothing, so I am minimising the response load to an ID.

**date** and **countryOrUsaState** are both typed as _String_ for now but I am inclined to change that to dedicated scalars.


## Implementation

Tu run the server:
```
git clone ... <dir>
cd <dir>
npm install
npx tsc
npm start
```
or
```
git clone ... <dir>
cd <dir>
npm install
npm run start:dev
```

Also see [transfer functions](./src/transferFunctions.ts).

I would think about setting a GraphQL endpoint to trigger manually the _daily sync_.

### Database
For the moment the database is only saved as is in a file **data.json** by function **updateDb**.  
Which does not _update_ really, but only overwrites. This should be changed.

The DB is being roughly formatted by JSON.stringify to debug easily.  
This should not be present in a production environment.

As this whole service resembles a cache - an option to consider would be **Redis** (or sth similar) not even a permanent DB.

The data is being saved as returned from the master service, which is a lot of data.  
This is also considered to be WIP and very suboptimal, but only responses were to be optimal ;-)


### Daily function
As a daily function **transferEarthquakeData** should suffice.  
Depending on the use case I see a few scenarios:
 - The daily sync only picks up data from the new day - the two **transferEarthquakeData** arguments should be _today_ and _tomorrow_.
 - The daily sync assumes that some data from the recent past might have been updated - the two **transferEarthquakeData** arguments should be _a date from the past_ and _tomorrow_.
 - The daily sync assumes that any past data might have been updated - the two **transferEarthquakeData** arguments should be the system's _epoch_ and _tomorrow_.

### Tests
To run tests:
```
npm test
```
TODOs: Better mocking, more test cases.  
Yet not testing file saving.

### ASAP Todos
 - [tomorrowsDate](./src/helpers.ts) needs a dedicated module to be handled correctly.  
Right now it is basically a stub.
 - [updateDb](./src/transferFunctions.ts) does not update at the moment.
 - Error handling is not existent.
 - a CI/CD would be very nice!
