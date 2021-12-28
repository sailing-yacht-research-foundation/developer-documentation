---
sidebar_position: 10
---

# Common Race Configurations

Here we describe high level instructions for handling common race configurations and problems.

## Pursuit starts
Pursuit starts occur when a group of vessels are sailing around the same course, but the faster boats are given a later start time than the slower boats. 
Pursuit starts can be handled in two ways:

* Option 1: use a single VesselParticipationGroup for the course. This is the recommended tactic for PCS pursuit starts.
    * Treat the earliest boat's start time as the start of the competition.
    * Find the elapsed time between the first boat and the actual start for each boat.
    * Subtract that elapsed time from both the corrected and elapsed times for those boats.
* Option 2: give each boat it's own VesselParticipationGroup with its own start time.
    * This technique doesn't work for PCS because PCS requires all vessels to be in the same group.

## Different starts, same finish
For a rally or similar race where vessels may start wherever they want and they are racing against each other to the same finish, 
you can run these events by simply creating a unique VesselParticipationGroup for each starting location and subscribing to and comparing elapsed times across groups.

## OCS
On Course Side can be implemented by numerous techniques. 

* Option 1: Create a timed geometry polygon in front of the start that begins a few minutes before start time and ends at start time.
    * There will be a VesselPolygonEntered event if a vessel is in the polygon before the race.
* Option 2: Monitor for both VesselLineInsideCrossed and VesselLineOutsideCrossed events and check the time of the event against the start time of the competition.

## Z, Black flags
These types of flags are easily handled using the same technique as OCS: simply define timed or untimed course geometry using the points in your courses and monitor for events associated with 
vessels interacting with said geometry, and optionally compare the event time with the start time.

## Offset marks
Offset marks are easily handled by adding a point object following an upwind mark point object in your sequenced course geometry.

## Match racing
Create a new VesselParticipantGroup for each pair of vessels competing against each other. Give each pair match its own CompetitionUnit, then pull the data you need to rank however you wish.

## Drifting marks
Since the idealized location of course points is editable, your end users can update the location of the points at any point in the race. 
Additionally, points that are attached to trackers will benefit from always having the most up to date location. 

## Complicated leaderboards and trophies
Apps can subscribe to any number of VesselParticipantGroups across any number of CompetitionUnits and the corrected elapsed times can be sorted or ranked however the developer wishes. 
 
## Super Mario gameplay
Someone please build a racing app where vessels gain points by entering timed regions or get points taken away by not avoiding regions with sea monsters.