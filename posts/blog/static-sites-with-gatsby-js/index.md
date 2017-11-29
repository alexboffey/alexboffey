---
title: 'Building static sites with Gatsby'
subtitle: 'Gatsby is a static site generator for React.'
date: '2017-11-27T00:00:00.000Z'
post_type: 'blog'
published: 'false'
---

## So what's the deal with Gatsby?
Having recently grown and grown in popularity, [Gatsby](https://github.com/gatsbyjs/gatsby) has been making a name for itself as a new contender in static site generation; boasting a lot of attractive qualities.

It has an excellent developer experience, (assuming you like React), backed up by its large ecosystem of packages making it fast and simple to develop modern, performant sites.

So after browsing through the [docs](https://www.gatsbyjs.org/docs/), which are an excellent resource that you should check out! I decided to rebuild my personal (this) site using Gatsby and document my experience.

## Initial setup.
Gatsby has a CLI which is used to scaffold new projects. We first need to install it which will allow us to create our project.

```
$ npm i -g gatsby-cli
...
$ gatsby new blog
...
$ cd blog
...
$ gatsby develop
```

After running these four commands, we will have a local development server running our newly created project.

Note: Gatsby includes Webpack which allows for hot module reloading (which will now be already set up for us). So any time we save a change in our project it will be injected straight into our active browser session.
