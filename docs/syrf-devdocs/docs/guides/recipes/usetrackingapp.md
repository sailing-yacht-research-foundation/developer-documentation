---
sidebar_position: 7
---

# Build a full regatta manager integration

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

Companies that have existing race and regatta management platforms can use our APIs to configure the LivePing mobile tracking app to track races that have been planned in their systems.

## Prerequisites

This document assumes you've read our [Introduction](/docs/guides/intro) and have some familiarity with our [Data Model](/docs/guides/datamodel/types)

## Introduction
Suppose you want to add tracking with LivePing to a race that was organized on your platform.
In order for LivePing to track effectively, the SYRF platform needs the following data that already exists in your system:

* The overall event metadata: where is it, when is it, what is it called, etc. 
    - We need this to know how it should show up in search results, and what to call it.
* How many boats and sailors are you tracking and who are they?
    - If you're using our player, we need to know what to call the boats in the player.
    - We'll need to also know that an incoming stream of position data is associated with a specific boat.

## Open Regattas vs Private Regatta.
The SYRF platform differentiates between two types of events: those that anyone can register for and therefore send their boat tracks into, 
and those which are "invite only" meaning anyone on the internet can still watch the race, but only those users invited can register to send in their boat tracks. 

## Be sure you need an integration

All events created by the LivePing app are open regattas, and creating an open regatta is also trivial in the SYRF.io Webapp.
The simplest way to add tracking to an event is for a user to use the SYRF.io Webapp or LivePing to configure a new open regatta that allows SYRF users and non-users to send their tracks into. Building a full integration requires mastery of many concepts and is likely to be error prone.

Be sure you're comfortable reading extensive documentation, and that building a software integration is truly in your interest.
If your question is "what's the fastest way to get tracking for my events?" the answer is to ask your users to create open regattas in a SYRF app, or to do it for them.

If you're interested in building a fully automated integration, read on!

## When to send SYRF your event information
As your users are configuring their event on your side, you may be wondering "at what point should my app send SYRF the event information?"
The easiest approach is to create the event the day before it is scheduled to begin, when the dates and locations are unlikely to change.
You would create the event in the "scheduled" state and you would not need to worry about syncing updates to event metadata.

:::caution 
The SYRF backend needs some time to spin-up resources for every race (get the weather, etc.). Do not create a new CalendarEvent less than 60 minutes before your first expected race.
:::

## How you tell SYRF who is who:

### None of your users have SYRF accounts.
If none of your users have SYRF accounts you can add tracking to your event in two ways:
* Create an open regatta, so that any anonymous or non-anonymous user can track for your event.
* Create a private regatta, which will create 1 tracking url for each boat in your regatta. It will be your responsibility to get the correct link to the correct user.

### Some or all of your users have SYRF accounts.
If some or all of your users have SYRF accounts you should follow the steps to link their SYRF accounts using OAuth, so that you can obtain their account Ids. Once you have their Ids, you can create a private event by specifying the SYRF Ids of the participants.

## Option 1: Creating An open regatta
An open regatta allows anyone to send in tracks, weather they have a SYRF account or not. This flow requires your bot to use our APIs to create an event.
We recommend doing this the night before the event begins, perhaps using a scheduled job process.

#### Pros of creating an open regatta
* Your users don't need to have SYRF accounts, or really do anything except install the app and start tracking.
* None of the cons of link-tracking or account tracking (see below).

#### Cons of creating an open regatta
* Creating an open regatta is trivial in both the LivePing mobile app and syrf.io. Doing it programmatically may be a lot of work and bug fixing for little actual time savings.
* Because open regattas allow anyone to send in tracks (including anonymous users), the SYRF player will have boats labeled "Anonymous" for any user who isn't logged in to their SYRF account (or those who don't have them) when they begin tracking.
* Because your bot user created the regatta, your bot user is the only user who can update the start line location. If you want to enable RC boat and pin
tracking, you'll need to log in to LivePing using your bot user. Otherwise, you'll need to use your bot user to update the location of the startline.

### Step 1: Obtain a session token by logging in with your bot user.
Notice, we cannot use anonymous authentication for this use case.
Make a POST to `https://liveserver-dev.syrf.io/v1/auth/login` with a body containing:
```
{ 
    "username":BOT-EMAIL,
    "password":BOT-PASSWORD,
    “devToken”: YOUR-DEVELOPER-API-KEY
}
```

The request will return a session token for you to store and use in further API requests.
```
myToken = result.body.token
```

Provide this session token as “token” bearer in the header of future requests.

### Step 2: Use your session token to create a new CalendarEvent

### Step 3: Create a CompetitionUnit

