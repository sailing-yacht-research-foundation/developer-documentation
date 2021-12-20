---
sidebar_position: 4
---

# Design Philosophy

<script async defer data-website-id="d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4" src="https://analytics.syrf.io/umami.js"></script>


## Chaotic Marketplace

The sailing sport market has a variety of characteristics that make it difficult for startups to grow.
Even within a single sport, like traditional sailing, there are a variety of stakeholders and strong opinions about the "right way" and the "wrong way".
Vocabulary differs across sub cultures and organizations, and the communities are always torn between how things have been done in the past and how they could be done in the future.
Here are a few examples of ways which sailors disagree but there are many other examples, including a fabulous variety of types of racing:

* What is a "class" or "division"?
    * Is a class a handicap rule, a boat model or design rule?
    * Does a class have to be recognized by one body or another?
    * Are divisions groups of boats that are on the water at the same time or groups of boats that share a trophy?
* What is the fairest handicap system?
    * PCS, ToT or ToD?
    * What VPP should be used?
* What the hell is a "race" anyway? 
    * Is a race an event that happens every n years like the Newport-Bermuda, a specific instance of a recurring event (such as the 2022 Newport-Bermuda) or is it a group of boats going around the same course at the same time perhaps as part of an event with many races in one or more days?
    * How does a "race" relate to a "regatta"?

Given the complexity of the *culture* of wind-water sports, SYRF has decided to design our APIs around a contract with software engineers rather than the end user. 
Below, we outline a few of the philosophical choices that have a direct impact on our APIs and will help you understand the boundary between our responsibility 
as a service provider and your responsiblity as a developer. 

## Leave decisions up to developers and their users. SYRF is unopinonated.

The SYRF APIs are not intended to be used by the average sailor/kite/wing/foiler/boarder. Rather, the APIs should be used by software companies who understand their markets.
As such, SYRF does not determine how trophies should be calculated for instance, or who should be ranked together in a leaderboard. Neither do the APIs use existing terminology wherever possible.
The SYRF API does not have a concept for things like "class", "division", "race" or "regatta". 
Rather, the SYRF APIs use specific data model objects with precisely defined meanings, such as a `BoatParticipantGroup`. Developers can create and subscribe to any combination of these models in order to make their products useful to their end users or customers.

Additionally, SYRF does not specifically implement any kind of racing rules. Our APIs simply provide a means for developers to be notified of particular events and respond accordingly. For instance, we make it easy to determine if a boat crossed a geographic boundary (start line, gate, etc.) but leave the determination of what should happen next to the developer. For instance, the developer may decide the appropriate response is to notify a referee dashboard or add or subtract time to the elapsed time of the boat.


## Global scope and scale

Sailing sports are global. SYRF aspires to help companies of all kinds grow sailing sports wherever they are located. Our approach is to think of how we can solve problems for a specific group, and then make the solutions available to everyone in the world.

## Prioritize difficult engineering problems

Tracking is just the first step in a much more abitious roadmap to push all sailing sports further. 
SYRF recognizes that there are a variety of tracking apps on the market. We focus on unique and boundary-pushing engineering challenges rather than re-invent the wheel. 
Given the wide variety of cultures, sports, and needs, we focus on improving tracking accuracy, VPPs and media streaming options so that everyone benefits.


## Open first

We want to make the data and capabilities of the most well-funded and advanced campaigns available to everyone. This is only possible by "defaulting to open". 
An open ecosystem benefits sponsors, competitors, startups, organizations, and fans, and ensures a bright future for sailing sports.
The closed and segmented ecosystem of sailing data generators and stakeholders is holding the sport back.