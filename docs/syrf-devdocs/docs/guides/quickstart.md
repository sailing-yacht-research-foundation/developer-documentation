---
sidebar_position: 3
---

# Quick Start

## How Do I:

### Add SYRF OAuth to my app?
This is currently not automated. If interested please join our [Discord](https://discord.gg/EfvufEsDua) to get in touch.
See [our guide here.](/docs/guides/recipes/oauth)

### Search for races?
See [our guide here.](/docs/guides/recipes/findcompetitionunits)

### Get basic event, course, and race info?
See [our guide here.](/docs/guides/recipes/getinfo)

### Add tracking to an existing regatta management platform?
See [our guide here.](/docs/guides/recipes/usetrackingapp)

### Embed a playback iFrame?
Add this snippet to your html or Webview:

```
<iframe src='https://syrf.io/playback?raceId=COMPETITION_UNIT_ID'>
```
### Simulate a real time race?
See [our guide here.](/docs/guides/recipes/simulation)

### Subscribe to live race data, including boat/mark position updates and start time updates?
See [our guide here.](/docs/guides/recipes/realtimeupdates)


### Pull data from a finished race?


### Request user data or implement single sign on via OAuth?
See [our guide here.](/docs/guides/recipes/oauth/oauth)

### Send in position streams for marks?
See [our guide here.](/docs/guides/recipes/sendmarkupdates)

### Search for certificates?
See [our guide here.](/docs/guides/recipes/findcertificates)

### Add nautical charts to my web or mobile app?
See [our guide here.](/docs/guides/recipes/charts)

![Alt Text](/img/charts_teaser.gif)

### Do some data science on sailing tracks?
The best source for sample code to analyze track data is SYRF's [python Jupyter Lab notebooks.](https://github.com/sailing-yacht-research-foundation/ai-sailing-agent/tree/main/notebooks)

These notebooks provide sample code to:

* Calculate polar splines in parallel. 
* Reverse-solve a polar, or polar segment based on a grib source and track source.
* Route sailboats using a parallel accelerated isochrone method.
* Visualize weather data.
* Animate sailboat tracks color coded by different values such as TWA, COG and SOG.
* Visualize the "flow" of races, which show different key decision points. 

![Alt Text](/img/flows.png)

Here are two other great resources:

[Sustainability-GIS](https://sustainability-gis.readthedocs.io)

[Automating GIS Processes](https://automating-gis-processes.github.io)
