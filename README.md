# Gsheet Compost Collections (GCC)

---

> **This project is in the process of being ported from a private repository - it is currently incomplete and unstable**

---

## About the app

This is a smartphone-friendly web app for a Compost Collection service.

* built using [Google Apps Script](https://developers.google.com/apps-script/reference) ([report a bug / request a feature](https://developers.google.com/apps-script/support))
* with a custom page template using the [Html Service](https://developers.google.com/apps-script/guides/html)
* querying and updating spreadsheet data using the [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet).

This app seeks to bypass numerous usability issues present in the Google Sheets mobile app:

* Difficulty navigating a complex spreadsheet on a mobile device (high cognitive load)
* Hidden columns sometimes revealed making the spreadsheet even more complex
* Difficulty seeing where the blue focus outline is
* High level of interaction required to reveal key collection information
* Having to reselect the correct tab after Google Sheets app crashes/closes at random

In addition, the Google Apps Script platform was chosen because:

* There are no hosting costs (important for a grass-roots organisation)
* Maintainers don't need to set up a local development environment if they don't want to
* Built-in authorisation flows simplify development

## Multi-user - with caveats

This app is designed to provide multiple users with read and write access to the configured spreadsheet. However, to prevent conflicts when saving data, each user must be editing a different range of spreadsheet rows and columns. In practice, this means that **there may only be one app-user for each of the collections runs**. In a group/training scenario, elect a single person to manage the collections data input, either via the web app or directly in the spreadsheet.

## Wiki

Please see [this repository's wiki](https://github.com/dotherightthing/gsheet-compost-collections/wiki) for setup and usage instructions.
