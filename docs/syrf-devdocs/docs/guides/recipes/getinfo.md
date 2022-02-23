---
sidebar_position: 2
---

# Getting Event and Competition Details

Once you've found the `CompetitionUnit` of interest, you may want to get more information about it.

Always pass your session token as the Bearer.

# Get details by ID

## Calendar Events
To get the details of a `CalendarEvent`,
POST to `https://liveserver-dev.syrf.io/v1/calendar-events/CALENDAR_EVENT_ID`


### Response

```
{
    "id": "a78685b3-4b6a-4c94-9c6a-261aa6426332",
    "name": "My Event Name",
    "locationName": "Private East Beach",
    "lon": 41.044145364313174,
    "lat": -71.97418212890625,
    "externalUrl": "http://externalUrl.com",
    "startDay": 9,
    "startMonth": 7,
    "startYear": 2021,
    "approximateStartTime": "2021-07-09T07:58:21.364Z",
    "approximateStartTime_utc": "2021-07-09T00:58:21.364Z",
    "approximateStartTime_zone": "Asia/Jakarta",
    "approximateEndTime": "2021-07-09T07:58:21.364Z",
    "approximateEndTime_utc": "2021-07-09T00:58:21.364Z",
    "approximateEndTime_zone": "Asia/Jakarta",
    "endDay": 9,
    "endMonth": 7,
    "endYear": 2021,
    "ics": "ics",
    "isPrivate": true,  
    "description": "Timezone Test",
    "country": "United States",
    "city": "New York",
    "createdAt": "2021-09-23T15:52:31.714Z",
    "updatedAt": "2021-09-23T15:52:31.725Z",
    "ownerId": "e205ad64-ff03-457e-ba07-71910d5bddac",
    "createdById": "e205ad64-ff03-457e-ba07-71910d5bddac",
    "updatedById": "e205ad64-ff03-457e-ba07-71910d5bddac",
    "developerId": "79dae926-9e14-454b-8d82-f055367e805a",
    "editors": [
        {
            "id": "e205ad64-ff03-457e-ba07-71910d5bddac",
            "name": "John Doe"
        }
    ],
    "owner": {
        "id": "e205ad64-ff03-457e-ba07-71910d5bddac",
        "name": "John Doe"
    },
    "createdBy": {
        "id": "e205ad64-ff03-457e-ba07-71910d5bddac",
        "name": "John Doe"
    },
    "updatedBy": {
        "id": "e205ad64-ff03-457e-ba07-71910d5bddac",
        "name": "John Doe"
    }
}

```


## Competition Units
Make a POST to `https://liveserver-dev.syrf.io/v1/calendar-events/CALENDAR_EVENT_ID/competition-units/COMPETITION_UNIT_ID`
The calendar event ID will be available in the competition unit search results.

### Response

```

{
    "id": "1889df5a-cd7f-45da-b758-9d55ebf664eb",
    "name": "Race 1",
    "startTime": "2021-07-09T08:30:04.768Z",
    "approximateStart": "2021-07-09T08:30:04.768Z",
    "isCompleted": false,
    "boundingBox": {},
    "createdAt": "2021-07-12T08:02:08.633Z",
    "updatedAt": "2021-07-12T10:17:20.010Z",
    "calendarEventId": "23d87d85-f4ad-40ad-9ebd-f5187d392031",
    "courseId": "5e0357c0-4f01-446f-baad-72a60ffc8bd8",
    "vesselParticipantGroupId": null,
    "createdById": "58bdd428-7e23-4d5f-95c9-58b3baf93446",
    "updatedById": "58bdd428-7e23-4d5f-95c9-58b3baf93446",
    "calendarEvent": {
        "id": "23d87d85-f4ad-40ad-9ebd-f5187d392031",
        "name": "Some event name"
    },
    "vesselParticipantGroup": null,
    "createdBy": {
        "id": "58bdd428-7e23-4d5f-95c9-58b3baf93446",
        "name": null
    },
    "updatedBy": {
        "id": "58bdd428-7e23-4d5f-95c9-58b3baf93446",
        "name": null
    }
}

```

## Courses and Startlines
One important characteristic of the SYRF APIs is that we treat the start line like any other part of the course.
Our course descriptions utilize sequenced and unsequenced geometry. By definition, if a line is the first element of
an array of sequenced geometry, then it is a start line. If it is the last, then it is the finish line. 

Once you get the `courseId` from the competition unit, you can make the following request:
POST to `https://liveserver-dev.syrf.io/v1/courses/COURSE_ID`