### Step 4: Add a start line by creating a Course

### Step 5: Assign the course to the CompetitionUnit


#### Updating the startline location:
As discussed in the cons section above, this approach does not allow you to track the start line in real time easily. There are three ways to add realtime startline tracking in this context:

1) Send updates to the RC boat and pin from the bot user using the APIs.
2) Log in to LivePing with your bot user and use this user to ping the ends.
3) Add SYRF user administrators who can use LivePing to update the start ends. This option requires you to get their SYRF user info via OIDC or OAuth.

### Step 5: Notify your users that they can track
Send an email to all participants that they should install the LivePing app and look for your event on the day of the first race.

## Option 2: Create a private regatta with tracking links
If you want to prevent anonymous users from sending in their tracks, or you want to ensure every boat has a name in the race player but you don't want to require users to have SYRF accounts, you can generate tracking links for every boat in the race. It is your responsiblity to get each link to the person who will be sending in tracks for that boat. Once a user clicks a link, it can not be used by another user. When the user clicks the link, in their email, sms, or however you get it to them, it will open the LivePing app if they have it installed on their phone. If they don't, it will simply open the App/Play store and prompt them to install it. The user will then have to re-click the tracking link to begin tracking.

#### Pros of link tracking
* The player can show boat names for all boats, since we don't allow anonymous tracking.
* People who aren't associated with the race cannot register.
* Your users don't need to have SYRF accounts. 

#### Cons of link tracking
* It is more work for the developer, since you are now responsible for adding vessels, participants, and other objects to the configuration.
* Only one person can track with the tracking link, so the first person to click the link prevents others from doing so.
* It is error prone, because it is the developer's responsibility to get the right links to the right person. It is highly likely that someone will get the wrong link or share a link and introduce a bug.
* It is less flexible for situations like a person joining the event late or last-minute. In an open regatta, the user could just join the race by finding it in the LivePing app.

The steps for creating link tracking are very similar to creating an open regatta except you need to specify vessel objects.

### Step 1: Obtain a session token by logging in with your bot user.
Notice, we cannot use anonymous authentication for this use case.
Make a POST to `https://liveserver-dev.syrf.io/v1/auth/login` with a body containing:
```
{ 
    "username":BOT-EMAIL,
    "password":BOT-PASSWORD,
    “devToken”: YOUR-DEVELOPER-API-KEY
}
```

The request will return a session token for you to store and use in further API requests.
```
myToken = result.body.token
```

Provide this session token as “token” bearer in the header of future requests.

### Step 2: Use your session token to create a new CalendarEvent

You will configure a new CalendarEvent 

### Step 3: Create a CompetitionUnit


### Step 4: Add a start line by creating a Course


### Step 5: Update the CompetitionUnit with the Course Id.


### Step 6: Create N Participants
Participants represent human beings in the race. They will in the future be used to represent SYRF users, crews, etc.
For now, SYRF recommends 1 participant per vessel. You can think of these participants like skippers or captains.


### Step 7: Create N Vessels
Vessels are vehicles that float on the water.
For now, we recommend one Vessel object per Participant object.

### Step 8: Create N VesselParticipants
A `VesselParticipant` binds a `Participant` to a `Vessel` in the context of a particular `CompetitionUnit`.


### Step 9: Create a single VesselParticipantGroup


### Step 10: Assign your VesselParticipantGroup to the CompetitionUnit


### Step 11: Send your links to the right user

### Save the tracking urls provided in the REST responses

* When you send in the list of sailors/athletes for each boat in the race, you will recieve a url that is unique to each individual in the response.
* That url is a deep link which is specific to that particular sailor/athlete. It is your responsiblitiy to provide the correct link to the correct sailor.
* When a sailor clicks on that link on a mobile device, it will either open the SYRF tracker if they already have it installed, or it will take them to the app store to install it.
* Once the app is installed by the end user, the deep link will immediately take them to a page in the SYRF tracking app that allows them to track for that race.

### Display the iFrame for that race or build your own playback

* SYRF provides a simple iFrame that can be embedded in your apps to view the map of the race tracking.
* If you would like to build your own map view, or subscribe to course interaction events, you may optionally use the Websockets API to build your own user interfaces, for instance you may want to subscribe to corrected elapsed times.
* Optionally use our protest API after the race to edit the corrected times of the race for races that require protests.

## Option 3: Create a private regatta by inviting SYRF users
By far the most robust option is to ask your users to link their SYRF accounts to their account in your software.
This allows you to write an integration that invites specific SYRF users and can give them access to verying levels of permissions.

This option first requires integrating SYRF via OAuth.