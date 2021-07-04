# developer-documentation
The developer documentation is where 3rd party developers go to understand how our APIs work including general
conceptual guides, specific tutorials for each platform, and the auto-generated API docs for each supported platform.
It does not require logging in as a developer. 
The docs use Docusaurus.

## Run the docs
To run the reference docs:

`> cd docs/syrf-devdocs`

`> npx docusaurus start`

Then navigate to localhost:3000 on your machine.

## ToDo
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
* Add [search](https://docsearch.algolia.com/)
* Host on AWS.
* Open source the docs in a separate repo (or create a different repo for the developer login site).
* Update build script to push new docs to aws. Include a 'test/local/preview' option in the script. 
* Document how to run the script.
* Add some cool examples to the showcase page.
* Add a link to the developer dashboard site.
* Update the favoricon. 
