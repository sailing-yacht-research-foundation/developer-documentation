---
sidebar_position: 1
---

# Introduction

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

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

In general the SYRF Developer Platform supports six basic use cases for all wind-water sports:

* Use the existing SYRF tracking app to add tracking to a race or regatta management platform.
* Create a custom mobile tracking app that sends data from the phone or boat instruments.
* Build sophisticated viewing or playback apps for numerous use cases.
* Pull all race data for races which are over and do whatever you want with it.
* Display nautical charts in mobile and web apps.
* Let your users use Single Sign On with OIDC to help your end users organize and share their data.

## Platform Capabilities

The SYRF platform allows developers to build apps with the following capabilities:

### Single Sign On

* Let your users sign in with their SYRF account via Open ID Connect so they can store their tracks and metadata.

### Sophisticated real-time tracking, course umpiring, time corrections and analytics

* Real time handicap and non-handicap scoring:
    * PCS, TOT, and TOD corrected times in real time.
    * Remove the influence of current.
* Real time course calculations:
    * OCS, rounding, and arbitrary course interaction event detection.
    * Countless real time metrics (TWA, TWS, TWD, COG, SOG, etc.)
    * Layline, ladderline, and distance calculations.

![Alt Text](/img/line-interaction.gif)

### Privacy conscious

* We ignore data outside of a bounding box surrounding the race.
* We scrub user identifiers in the output requests to prevent tracking users accross events.
* Compliant with GDPR and other privacy laws.

### Not just weather, meteorology

* Our partners are doing real science to provide data that isn't available elsewhere.
* We combine models with observations to use only the most accurate forecasts.
* We use real-time remote sensing data from satellites to obtain the most accurate state of the earth possible.

### Unopinionated

* Built exclusively for sports that combine wind and water but flexible for all types and methodologies.
* We kept our APIs as generic as possible so it doesn't matter if you're running handicap coastal races or kite boarding with friends.
* We support all the classical ways of running races as well as new and creative approaches.
* We default to "open". 
* Use our calculated corrected times or use our protest API to manually change the results of races.

### Powerful media streaming features

* The most sophisticated race playback viewer on the market plus the APIs to build your own.
* Real time motion graphics tools for OBS to empower your community to live stream events in a way that was never possible before.

### More data than anywhere else

* Our platform hosts 20 years of races from around the world. You can pull this data and use it however you'd like.
    * We have billions of race positions for almost 100,000 races.
    * Over 1TB of data with more added every day.

![Alt Text](/img/breathing.gif)

### Syncronized devices

* Did you know that a phone clock can vary +/- 30 seconds over a 24 hour period? That means two phones clocks can be as much as a minute apart. 
* For mobile apps that use the time module, all devices will be syncronized using NTP to within a few ms of each other. 

### Zero latency calculations

* If your app is using our platform to track physical course marks, many distance calculations will happen on-device, meaning there will be zero latency for displaying distances around race starts.

### Intelligent frequency scaling

* We increase the ping time as competitors get close to key events or locations and decrease it when we don't need it. This preserves battery but maintains accuracy. 

### Better nautical charts

* Traditional nautical charts don't make sense in the 21st century.
* Our chart tile servers allow you to isolate any ENC layer and style it however you'd like using standard web mapping frameworks.

## Critical Concepts

* Your end users will be required to have SYRF accounts in order to use the APIs.
* You will need a developer token from developers.syrf.io
* All races with more than 4 participants will be public. User data for public races will be sanitized to protect their privacy.
* We currently only have client SDKs in Kotlin, Swift and React Native but everything that can be accomplished with the client SDKs can be accomplished with Websockets and REST endpoints.
