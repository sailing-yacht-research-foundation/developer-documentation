---
sidebar_position: 2
---

# Events

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>

Events provide a means to understand how vessels are interacting with courses. Geospatial calculations are geodesic. 

## `VesselPointRounding`
This event occurs when a vessel crosses the imaginary line drawn from a course geometry point upwind or downwind towards the direction the wind is coming from or to.
The imaginary line is 100m long. 

## Attributes
- `eventTimestamp` An interpolated timestamp for when this took place.
- `vesselParticipant` FK, which vessel participant rounded the point.
- `point` FK, which point was rounded. 

## `VesselLineInsideCrossing`
This event occurs when a vessel crosses within the endpoints of any course line.

## Attributes
- `eventTimestamp` An interpolated timestamp for when this took place.
- `vesselParticipant` FK, which vessel participant crossed the line internally.
- `line` FK, which line was crossed. 

## `VesselLineOutsideCrossing`
This event occurs when a vessel crosses lines formed by extending the ending segments of a line by 100m. 

## Attributes
- `eventTimestamp` An interpolated timestamp for when this took place.
- `vesselParticipant` FK, which vessel participant crossed the line externally.
- `line` FK, which line was crossed (outside of the line). 

## `VesselPolygonEntered`
This event occurs when a vessel enters a polygon. 

## Attributes
- `eventTimestamp` An interpolated timestamp for when this took place.
- `vesselParticipant` FK, which vessel participant entered the polygon.
- `polygon` FK, which polygon was entered.

## `VesselPolygonExited`
This event occurs when a vessel exits a polygon. 

## Attributes
- `eventTimestamp` An interpolated timestamp for when this took place.
- `vesselParticipant` FK, which vessel participant exited the polygon.
- `polygon` FK, which polygon was exited.
