---
sidebar_position: 4
---

# Subscribe to Real Time Updates

## Prerequisites
It may be helpful to view our guide on getting info.


## Introduction

Once you've found the `CompetitionUnit` of interest, you may want to subscribe to updates in real time, as the race
occurs live. 

This is accomplished using our Websockets endpoints. 

The most up to date and comprehensive docs for this use case are in GitHub.
Please complete the [Developer Program Form](https://docs.google.com/forms/d/e/1FAIpQLSfXTgxpeqaJ3sCNY4RV_iF7Ex9wbcv3rVjfV4xhCqypvm95Pw/viewform?usp=sf_link)
to be added to our repositories. 

Once you have been added to the org, you can view the documentation [here](https://github.com/sailing-yacht-research-foundation/streaming-server).

## Step 1) Authenticate
Again we must authenticate. We can use anonymous authentication for this use case, but you could also use your bot user.

Anonymous login requires a unique device Id for every session. We recommend doing this from the back end, but if you want to use a client app for
these requests please ensure you are providing a unique device Id such as a hardware identifier. 

Make a POST to `https://liveserver-dev.syrf.io/v1/auth/anonymous-login` with a body containing:
```
{ 
    "id":DEVICE-ID
    “devToken”: YOUR-DEVELOPER-API-KEY
}
```

The request will return a session token for you to store and use in further API requests.
```
myToken = result.body.token
```

Provide this session token as “token” bearer in the header of future requests.

## Step 2) Open a Websocket
Now that you have your session token, open a Websocket connection and tell us what data you'd like to subscribe to.

Open websocket on `wss://streaming-server.syrf.io/authenticate?session_token=' + myToken`

Send us the `CompetitionUnit` Id that you'd like to listen to:

```
ws.send({
 		 action: 'subscribe',
 		 data: {
   			competitionUnitId: 'COMPETITION-UNIT-ID',
 		 },
});
```

** You can also subscribe to just a single VesselParticipant:**

```
ws.send({
  action: 'subscribe',
  data: {
    vesselParticipantId: 'VESSEL-PARTICIPANT-ID',
  },
});
```

If the subscription command was successful you will recieve the following:

```
{
  "type": "command",
  "action": "subscribe",
  "success": true,
  "data": {
    "vesselParticipantId": "BLAH",
    "competitionUnitId": "BLAH"
  }
}
```


## Step 3) Listen for updates
Updates will be sent through the Websocket connection.
There are different types of updates which can be differentiated by looking at the `dataType` field.

### Position updates

```
{
  "type": "data",
  "dataType": "position",
  "data": {
    "lon": -80.205704,
    "lat": 25.70224,
    "heading": 122.991943359375,
    "twa": 5,
    "cog": 5,
    "sog": 5,
    "setDrift": 5,
    "elapsedTime": 1007,
    "timestamp": 1629383664772,
    "raceData": {
      "vesselParticipantId": "3c7b6ce9-e9c7-4bb6-b938-81e84f39e43a",
      "competitionUnitId": "babc1dc0-977d-48ff-92a9-e023c3894f3d",
      "participantId": "a58816e3-bfa9-4582-bb9c-89906c3dd06e",
      "userId": null,
      "publicId": "ad9c59c04ec745acc4eb7f2ff3bd8e0f3786042b2105135a2e290d8dd9f69237666c11f9902be668aa87a4107e5c16f9"
    }
  }
}
```

### Event updates

```
{
  "type": "data",
  "dataType": "event",
  "data": {
    "vesselParticipantId": "3c7b6ce9-e9c7-4bb6-b938-81e84f39e43a",
    "markId": "d58559f9-a5c9-452b-a0d3-3154ff8cbc92",
    "eventType": "VesselLineOutsideCrossing",
    "coordinates": ["-159.6410", "-9.8605"],
    "time": 1629389767002,
    "raceData": {
      "competitionUnitId": "babc1dc0-977d-48ff-92a9-e023c3894f3d",
      "vesselParticipantId": "3c7b6ce9-e9c7-4bb6-b938-81e84f39e43a"
    }
  }
}
```

### Mark track updates
Listen for mark-track updates to keep up on changes to the start line.

```
{
  "type": "data",
  "dataType": "mark-track",
  "data": {
    "lat": 25.697001,
    "lon": -80.203086,
    "elapsedTime": 1633934978866,
    "timestamp": 1633934978866,
    "raceData": {
      "coursePointId": "b7b5bfea-5320-410e-98e3-50efe1b375c2",
      "competitionUnitId": "e847acd8-cdb9-482f-b2fe-d7b983fc860a",
      "userId": null,
      "markTrackerId": "28bc6dda-8054-4899-a3d3-f6b82612ccb8"
    }
  }
}
```


:::info
Nothing stops you from subscribing to more than one `CompetitionUnit` or `VesselParticipant` at a time.
:::