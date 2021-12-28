---
sidebar_position: 2
---

# App Store and Play Store Compliance

:::caution SYRF Can't Help You Get Approved
Unfortunately, SYRF can't help apps that are having difficulty getting approved.

Try browsing our various support resources to connect with others who have had their app approved.
:::

The Apple App and Google Play stores have strict requirements for mobile apps that collect users' locations, especially from the background.

When using the SYRF mobile SDKs, give your app the best chance of being approved by following these best practices.

* Don't use a "for kids" rating or list the app in a for kids category.
* Before asking for location permissions, provide a clear and unambiguous message about why you need the location.
* Periodically remind your user that tracking is enabled in the background to ensure they are aware of battery usage.
    * Consider automatically stopping tracking, perhaps with a push notification, after the race has finished.
* Under no circumstances should you automatically begin tracking the user without their explicit approval. The user should have to manually "start tracking" in the app.
    * A push notification can probably be used to remind the user to start tracking, but not to programatically begin tracking.
* Your app's privacy policy must clearly describe how and why you are using the user's location, even though you are using our SDKs. 
* You may want to descibe the safety measures SYRF takes, such as requiring a bounding box to filter unrelated positions, or linking them to this page.

:::info Guidelines
The Apple App Store Guidelines are available [here.](https://developer.apple.com/app-store/review/guidelines/)

The Google Play Store Guidelines are available [here.](https://play.google.com/about/developer-content-policy/)
:::

## Google Play Store Additional Requirements

Google imposes additional requirements on apps that utilize background location tracking, so plan for delays in your release process.

:::info Follow Google's Guidance For Succesfull Play Store Submission
You need to fill out additional forms and provide a video demonstration in order to use background location.

More info is available [here.](https://support.google.com/googleplay/android-developer/answer/9799150?hl=en#zippy=%2Cstep-review-best-practices-for-accessing-location%2Cstep-consider-alternatives-to-accessing-location-in-the-background%2Cstep-make-access-to-location-in-the-background-clear-to-users%2Cstep-provide-a-video-demonstration)
:::
