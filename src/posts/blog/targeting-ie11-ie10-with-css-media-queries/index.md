---
title: 'Targeting IE10 & IE11 with CSS'
subtitle: 'Using CSS media queries to target only IE10 and IE11.'
date: '2018-06-22T00:00:00.000Z'
post_type: 'blog'
tags: 'target,ie11,ie10,css,media query'
published: true
---

Supporting legacy browsers will always be a pain point for the developers who are unfortunate enough to have to support them.

Given enough googling or trial and error, sometimes just a few lines of CSS can be added or removed to resolve the issue. But it isn't always this simple, and why you may want to use this.

Another potential use case for this would be to implement a fallback when primarily using a CSS grid layout.

Fortunately, as both IE10 and IE11 support the `-ms-high-contrast` media query, we can use it to target them and apply specific styles to work around any styling issues that come up.

## Snippet
```css
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    /* Some CSS */
}
```
