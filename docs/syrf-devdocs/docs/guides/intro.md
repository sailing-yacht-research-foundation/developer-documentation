---
sidebar_position: 1
---

# Introduction

## Purpose and Audience

![Alt Text](https://media.giphy.com/media/o0vwzuFwCGAFO/source.gif)




The purpose of this guide is to walk developers through using the SYRF Platform (APIs and client SDKs).

** If you are not a software engineer building an app using the SYRF APIs or client SDKs, you are in the wrong place. **

SYRF's mission is to advance sailing sports (sailing, kite boarding/foiling/surfing, wing foiling) using the latest and greatest technology. 
We've spent a long time building client facing applications to help the average sailor, as well as partnering with numerous startups to get our tech
into as many hands as possible. This guide is explicitly for software engineers who want to build new applications on top of our platform. 

This site has the following sections:

* Guides: High level overview of important concepts. Language and platform independent concepts that apply accross stacks.
* Client SDK Guides: Getting started guides for Android, iOS and Web apps. Specific implementation tips and API reference docs are here.
* Release Notes: The release notes for all versions. 


## Use Cases

In general the SYRF Platform supports five basic use cases for all wind-water sports:

* Real time data input:
    * Using our mobile SDKs to add tracking to any mobile app.
    * Send boat instrument data as well as location data for your races.
* Real time data output/playback:
    * Subscribe to all the data that gets sent in, as well as calculated data and weather data obtained for each race.
    * Build sophisticated analysis apps or playback apps for numerous use cases.
* Pull all race data for races which are over and do whatever you want with it.
* Better nautical charts for mobile and web apps.
* Single Sign On with OIDC to help your end users organize and share their data.

## Platform Capabilities

The SYRF platform allows developers to build apps with the following capabilities:

* SYRF account Single Sign On with Open ID Connect: let your users sign in with the same account they use for SYRF products so they can keep their data organized and control who can access it.
* Sophisticated real-time tracking, course umpiring, time corrections and analytics.
![Alt Text](/img/line-interaction.gif)
* The most capable playback engine for wind-water sports on the market.
* Nautical charts that don't suck: layer independent, web friendly vector tiles for most of the world.
* All the weather and current data you can manage including data from our technology partners that you can't find anywhere else.
* Media streaming and real-time motion graphics that react in response to race events as they happen.
* The largest dataset of sailing race data that exists. We have billions of positions spanning races across 20 years and the entire world.

    ![Alt Text](/img/breathing.gif)

## Critical Concepts

* Your end users will be required to have SYRF accounts in order to use the APIs.
* You will need a developer token from developers.syrf.io
* All races with more than 4 participants will be public. User data for public races will be sanitized to protect their privacy.
* We currently only have client SDKs in Kotlin, Swift and React Native but everything that can be accomplished with the client SDKs can be accomplished with Websockets and REST endpoints.

## Isn't tracking a solved problem?

Not in sailing sports.

Here are some features that differentiate our mobile tracking SDK from other trackers:

* Major privacy improvements.
    * We can't tell you how many times we've seen tracks from other trackers that follow a sailor home after the race. That's not good.
* Unopinionated - but built exclusively for sports that combine wind and water.
    * We kept our APIs as generic as possible so it doesn't matter if you're running handicap coastal races or kite boarding with friends.
    * We support all the classical ways of running races as well as new and creative approaches.
    * We default to "open". 
* Real time weather/current, position, and instrumentation input and output streaming:
    * The most privacy and battery conscious implementation that exists.
    * Compliant with GDPR and other privacy laws.
    * We don't just bundle the Windy API or giving you a long list of models to chose from. We're doing serious meteorlogy and only using the most relevant data.
* Real time handicap scoring:
    * PCS, TOT and TOD corrected times in real time.
* Real time course calculations:
    * OCS, rounding, and arbitrary course interaction detection.
    * Countless real time metrics (TWA, TWS, TWD, COG, SOG, etc.)
    * Layline, ladderline and distance calculations.
* Post race data science:
    * Analyze the largest data set of sailing data on earth with billions of positions for 20 years of races.
* Device time sync.
    * Did you know that a phone clock can vary +/- 30 seconds over a 24 hour period? That means two phones clocks can be as much as a minute apart. For mobile apps that use the time module, all devices will be syncronized using NTP to within a few ms of each other. 
* Zero-latency course interactions.
    * If your app is using our platform to track physical course marks, many distance calculations will happen on-device, meaning there will be zero latency for displaying distances around race starts.
* Intelligent frequency scaling. 
    * We increase the ping time as competitors get close to key events or locations and decrease it when we don't need it. This preserves battery but maintains accuracy. 

## Privacy and Compliance

SYRF's systems implement business logic that goes above and beyond to protect your users. 
We throw away positions that are clearly unrelated to a race, and we sanitize user identifiers to prevent developers from tracking users across races.
This is in addition to strict adherence to various privacy laws. 
