---
sidebar_position: 7
---

import ReactPlayer from 'react-player'


# Simulate Finished Races to Help You Develop

If you are working on software or hardware that subscribes to race events, you will probably want to test it against actual races.

There are two ways of doing this:

## Use LivePing
If you ask us to, we can add you to Microsoft App Center, where you'll be able to install the latest development builds of LivePing.
With the development build of LivePing, you'll be able to create events and stream the ends of the start line using LivePing.
You can then test your integrations against those streams. This approach gives you a lot of independence, but does require
some work getting set up with our dev builds and keeping up with the latest build versions. If you'd like access to these
builds, just contact us.

:::caution Production LivePing Won't Work

You will not be able to use the App Store versions of LivePing to test, because all of the API endpoints you use during development will be
in our development environment, and the App Store versions of LivePing use our production environment.
:::


## Simulate Completed Races
The SYRF simulation feature enables you to use any existing race in our archive, and re-run it, as though it were happening "now" in
real-time, so that you can develop and test against it. This is a very powerful feature and we believe it is unique to the SYRF platform.

The process is as follows:

* Flag your account as a developer account.
* Choose a race to simulate using SYRF.io.
* The simulation will create a new `CompetitionUnit` which is a clone of the existing one.
* Use the cloned `CompetitionUnit` to subscribe to real-time updates.
* The simulated race will run in a loop for 1 week.
* Every time the race restarts it will send a start time update message with a new start time. 
* After 1 week, the simulation will be destroyed.
* You can optionally end the simulation early by ending the event.
* You can simulate the race again or simulate another.
* Update your API requests to include simulated races by adding the `include_simulations=true` url parameter to the radius search API.


:::caution Only 1 simulation at a time

We only allow a single simulation at a time, per developer.
:::


### Flag yourself as a devloper:

![Alt text](/img/flag_developer.png)

### Find the race you want to simulate:
<ReactPlayer playing controls url='https://www.youtube.com/embed/u4mYMXGp8ZU' playing={false} />

### Simulate the existing race:

![Alt text](/img/simulate_race.png)

### Use the new CompetitionUnit:

The simulated race and event will appear under your events with new identifiers to be used in your requests.

![Alt text](/img/simulate_my_events.png)
