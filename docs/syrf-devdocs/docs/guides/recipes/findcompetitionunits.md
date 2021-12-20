---
sidebar_position: 5
---

# Find CompetitionUnits

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

## Introduction
The `CompetitionUnit` is arguably the most important record type in the SYRF platform. 
The `CompetitionUnit` represents the metadata for a group of vessels on the water at the same time who will be scored or ranked against each other.
The `CompetitionUnit` binds participant groups to course geometry and start time. There are no inherent restrictions on how these objects are created.
It is meant to be useful for both scoring, and viewing purposes.  

Here are some ways that `CompetitionUnit`s may be used:
* A group of one design boats going around the same course, who share a start time and start line.
* A group of boats of different models in the same division who share a start time and start line.
* A group of boats of different models, in different classes or divisions who share a start time and who go around the same course.

As you can tell, there is a lot of flexibility.

`CompetitionUnit`s are created in a variety of ways:
* Races that are created by the SYRF.io webapp, or the LivePing app will have 1 `CompetitionUnit` per race for the forseeable future.
* Races that are imported into SYRF via 3rd party tracking apps are mapped as closely to our data model as possible. For instance a race with different legs may have 1 `CompetitionUnit` per leg. 
* `CompetitionUnit`s are created by 3rd party engineers building integrations with the SYRF platform. 

## The problem of finding CompetitionUnit Ids

Here are a few of the reasons a developer may want to know the Id of a `CompetitionUnit`:
* You are building a custom player/track viewer for a use case not covered by the SYRF player,
* You want to subscribe to real time race updates, such as the location of the pin/RC boat, the locations of the boats, or OCS events,
* You want to pull all the data associated with a finished race to do analysis on it,
* You want to embed the SYRF player in an iFrame.

All of these use cases require you to know the `CompetitionUnit` Id for the race in question.

Let's see how you can use anonymous authentication to find `CompetitionUnit`s.

:::info Note
While these examples use anonymous authentication, everything works the same way if you want to use non-anonymous authentication.
:::

## Step 1) Authenticate:

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

## Step 2) Find CompetitionUnits:

### Search
SYRF allows you to search for `CompetitionUnits` by a variety of different fields. 
You can wrap this API in your own UI to allow your users to find races using the powerful search of syrf.io.

SYRF is designed to get people to playback data quickly. When you search by `name` you're actually searching
across both `CalendarEvent` and `CompetitionUnit` names, but only CompetitionUnits will be returned.
This is because some events only have one race and some have many races with names like 'R1'. By searching
accross all names, we are sure to find what you are looking for.

#### Fields

SYRF allows you to search across a variety of fields. For races not planned on the SYRF platform, 
it's important to understand that we can only make searchable what the 3rd party trackers provide. 
If you search within a particular field, it's likely that there are races that in theory match that query
but were left out because we had incomplete information. 

:::info Note
Our search backend uses Elasticsearch, which supports fuzzy queries automatically.
There's no need to worry about things like capitalization and minor misspellings.
:::


The following fields are searchable:
* `name`: The string CalendarEvent.name + CompetitionUnit.name.
    * Examples: 
        * 'Newport Bermuda'
        * 'National Melges Championship Race 2 2021'
    * Query Example: `"name(Newport Bermuda)"`
* `source`: The original source of the data.
    * Examples:
        * 'SYRF'
        * 'Yellowbrick'
    * Query Example: `"source(Yellowbrick)"`
* `handicap_rule`: The rule or organization associated with the race. 
    * Examples:
        * 'PHRF'
        * 'ORC'
        * 'ORR'
    * Query Example: `"handicap_rule(orc)"`
* `boat_name`: The name of a boat in the race.
    * Examples:
        * 'Comanche'
        * 'Dorade'
    * Query Example: `"boat_name(Comanche)"`
* `boat_model`: The model or class of the boat in the race.
    * Examples:
        * 'TP52'
        * 'Beneteau Oceanis' 
        * 'J70'
    * Query Example: `"boat_model(TP52)"`
* `start_country`: The country where the start of the race took place. 
    * Examples:
        * 'United States'
        * 'Germany'
    * Query Example: `"start_country(United States)"`
* `start_city`: The city where the race began.
    * Examples:
        * 'Annapolis'
        * 'Newport'
    * Query Example: `"start_city(Annapolis)"`


#### Search within one field

Once you have your session token, be sure to provide it as the bearer in every additional request. 
To search for one field, you can include that field query in the body of a POST request.

Make a POST to `/competition-units/search`. 
In the body of your request, include this example:

```
{
    "query": {
        "query_string": {
            "query": "name(Newport Bermuda)"
        }
    },
    "sort": [
        {
            "approx_start_time_ms": "desc"
        },
        "_score"
    ]
}
```

#### Search by multiple fields
Suppose you'd like to narrow your search results, by logically `AND`ing searches accross fields. 
You can do so by replacing your "query" string with something like this:

`"query":"start_country:(united states of america) AND boat_name:(my boat name)"`

You can make one field "weigh" more than another by using points. 
For instance, if you want the name match to count more than the country name match you can use a query like this:

`"query":"(name:(Newport Bermuda 2015)^3 AND (start_country:(United States))^2"`

#### Search results
Regardles of how you search, you will obtain a JSON list of `CompetitionUnit`s matching your query. 

The list of `CompetitionUnit` results appears in `body.hits`.
Here is an example search result:

```
{
   "took":94,
   "timed_out":false,
   "_shards":{
      "total":5,
      "successful":5,
      "skipped":0,
      "failed":0
   },
   "hits":{
      "total":{
         "value":365,
         "relation":"eq"
      },
      "max_score":12.743189,
      "hits":[
         {
            "_index":"races",
            "_type":"race",
            "_id":"9dfa5fee-c87f-452e-bff2-a80b1bc839e1",  // THIS IS THE CompetitionUnit ID
            "_score":12.743189,
            "_source":{
               "approx_start_time_ms":1403240400000,
               "start_year":2014,
               "name":"Newport Bermuda 2014 -  sponsored by Pantaenius",
               "start_country":"United States of America",
               "start_month":6,
               "source":"YELLOWBRICK",
               "id":"9dfa5fee-c87f-452e-bff2-a80b1bc839e1",
               "start_city":"Jamestown",
               "approx_start_point":{
                  "crs":{
                     "type":"name",
                     "properties":{
                        "name":"EPSG:4326"
                     }
                  },
                  "coordinates":[
                     -71.3726806640625,
                     41.46360126366379
                  ],
                  "type":"Point"
               },
               "event":null
            }
         }
      ]
   }
}
```

Notice that event may or may not be null.

### Find CompetitionUnits near a specific location

To find live `CompetitionUnit`s near a specific location make a `GET` request to `/open-competitions?lon=blah?lat=blah&radius=blah`

Ex:
`/open-competitions?lon=-122.6348876953125&lat=37.73162487017297&radius=1`

The `radius` parameter is in nautical miles.