```

{
    "id": "080c2cde-a974-461b-a588-d1b8f83a2862",
    "name": "Course 1",
    "createdAt": "2021-10-14T17:10:37.576Z",
    "updatedAt": "2021-10-19T09:49:47.470Z",
    "calendarEventId": "7e8e32be-1b30-4632-8246-653ee3b00180",
    "createdById": "00ba863a-a024-4285-baae-42bb24dc1ca7",
    "updatedById": "00ba863a-a024-4285-baae-42bb24dc1ca7",
    "developerId": "79dae926-9e14-454b-8d82-f055367e805a",
    "competitionUnit": [
        {
            "id": "2679a49e-beba-44d1-a2d3-3b26e52f938d",
            "name": "Sync Test 2"
        }
    ],
    "courseSequencedGeometries": [
        {
            "id": "0f8e92d3-64a1-41e8-92b3-abefeeefb732",
            "validFrom": null,
            "validTo": null,
            "courseId": "080c2cde-a974-461b-a588-d1b8f83a2862",
            "geometryType": "Polyline",
            "order": 0,
            "coordinates": [
                [
                    -80.205819,
                    25.702173,
                    0,
                    1549214880000
                ],
                [
                    -80.204655,
                    25.702625,
                    0,
                    1549214880000
                ]
            ],
            "properties": null,
            "createdAt": "2021-10-14T17:10:37.576Z",
            "updatedAt": "2021-10-19T09:49:47.470Z",
            "createdById": "00ba863a-a024-4285-baae-42bb24dc1ca7",
            "updatedById": "00ba863a-a024-4285-baae-42bb24dc1ca7",
            "developerId": null,
            "points": [
                {
                    "id": "c8d4e246-6c11-44b7-aa00-d89203d4c66b",
                    "position": [
                        -80.205819,
                        25.702173
                    ],
                    "order": 0,
                    "properties": {
                        "side": "port"
                    },
                    "markTrackerId": "5a74c8fc-a1b9-4de8-9c85-076e46e8ac09",
                    "tracker": {
                        "id": "5a74c8fc-a1b9-4de8-9c85-076e46e8ac09",
                        "name": "tracker 2",
                        "trackerUrl": "https://firebase.syrf.io/sVYLVwJ3vTzhMqSc8",
                        "calendarEventId": "4a0468f2-726d-465d-8186-270eddccb86b",
                        "userProfileId": "00ba863a-a024-4285-baae-42bb24dc1ca7"
                    }
                },
                {
                    "id": "6544d305-78ad-47dc-a8ec-87959e1df230",
                    "position": [
                        -80.204655,
                        25.702625
                    ],
                    "order": 1,
                    "properties": {
                        "side": "starboard"
                    },
                    "markTrackerId": "5a74c8fc-a1b9-4de8-9c85-076e46e8ac09",
                    "tracker": {
                        "id": "5a74c8fc-a1b9-4de8-9c85-076e46e8ac09",
                        "name": "tracker 2",
                        "trackerUrl": "https://firebase.syrf.io/sVYLVwJ3vTzhMqSc8",
                        "calendarEventId": "4a0468f2-726d-465d-8186-270eddccb86b",
                        "userProfileId": "00ba863a-a024-4285-baae-42bb24dc1ca7"
                    }
                }
            ]
        }, /// Additional sequenced geometry would go here.
    ],
    "courseUnsequencedUntimedGeometry": [
        /// Unsequenced, untimed geometry goes here.
        /// We are not really using this or the unsequenced timed geometry yet, but 
        /// this will allow for interesting geometry rules like regions which disappear at the start,
        /// or regions that aren't really part of the course but are important anyway, such as penalty areas.
    ],
    "courseUnsequencedTimedGeometry": [
       
    ],
    "event": {
        "id": "7e8e32be-1b30-4632-8246-653ee3b00180",
        "name": "Aan's track at October 13th",
        "editors": [
            {
                "id": "00ba863a-a024-4285-baae-42bb24dc1ca7",
                "name": "Aan Fadhil"
            }
        ],
        "owner": {
            "id": "00ba863a-a024-4285-baae-42bb24dc1ca7",
            "name": "Aan Fadhil"
        }
    },
    "createdBy": {
        "id": "00ba863a-a024-4285-baae-42bb24dc1ca7",
        "name": "Aan Fadhil"
    },
    "updatedBy": {
        "id": "00ba863a-a024-4285-baae-42bb24dc1ca7",
        "name": "Aan Fadhil"
    }
}

```

:::info Points objects have properties
The starboard and port ends of lines can be found by inspecting the properties of their point json objects.
:::
