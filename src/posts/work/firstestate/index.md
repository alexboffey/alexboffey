---
title: 'First Estate'
subtitle: 'Property finder web application built as a Wordpress theme.'
date: '2017-11-22T00:00:00.000Z'
post_type: 'work'
featured_image: './featured.jpg'
published: false
---

## Property finder web application.
The design requirements for the application was for users to be able to locate and compare properties that they may be interested in buying or renting.

To solve this issue I built a React front end application on top of a Wordpress content management system where new properties can be added and categorised by an administrator.

You can view the source code [here](https://github.com/alexboffey/firstestate_theme "Firstestate source code").

## React front end on a Wordpress theme.
As this was a project I completed while studying at University, I had the freedom to experiment with different technologies. Having previously build Wordpress themes, I wanted to try something different so I decided to build a single page application front end with React on top of Wordpress.

## Using the Wordpress REST API
The project uses the Wordpress REST API which allowed the applications' front end to request data & update content asynchronously when triggered by user interaction.

This approach allowed First Estate to display and update property listings based on taxonomy and search filters without re-loading the page in the browser.
