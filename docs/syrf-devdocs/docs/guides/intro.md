---
sidebar_position: 2
---

# Introduction

![Alt text](/img/SyrfDeveloperProgramLogo.png)

## Motivation

The SYRF platform is revolutionizing sailing sports.. 

** A few of the features of the SYRF platform are:** 
* The LivePing app, that enables sailors to stop the ping parade by crowd sourcing and subscribing to startline updates.
* Global synchronized time that keeps all apps in sync to within tens of milliseconds.
* SYRF.io, the home of sailing on the internet.
* The largest data set of sailing certificates and polars from the biggest certificate organizations.
* The largest data set of raw sailing tracks that exists on Earth, period.
    * 1 TB of positions, tens of thousands of boats, 100k races spanning 20 years and everything from round-the-world races to countless inshore regattas.
    * 4 TB of weather data, pre sliced by time and space for each race, including wind, pressure, and sea state variables - incuding those from "reanalysis" (what we know happened in the past, not a prediction of the future).
* A real time pub/sub system to ingest, analyze and relay race data from and to arbitrary sources.
    * Auto-umpiring: our system automatically handles OCS and other spatially related events and eliminates the need for protests and the ping parade.
* Global nautical charts, pre-tiled for web and mobile mapping libraries, available for each layer in common vector tile format.
* Developer friendly APIs to find, send, pull, subscribe to, and otherwise interact with everything mentioned above.
* Sample code to get you started.
 

## Purpose and Audience

