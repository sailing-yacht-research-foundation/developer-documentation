---
sidebar_position: 6
---

# Subscribe to real time updates

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>


## Introduction

Once you've found the `CompetitionUnit` of interest, you may want to subscribe to updates in real time, as the race
occurs live. 

This is accomplished using our Websockets endpoints. 

## Step 1) Authenticate
Again we must authenticate. We can use anonymous authentication for this use case, but you could also use your bot user.

Anonymous login requires a unique device Id for every session. We recommend doing this from the back end, but if you want to use a client app for
these requests please ensure you are providing a unique device Id such as a hardware identifier. 

Make a POST to `/auth/anonymous-login` with a body containing:
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

Open websocket on `ws://host/authenticate?session_token=' + session_token`

Send us the `CompetitionUnit` Id that you'd like to listen to:

```
ws.send({
 		 action: 'subscribe',
 		 data: {
   			competitionUnitId: 'COMPETITION-UNIT-ID',
 		 },
});
```

Receive position updates via the websocket.
Here is an example position update from a boat:

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

Here is an example position update from the start line:

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


