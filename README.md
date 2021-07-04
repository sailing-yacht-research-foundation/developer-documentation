# developer-site
The developer site is where 3rd party developers go to get access to the API and view documentation.

This repo will have 2 projects:

1) The web app that developers go to, log in with their SYRF ID, and get tokens for our APIs.

2) The reference documents. 

Currently only the reference docs are in this repo because we haven't started the developer dashboard webapp.

To run the reference docs:

`> cd docs/syrf-devdocs`

`> npx docusaurus start`

Reference doc todo:

* Finish generic guides.
* Finish platform guides in this order:
    * Websocket/REST
    * iOS
    * Android
    * React Native
* Create build script that builds docs for each platform:
    * The script outputs a folder of html docs of some kind for each platform.
    * The folder is nested in the directory structure of the docusaurus docs.
    * The folder is in a nested version directory.
    * Use a combination of sed commands and iFrames to display the API docs within docusaurus.