![Alt Text](https://media.giphy.com/media/o0vwzuFwCGAFO/source.gif)

The purpose of this guide is to walk developers through using the SYRF Platform (APIs and client SDKs).

** If you are not a software engineer building an app using the SYRF APIs or client SDKs, you are in the wrong place. **

SYRF's mission is to advance sailing sports (sailing, kite boarding/foiling/surfing, wing foiling) using the latest and greatest technology. 
We've spent a long time building client facing applications to help the average sailor, as well as partnering with numerous startups to get our tech
into as many hands as possible. This guide is explicitly for software engineers who want to build new applications on top of our platform. 

## Use Cases

In general the SYRF Developer Platform supports five basic use cases for app developers:

1. Apps that want to use SYRF accounts for Single Sign On/OIDC. There are several reasons you may want to do this:
    - For an out of the box authentication solution, 
    - To provide SYRF user information in a regatta manager integration (see next bullet),
    - To import SYRF user data (tracks for example) into your application. 
    - Watch [this awesome video](https://www.youtube.com/watch?v=996OiexHze0) for a great introduction to the problem OIDC solves.

2. Regatta management apps who want to use the LivePing app to add tracking to events planned on their platform.
3. Anyone who wants to subscribe to real time race updates such as start line and boat positions.
    - Starting devices,
    - Tactical/navigation software,
    - Custom players or scoring apps.

4. Data scientists who want to pull data from finished races to analyze in other contexts.
5. Developer friendly nautical charts.

Note that these use cases are not mutually exclusive, so it's completely possible to combine these guides in new and creative ways.

![Alt Text](/img/breathing.gif)

## Introduction

:::caution
It's extremely important to understand this section.
:::

### Step 1 - Get a developer token:

The first step is to obtain a developer token by filling out our [Developer Program Form](https://docs.google.com/forms/d/e/1FAIpQLSfXTgxpeqaJ3sCNY4RV_iF7Ex9wbcv3rVjfV4xhCqypvm95Pw/viewform?usp=sf_link). Unfortunately, we have to generate
new tokens manually at this stage and this form allows us to collect what we need from you to generate the token, 
and share the appropriate GitHub samples with your team. 

### Step 2 - (Optionally) Create a bot user:

:::info
This step is only required if you need to insert data into the SYRF platform, or handle any kind of authorization.
Regatta manager integrations will need to do this, but use cases #1, #3, and #4 listed above can skip this step.
:::

For any use case that involves sending event or participant metadata to SYRF, you'll also want to start by creating a dummy "bot" user. 
This user will be the user that interacts with SYRF on behalf of your application, as though it were a real user.


![Alt Text](/img/bot-user.png)

#### Bot User Best Practices:
* Name your bot user the same as your company or organization.
* Use a secure password generated by a password manager.
* Upload your app, company or organization logo as the user image for the bot user.

### Step 3 - Use our APIs to make something awesome:

Once you have your developer token and your optional bot account, you are now able to make API calls to send and recieve data.

### Step 4 - Get in touch with us to enable production access:

After you've built your integration using our development environment, we'll ask you to give us a demo and answer some questions about the integration before we give you access to the production instances.

Make sure you prominently display the [SYRF Developer Program badge](https://drive.google.com/drive/folders/1D5FLYs9hxnkH1P-xf8dxHB6FrYJ8cQPP?usp=sharing) on your website.

## Understanding Anonymous vs Non Anonymous Authentication: 

### Authentication vs Authorization
Let us quickly define two important concepts in software engineering, "authentication" and "authorization". 
"Authentication" means SYRF is able to verify that the user is who they say they are. This is usually accomplished via
username/password authentication. The idea is that only the valid user knows the password (wishful thinking!). By providing the
correct password, the user is now "authenticated" - the system knows who they are.

"Authorization", on the other hand is the problem of determining if a user is authorized to do something. For instance,
the SYRF app needs to make sure that user A can't delete the tracks of user B. User A and User B may both be authenticated, but they only have authorization to edit their own respective data.

Watch [this awesome video](https://www.youtube.com/watch?v=996OiexHze0) for more information on the difference between authentication and authorization.

Your app will need to be authenticated by SYRF. In practice what this means is you will have a session token that proves you are who you say you are.
We will go into more detail on this below, but for now it's enough to know that we have two ways for your app to authenticate, and both ways give you a session token which is used to make further API requests. 

We allow for "anonymous" authentication as well as "non-anonymous" authentication.

:::info
The SYRF APIs provide two ways for software to authenticate and it's important to understand the differences.
:::


### Non-Anonymous Authentication
Let's look at the easy case first: non-anonymous authentication. This happens when someone who has an existing SYRF account
uses their email and password to log in to the platform. In the above steps, when you created your bot user, you did so so that your
app can use non-anonymous authentication with our APIs. Non-anonymous authentication allows SYRF to
determine the "who" behind the requests. Non-anonymous authentication is required to solve the problem of authorization. 

Once an app or user is authenticated with non-anonymous authentication, they can use their session token to make a variety of requests.
Because we know who they are, non-anonymous users (and bots) are able to:

* Put data into the system, since we can associate it with a permanent account and use that account for authorization.
* Pull data out of the system.

:::caution Don't ask your users for their SYRF passwords.
Apps that directly ask their end users for their SYRF passwords will be banned. You should use OAuth to get a SYRF user token if that is your goal.
:::

### Anonymous Authentication
"Anonymous" (sometimes called "lazy") authentication means that SYRF can't associate a user with any particular email, company or human being, but we can differentiate between two anonymous users. Anonymous authentication doesn't require a password but it does require a unique device Id.

Imagine the scenario where you only want to search for races near a particular location. In that scenario, there shouldn't be 
a need for someone to put in a username and password, since all events in the SYRF platform are publicly readable. 

For this reason, we've enabled anonymous authentication for use cases that only need to read data out of SYRF. 

## Using the API
Most use cases will use the API using the same flow.
1. Use your developer token to obtain a session token, using either anonymous authentication or, if you have a bot user, non-anonymous authentication.
2. Use your session token with our APIs and Websockets.
3. That's basically it.

## Important Privacy Considerations

Positions sent from the LivePing app are publicly visible IF and ONLY IF they are associated with an event. 

* If, as a LivePing user you hit the "Start Tracking" button on the map, your track will stay private, and only your user will be able to read it.
* If you join an existing event or race from the map view or the event list page, your track will be publicly visible and all user types will be able to read it.
* All tracks (whether a 'track now' or associated with an event/race) will be visible from a user's MyTracks.

Once an event is published, the event and races becomes publicly visible. 
Events that are created from the mobile app are automatically published.
Events that are created from the web app begin in a draft mode and must be manually published.

**All events and event associated tracks are publicly visible.**

#### Publicly visible means everyone on the internet can:

* Watch the race player.
* View which boats and sailors participated in the event and races.
* View all metadata associated with the event and races, including who organized it.

#### Publicly visible does not mean:
* Anyone can join or send their tracks into the race.

**Do not confuse visibility with whether an event is open or closed. Events can be 'open regattas' which allow any LivePing user to register and send in tracks, or may be private events which are invite only.**


## REST Requests
Most of the endpoints are RESTful HTTP endpoints. 
Here is a sample HTTP request in Curl. There are numerous tools and libraries to make said requests, but the basics are the same.

Don't forget to include your `accept` and `content-type` headers.

```

curl 'https://liveserver-dev.syrf.io/v1/certificates/search' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'content-type: application/json' \
  -H 'authorization: Bearer YOUR-SESSION-TOKEN' \
  -H 'accept-language: en-US,en;q=0.9' \
  --data-raw '{"query":{"bool":{"must":[{"query_string":{"query":"organization:(ORC)"}}]}}}' \
  --compressed >> certs_results.json

```

Enter this command on your *nix-based terminal with curl installed. 

What does this request do?

* Uses the command line utility curl to make a POST request to the endpoint `/v1/certificates/search`,
* Sets the session token as the `bearer` header,
* Set's the body of the POST to a query (described elsewhere),
* Tells the listening server to compress the result (optional),
* Saves the output of the request to a json file. 

Every programming language in use in the last 30 years will have a library to simplify this for you.

### Pagination

Pagination is when you only want the first `n` results. This is helpful
when there is a ton of data. 

To use pagination, just append the endpoint with `?page=1&size=50`.

For instance `/v1/certificates/search?page=1&size=50`, where page=1 means you want the first page and size=50
means you want 50 results per page (so you're asking for the first 50 results).