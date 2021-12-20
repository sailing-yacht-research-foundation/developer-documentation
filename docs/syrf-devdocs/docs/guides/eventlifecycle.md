---
sidebar_position: 6
---

# Lifecycle and Statuses

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

Let's look at how most apps will use the platform before, during and after a race.

## Overview

### Planning stage

We can think of the planning stage as any "setup" that happens before the particpants cross a start line. 
This phase includes all organizational planning such as who whould be in the race, where and when does it take place and what does the course look like?
For instance, it's common for race courses to be finalized moments before the race starts due to shifting wind.

During the planning stage, developers should use our REST APIs to configure the start time, name, course layout, and bounding box of the race.
The APIs can also be used to designate who can edit and particpate in the race. All of this information is editable at any time, of course, but once the participants begin
going around the course, it's less likey that the participants list will change (for instance).

The planning stage is distinct from the real time stage because tracking for the participants has not yet begun, and the bulk of the setup will use the REST/HTTP APIs.

It is during the planning stage that, behind the scenes, the SYRF backend will grab and slice any relevant weather data from the weather agencies and our partners in order for it
to be used during the real time stage.

It is also during the planning stage that the tracking urls for each participant will be generated for developers using the SYRF tracking app with their management systems.
Once a race is created in the system it becomes discoverable via our search API and client apps.

### Real time stage

The realtime stage begins when the participants begin sending in tracking data, either using the existing SYRF tracking app or your custom app that has integrated the SYRF SDKs.
During this stage, it is possible to subscribe to websocket outputs containing all tracking, instrument and weather data, as well as all calculated handicap corrections,
events and course interactions.

The SYRF APIs do not restrict developers from changing anything during this stage, and changes to the course layout or other configuration settings can be made at any time.

### Post race

Once the race is over, there is no longer a need to subscribe to real time data. It is during this stage that the bulk output and protest REST APIs can be used. 
Under the hood, the SYRF APIs persist all race data and it becomes available to anyone for future analysis. 


## Statuses

Our objects have specific statuses with precise meanings. Statuses are string enums.

### `CalendarEvent` Statuses

#### `"DRAFT"` 

A `CalendarEvent` is in `"DRAFT"` state when it is first created on the SYRF.io webapp. This status means: 
* In SYRF.io it will only be visible to Administrators of that `CalendarEvent`, and only in "My Events".
* `CompetitionUnit`s associated with this event will not appear in any search results.
* You won't be able to play any races associated with this `CalendarEvent`.
* Participants will be prevented from sending in tracking data for any `CompetitionUnit`s associated with this event.


#### `"SCHEDULED"` 
A `"SCHEDULED"` status occurs once an administrator "publishes" the event on SYRF.io, or immediately when an event is created on LivePing.

This status means:
* The `CompetitionUnit`s associated with this CalendarEvent appear to every user in search results.
* Participants may be able to send in tracking data depending on the states of the `CompetitionUnit`s

##### SYRF Auto-deletes SCHEDULED CalendarEvents
Once a `CalendarEvent` is published the details are still editable.
If no tracking data is recieved by the end-date of a `"SCHEDULED"` `CalendarEvent`, the event will be deleted automatically. 
This is meant to keep our data clean and reinforce that data has no value in the SYRF system if it does not contain tracking data.
The best way to circumvent this auto-deletion is to ensure the start date of your `CalendarEvent` is kept up to date, and that you have users who track.


:::info
Do not confuse the `CalendarEvent` state with whether it is an open regatta or a private regatta. 
CompetitionUnits for Both open and private regattas will appear in search results and API calls once they are in a `"SCHEDULED"` state.
:::

#### `"CANCELED"` 
Canceled `CalendarEvent`s are not expected to have tracking data.

#### `"ONGOING"`
Ongoing `CalendarEvent`s have at least one `CompetitionUnit` that is either in progress or finished. 
An `"ONGOING"` `CalendarEvent` has started, but hasn't finished. 
This status gets set when the first race starts, if the event was created on the webapp, or immediately if it was created with LivePing.


#### `"COMPLETED"`
A `"COMPLETED"` `CalendarEvent` is one that is over. All `CompetitionUnits` have a `"COMPLETED"` status. 
This status happens:
* When an administrator closes an event in the SYRF.io webapp.
* Automatically, at the end time of the `CalendarEvent` unless there are ongoing `CompetitionUnits`.
* All `CalendarEvents` imported from external tracking solutions are marked as `"COMPLETED"`.

### `CompetitionUnit` Statuses

#### `"SCHEDULED"` 
A `"SCHEDULED"` status occurs once a `CompetitionUnit` is created. 
* They appear in search results.

#### `"ONGOING"`
`"ONGOING"` `CompetitionUnit`s are happening 'right now'.
For `CompetitionUnit`s created in the SYRF.io webapp, the status changes automatically a few minutes before the designated start time.
The backend has to do some spin-up to get a race ready to stream, and the `"ONGOING"` status is the indication that this work has been done.
* You can stream `"ONGOING"` units to Expedition.
* You can watch them live in the player on SYRF.io.
* They appear on the map page of LivePing (if open) and participants can send tracking data into them.
* You can subscribe to real time updates using our Websockets API.

#### `"COMPLETED"`
`"COMPLETED"` `CompetitionUnit`s have been marked as complete by an Administrator, or they've been auto-closed after a period of time without updates.
* `"COMPLETED"` `CompetitionUnit`s can be watched in the player.
* They appear in search results.
* They can not be streamed to Expedition or subscribed to by our Websocket API.
* They do not accept new tracking data from LivePing.
* They do not appear in the LivePing app map page because you can not track for them.

