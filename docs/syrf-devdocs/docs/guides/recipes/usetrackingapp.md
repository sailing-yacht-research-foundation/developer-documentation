---
sidebar_position: 6
---

# Using the SYRF tracking app

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

Companies that have existing race and regatta management platforms can use our APIs to configure the SYRF.io mobile tracking app to track races that have been planned in their systems.

## Prerequisites

This document assumes some familiarity with our data model.

## Overview

Suppose you have an existing race management app that allows clubs and individuals to plan races but you don't have a means to track the boats in the race. 
The SYRF APIs allow you to configure basic race information and use the existing SYRF tracking app to track your races. This is an appealing option for teams without a mobile app or who want to focus on other features. 

The process is as follows:

### Get a developer token

You need a developer token which will be provided by the SYRF engineering team. 
In the future this will be available via a self-service developer dashboard. 

### Set up your race on SYRF

Within the iRace back end, you will use the SYRF REST APIs to define the following:

* Define the race:
    * Tell us the name of the race, the time it starts, and other required details.
    * Provide a bounding box for the region of the race. This bounding box enables us to get the weather and filter erroneous positions.
* Describe the race course geometry including marks, lines and polygons and their respective idealized locations and sequence.
* Send in each boat for each participant group and optionally the ORC JSON polars for that boat if you'd like to use PCS handicap scoring.
* Send in unique identifiers for each sailor on each boat. The identifiers need only be unique across that boat participation group.
* All of this information is editable at any time by your application using the developer token.

### Save the tracking urls provided in the REST responses

* When you send in the list of sailors/athletes for each boat in the race, you will recieve a url that is unique to each individual in the response.
* That url is a deep link which is specific to that particular sailor/athlete. It is your responsiblitiy to provide the correct link to the correct sailor.
* When a sailor clicks on that link on a mobile device, it will either open the SYRF tracker if they already have it installed, or it will take them to the app store to install it.
* Once the app is installed by the end user, the deep link will immediately take them to a page in the SYRF tracking app that allows them to track for that race.

### Display the iFrame for that race or build your own playback

* SYRF provides a simple iFrame that can be embedded in your apps to view the map of the race tracking.
* If you would like to build your own map view, or subscribe to course interaction events, you may optionally use the Websockets API to build your own user interfaces, for instance you may want to subscribe to corrected elapsed times.
* Optionally use our protest API after the race to edit the corrected times of the race for races that require protests.

