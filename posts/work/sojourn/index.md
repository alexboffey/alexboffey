---
title: 'Sojourn'
subtitle: 'A travel guide web application.'
date: '2017-11-22T01:00:00.000Z'
post_type: 'work'
featured_image: '/img/sojourn/featured.png'
---

## Real time travel guide.
The design idea behind the project was an app that would allow tourists to find their way around a new place and find local attractions while roaming.

The resulting project locates a user and displays their position on a map, surrounded by markers indicating nearby attractions that they can interact with. All of which updates in real time.

You can view the source code [here](https://github.com/alexboffey/sojourn "Sojourn source code").

## Google Maps API Integration.
To develop Sojourn, it required heavy API integration using Google Maps, Google Places and HTML Geolocation.

Using these API's together allowed Sojourn to:

- Find and watch a users geolocation.
- Display and update that geolocation on a map marker.
- Find nearby places and display them on the map for the user to interact with.

## Progressive web app optimised for mobile.
Due to it's requirements & scope, Sojourn was designed and built to be optimal for use on mobile devices.

As well as responsive design, this included incorporating progressive web app features such as:

- App manifest: providing meta information allowing the app to be launched from a mobile home screen.
- Service workers: caching assets and requests speeding up the app, allowing it to load offline.
