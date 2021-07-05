---
sidebar_position: 6
---

# Lifecycle

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

Let's look at how most apps will use the platform before, during and after a race.

## Planning stage

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

## Real time stage

The realtime stage begins when the participants begin sending in tracking data, either using the existing SYRF tracking app or your custom app that has integrated the SYRF SDKs.
During this stage, it is possible to subscribe to websocket outputs containing all tracking, instrument and weather data, as well as all calculated handicap corrections,
events and course interactions.

The SYRF APIs do not restrict developers from changing anything during this stage, and changes to the course layout or other configuration settings can be made at any time.

## Post race

Once the race is over, there is no longer a need to subscribe to real time data. It is during this stage that the bulk output and protest REST APIs can be used. 
Under the hood, the SYRF APIs persist all race data and it becomes available to anyone for future analysis. 